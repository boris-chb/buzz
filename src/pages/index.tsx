import {
  AdjustmentsHorizontalIcon,
  CalendarIcon,
  ChartBarIcon,
  FaceSmileIcon,
  MapPinIcon,
  PhotoIcon,
} from "@heroicons/react/24/solid";
import {
  ChatBubbleOvalLeftEllipsisIcon,
  ArrowUpTrayIcon,
  HeartIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";

import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { api } from "~/utils/api";
import { useUser } from "@clerk/nextjs";

interface TweetProps {
  tweet: {
    author: {
      name: string;
      handle: string;
    };
    body: string;
    createdAt: Date;
    likes: number;
    retweets: number;
  };
}

const tweets = [
  {
    id: 1,
    author: {
      name: "John Doe",
      handle: "johndoe",
    },
    createdAt: new Date("2022-01-01T12:00:00Z"),
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    likes: 42,
    retweets: 12,
  },
  // Add more tweets here
];

const CreateTweet = () => {
  const [tweetText, setTweetText] = useState("");

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
    <div className="flex rounded-lg bg-white p-4 shadow-md">
      <div className="mr-4">
        <Image
          className="h-12 w-12 rounded-full"
          src="https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
          alt="Profile Picture"
          width={400}
          height={400}
        />
      </div>
      <form className="flex-grow" onSubmit={handleSubmitTweet}>
        <textarea
          className="w-full resize-none bg-transparent outline-none"
          rows={3}
          placeholder="What's happening?"
          onChange={handleInputChange}
        />
        <div className="mt-2 flex items-center justify-between">
          <div className="flex space-x-4">
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
            className="rounded-3xl bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Tweet
          </button>
        </div>
      </form>
      <AdjustmentsHorizontalIcon className="ml-4 h-6 w-6 text-gray-500 hover:text-blue-500" />
    </div>
  );
};

const Tweet: React.FC<TweetProps> = ({
  tweet: { author, body, createdAt, likes, retweets },
}) => {
  return (
    <div className="flex border-b border-gray-200 p-4">
      <Image
        className="mr-4 h-12 w-12 rounded-full"
        src="https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
        alt="Profile Picture"
        width={400}
        height={400}
      />
      <div className="flex-grow">
        <div className="flex items-center">
          <span className="mr-2 font-bold">{author.name}</span>
          <span className="text-gray-500">
            @<span>{author.handle}</span>
          </span>
          <span className="mx-2 text-gray-500">•</span>
          <span className="text-gray-500">2h</span>
        </div>
        <div>{body}</div>
        <div className="mt-4 flex items-center justify-between gap-5">
          <button
            title="Comment"
            className="text-gray-500 hover:text-blue-500 focus:outline-none"
          >
            <div className="flex"></div>
            <ChatBubbleOvalLeftEllipsisIcon className="mr-1 h-5 w-5" />
          </button>
          <button
            title="Retweet"
            className="text-gray-500 hover:text-green-500 focus:outline-none"
          >
            <div className="flex">
              <ArrowUpTrayIcon className="mr-1 h-5 w-5" />
              {retweets}
            </div>
          </button>
          <button
            title="Likes"
            className="text-gray-500 hover:text-red-500 focus:outline-none"
          >
            <div className="flex">
              <HeartIcon className="mr-1 h-5 w-5" />
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
  const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const user = useUser();

  console.log(user);

  return (
    <>
      <Head>
        <title>Twitter Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center gap-3 bg-gray-100">
        <div className="container mx-auto flex flex-col gap-5 p-4">
          {!!user && user.user?.username}
          <CreateTweet />

          {tweets.map((tweet) => (
            <Tweet key={tweet.id} tweet={tweet} />
          ))}
        </div>
      </main>
    </>
  );
};

export default Home;
