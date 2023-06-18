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
import PopupMenu from "./ui/PopupMenu";
import { useState } from "react";
import EditTweet from "./EditTweet";
import Link from "next/link";

dayjs.extend(relativeTime);
type TweetWithAuthor = RouterOutputs["tweets"]["getAll"][number];

const Tweet: React.FC<TweetWithAuthor> = ({
  tweet: { id: tweetId, body, createdAt, likes, retweets },
  author,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const formatAuthorName = (user: typeof author) => {
    return `${user?.firstName ? user?.firstName : ""} ${
      user?.lastName ? user?.lastName : ""
    }`;
  };

  return (
    <div className="flex w-full rounded-lg border border-slate-300 p-4 transition duration-300 ease-in-out hover:border-slate-500 hover:shadow-lg dark:border-slate-400">
      <Image
        className="mr-4 h-12 w-12 rounded-full"
        src={author.profileImageUrl}
        alt="Profile Picture"
        width={400}
        height={400}
      />
      <div className="flex-grow">
        <div className="ml-auto flex items-center">
          <Link href={`/@${author.username!}`}>
            <span className="mr-2 font-bold text-slate-800 dark:text-slate-200">
              {formatAuthorName(author)}
            </span>
            <span className="text-slate-800 dark:text-slate-200">
              @<span>{author.username}</span>
            </span>
          </Link>
          <span className="mx-2 text-slate-800 dark:text-slate-200">•</span>
          <Link href={`/tweet/${tweetId}`}>
            <span className="text-slate-800 dark:text-slate-200">
              {dayjs(createdAt).fromNow()}
            </span>
          </Link>
          <span className="ml-auto">
            <PopupMenu onEdit={() => setIsEditing(true)} />
          </span>
        </div>
        {isEditing ? (
          <EditTweet
            onCancel={() => setIsEditing(false)}
            initialTweetText={body}
          />
        ) : (
          <>
            <div className="whitespace-normal break-all text-xl text-slate-800 dark:text-slate-200">
              {body}
            </div>
            <div className="mt-4 flex items-center justify-start gap-5">
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
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Tweet;
