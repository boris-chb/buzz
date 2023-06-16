import { clerkClient } from "@clerk/nextjs";
import type { User } from "@clerk/nextjs/dist/types/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const TWEET_LENGTH = 100;

const createTweetInputSchema = z.object({
  body: z
    .string()
    .min(1, { message: "Tweet cannot be empty!" })
    .max(TWEET_LENGTH, {
      message: `Tweet cannot be longer than ${TWEET_LENGTH} characters.`,
    }),
});

const editTweetInputSchema = createTweetInputSchema
  .pick({ body: true }) // Pick the 'body' field from createTweetInputSchema
  .merge(z.object({ id: z.string() })); // Add the 'id' field

const filterUserForClient = (user: User) => {
  return {
    id: user.id,
    username: user.username,
    profileImageUrl: user.profileImageUrl,
    firstName: user.firstName,
    lastName: user.lastName,
  };
};

// Create a new ratelimiter, that allows 10 requests per 10 seconds
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(1, "10 s"),
  analytics: true,
  /**
   * Optional prefix for the keys used in redis. This is useful if you want to share a redis
   * instance with other applications and want to avoid key collisions. The default prefix is
   * "@upstash/ratelimit"
   */
  prefix: "@upstash/ratelimit",
});

export const tweetRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const tweets = await ctx.prisma.tweet.findMany({
      take: 100,
      orderBy: [{ createdAt: "desc" }],
    });

    const users = (
      await clerkClient.users.getUserList({
        userId: tweets.map((post) => post.authorId),
        limit: 100,
      })
    ).map(filterUserForClient);

    return tweets.map((tweet) => {
      const author = users.find((user) => user.id === tweet.authorId);

      if (!author)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Author for tweet not found",
        });

      return {
        tweet,
        author,
      };
    });
  }),

  create: privateProcedure
    .input(createTweetInputSchema)
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.currentUserId;

      const { success } = await ratelimit.limit(authorId);

      if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

      const tweet = await ctx.prisma.tweet.create({
        data: {
          authorId,
          body: input.body,
        },
      });

      return tweet;
    }),

  edit: privateProcedure
    .input(editTweetInputSchema)
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.currentUserId;

      const currentTweet = await ctx.prisma.tweet.findFirst({
        where: { id: input.id },
      });

      // TODO
    }),
});
