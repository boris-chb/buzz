import { api } from "~/utils/api";
import TweetLoadingSkeleton from "./ui/TweetLoading";
import Tweet from "./Tweet";

const Feed: React.FC = () => {
  const { data: tweets, isLoading: tweetsLoading } =
    api.tweets.getAll.useQuery();

  return (
    <>
      {tweetsLoading ? (
        <TweetLoadingSkeleton count={4} />
      ) : (
        tweets?.map(({ tweet, author }) => (
          <Tweet key={tweet.id} tweet={tweet} author={author} />
        ))
      )}
    </>
  );
};

export default Feed;
