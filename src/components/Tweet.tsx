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

dayjs.extend(relativeTime);
type TweetWithAuthor = RouterOutputs["tweets"]["getAll"][number];

const Tweet: React.FC<TweetWithAuthor> = ({
  tweet: { body, createdAt, likes, retweets },
  author,
}) => {
  const [isEditing, setIsEditing] = useState(false);

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
        <div className="ml-auto flex items-center">
          <span className="mr-2 font-bold">{formatAuthorName(author)}</span>
          <span className="text-gray-500">
            @<span>{author.username}</span>
          </span>
          <span className="mx-2 text-gray-500">•</span>
          <span className="text-gray-500">{dayjs(createdAt).fromNow()}</span>
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
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Tweet;
