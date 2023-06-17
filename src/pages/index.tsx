import { type NextPage } from "next";

import CreateTweet from "~/components/CreateTweet";
import Feed from "~/components/Feed";

const Home: NextPage = () => {
  return (
    <>
      <CreateTweet />
      <Feed />
    </>
  );
};

export default Home;
