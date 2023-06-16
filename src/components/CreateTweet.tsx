import { useUser } from "@clerk/nextjs";
import {
  AdjustmentsHorizontalIcon,
  CalendarIcon,
  ChartBarIcon,
  FaceSmileIcon,
  MapPinIcon,
  PhotoIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { api } from "~/utils/api";

import type { FormEvent } from "react";

const CreateTweet: React.FC = () => {
  const [tweetText, setTweetText] = useState("");

  const ctx = api.useContext();

  const { mutate, isLoading: isTweeting } = api.tweets.create.useMutation({
    onSuccess: async () => {
      setTweetText("");
      await ctx.tweets.getAll.invalidate();
    },
    onError: (e) => {
      const errorMsg = e.data?.zodError?.fieldErrors.body;

      if (errorMsg && errorMsg[0]) {
        toast.error(errorMsg[0]);
      } else {
        toast.error("Too many tweets!");
      }
    },
  });

  const { user } = useUser();

  const handleSubmitTweet = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (tweetText.trim() === "") return;
    try {
      mutate({ body: tweetText });
    } catch (error) {
      console.error(error);
    }
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
      <form className="mt-2 flex-grow" onSubmit={handleSubmitTweet}>
        <textarea
          className="w-full resize-none bg-transparent text-slate-700 outline-none disabled:cursor-not-allowed"
          rows={3}
          maxLength={255}
          value={tweetText}
          placeholder="What's happening?"
          onChange={(e) => setTweetText(e.target.value)}
          disabled={isTweeting}
        />
        <div className="mt-2 flex items-center justify-between  p-1">
          <div className="mr-4 flex gap-4 ">
            <button
              title="Attach Media"
              type="button"
              onClick={() => {
                return null;
              }}
            >
              <PhotoIcon className="h-6 w-6 text-blue-500 hover:text-blue-600" />
            </button>
            <button
              title="Attach GIF"
              type="button"
              onClick={() => {
                return null;
              }}
            >
              <FaceSmileIcon className="h-6 w-6 text-blue-500 hover:text-blue-600" />
            </button>
            <button
              title="Attach poll"
              type="button"
              onClick={() => {
                return null;
              }}
            >
              <ChartBarIcon className="h-6 w-6 text-blue-500 hover:text-blue-600" />
            </button>
            <button
              title="Add location"
              type="button"
              onClick={() => {
                return null;
              }}
            >
              <MapPinIcon className="h-6 w-6 text-blue-500 hover:text-blue-600" />
            </button>
            <button
              title="Schedule tweet"
              type="button"
              onClick={() => {
                return null;
              }}
            >
              <CalendarIcon className="h-6 w-6 text-blue-500 hover:text-blue-600" />
            </button>
          </div>
          <button
            type="submit"
            disabled={isTweeting}
            className="rounded-3xl bg-blue-500 px-3  py-1 text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-300 md:px-4 md:py-2 md:text-lg"
          >
            Tweet
          </button>
        </div>
      </form>
      <AdjustmentsHorizontalIcon className="ml-4 h-6 w-6 text-gray-500 hover:text-blue-500" />
    </div>
  );
};

export default CreateTweet;
