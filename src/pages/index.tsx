import { type NextPage } from "next";
import Head from "next/head";

import CreateTweet from "~/components/CreateTweet";
import Feed from "~/components/Feed";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Twitter Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-start gap-3">
        <div className="mx-auto flex h-screen w-full flex-col gap-5 border-x border-slate-400 p-4 md:max-w-2xl">
          <CreateTweet />
          <Feed />
        </div>
      </main>
    </>
  );
};

export default Home;
