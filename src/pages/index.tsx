import {
  ArrowUpTrayIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  EllipsisHorizontalIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import {
  AdjustmentsHorizontalIcon,
  CalendarIcon,
  ChartBarIcon,
  FaceSmileIcon,
  MapPinIcon,
  PhotoIcon,
} from "@heroicons/react/24/solid";

import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState, type ChangeEvent, type FormEvent } from "react";
import type { RouterOutputs } from "~/utils/api";
import { api } from "~/utils/api";

import { useUser } from "@clerk/nextjs";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const CreateTweet: React.FC = () => {
  const [tweetText, setTweetText] = useState("");

  const { user } = useUser();

  console.log(user?.id);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTweetText(e.target.value);
  };

  const handleAttachMedia = () => {
    // Handle attaching media logic here
    console.log("Attach media");
  };

  const handleAttachGif = () => {
    // Handle attaching GIF logic here
    console.log("Attach GIF");
  };

  const handleAttachPoll = () => {
    // Handle attaching poll logic here
    console.log("Attach poll");
  };

  const handleAttachLocation = () => {
    // Handle attaching location logic here
    console.log("Attach location");
  };

  const handleScheduleTweet = () => {
    // Handle scheduling tweet logic here
    console.log("Schedule tweet");
  };

  const handleSubmitTweet = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (tweetText.trim() === "") return;
    // Handle submitting tweet logic here
    console.log("Tweet submitted:", tweetText);
    // setTweetText('');
  };

  return (
    <div className="flex min-w-[400px] rounded-lg bg-white p-4 shadow-md">
      <Image
        className="mr-4 h-12 w-12 rounded-full"
        src={
          user
            ? user.profileImageUrl
            : "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
        }
        alt="Profile Picture"
        width={400}
        height={400}
      />
      <form className="flex-grow" onSubmit={handleSubmitTweet}>
        <textarea
          className="w-full resize-none bg-transparent outline-none"
          rows={3}
          maxLength={255}
          placeholder="What's happening?"
          onChange={handleInputChange}
        />
        <div className="mt-2 flex items-center justify-between border border-red-500 p-1">
          <div className="mr-4 flex gap-4 border border-red-500">
            <button
              title="Attach Media"
              type="button"
              onClick={handleAttachMedia}
            >
              <PhotoIcon className="h-6 w-6 text-blue-500 hover:text-blue-600" />
            </button>
            <button title="Attach GIF" type="button" onClick={handleAttachGif}>
              <FaceSmileIcon className="h-6 w-6 text-blue-500 hover:text-blue-600" />
            </button>
            <button
              title="Attach poll"
              type="button"
              onClick={handleAttachPoll}
            >
              <ChartBarIcon className="h-6 w-6 text-blue-500 hover:text-blue-600" />
            </button>
            <button
              title="Add location"
              type="button"
              onClick={handleAttachLocation}
            >
              <MapPinIcon className="h-6 w-6 text-blue-500 hover:text-blue-600" />
            </button>
            <button
              title="Schedule tweet"
              type="button"
              onClick={handleScheduleTweet}
            >
              <CalendarIcon className="h-6 w-6 text-blue-500 hover:text-blue-600" />
            </button>
          </div>
          <button
            type="submit"
            className="rounded-3xl bg-blue-500  px-4 py-2 text-white hover:bg-blue-600 md:px-6 md:py-3 md:text-lg"
          >
            Tweet
          </button>
        </div>
      </form>
      <AdjustmentsHorizontalIcon className="ml-4 h-6 w-6 text-gray-500 hover:text-blue-500" />
    </div>
  );
};

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
    <div className="flex rounded-lg border border-slate-200 p-4">
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
        <div>{body}</div>
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

const Home: NextPage = () => {
  const { data: tweets } = api.tweets.getAll.useQuery();
  const user = useUser();

  return (
    <>
      <Head>
        <title>Twitter Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-start gap-3 border border-red-500">
        <div className="mx-auto flex h-screen w-full flex-col gap-5 border border-sky-500 p-4 md:max-w-2xl">
          {!!user && <div className="flex">{user.user?.username}</div>}
          <CreateTweet />

          {tweets?.map(({ tweet, author }) => (
            <Tweet key={tweet.id} tweet={tweet} author={author} />
          ))}
        </div>
      </main>
    </>
  );
};

export default Home;
