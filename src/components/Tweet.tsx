import {
  ArrowUpTrayIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  EllipsisHorizontalIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import type { RouterOutputs } from "~/utils/api";

dayjs.extend(relativeTime);
type TweetWithAuthor = RouterOutputs["tweets"]["getAll"][number];

const Tweet: React.FC<TweetWithAuthor> = ({
  tweet: { body, createdAt, likes, retweets },
  author,
}) => {
  const formatAuthorName = (user: typeof author) => {
    return `${user?.firstName ? user?.firstName : ""} ${
      user?.lastName ? user?.lastName : ""
    }`;
  };

  return (
    <div className="flex w-full rounded-lg border border-slate-200 p-4">
      <Image
        className="mr-4 h-12 w-12 rounded-full"
        src={author.profileImageUrl}
        alt="Profile Picture"
        width={400}
        height={400}
      />
      <div className="flex-grow">
        <div className="flex items-center">
          <span className="mr-2 font-bold">{formatAuthorName(author)}</span>
          <span className="text-gray-500">
            @<span>{author.username}</span>
          </span>
          <span className="mx-2 text-gray-500">•</span>
          <span className="text-gray-500">{dayjs(createdAt).fromNow()}</span>
        </div>
        <div className="whitespace-normal break-all text-xl">{body}</div>
        <div className="mt-4 flex items-center justify-between gap-5">
          <button
            title="Comment"
            className="text-gray-500 hover:text-blue-500 focus:outline-none"
          >
            <div className="flex items-center justify-center gap-2">
              <ChatBubbleOvalLeftEllipsisIcon className=" h-5 w-5" />
              {10}
            </div>
          </button>
          <button
            title="Retweet"
            className="text-gray-500 hover:text-green-500 focus:outline-none"
          >
            <div className="flex items-center justify-center gap-2">
              <ArrowUpTrayIcon className=" h-5 w-5" />
              {retweets}
            </div>
          </button>
          <button
            title="Likes"
            className="text-gray-500 hover:text-red-500 focus:outline-none"
          >
            <div className="flex items-center justify-center gap-2">
              <HeartIcon className=" h-5 w-5" />
              {likes}
            </div>
          </button>
          <button
            title="Share"
            className="ml-auto text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <EllipsisHorizontalIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
