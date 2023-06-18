import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { api } from "~/utils/api";

const ProfilePage: NextPage = () => {
  const { data, isLoading, isError } = api.profile.getUserByUsername.useQuery({
    username: "boris-chb",
  });

  if (isLoading) return <div>loading...</div>;
  if (!data) return <div>404</div>;

  return (
    <>
      <Head>
        <title>{data.username}</title>
      </Head>
      <div className="flex flex-col">
        <div className="-p-4 relative h-48 bg-slate-600">
          <Image
            src={data.profileImageUrl}
            width={128}
            height={128}
            alt={`${data.username ?? ""} profile pic`}
            className="absolute bottom-0 left-0 -mb-16 ml-4 rounded-full  border-4 border-slate-100 dark:border-slate-950"
          />
        </div>
      </div>
      <div className="ml-7 mt-12 text-2xl font-bold text-amber-600">
        {data.username}
      </div>
    </>
  );
};

// import { createServerSideHelpers } from "@trpc/react-query/server";
// import { appRouter } from "~/server/api/root";
// import { prisma } from "~/server/db";
// import superjson from "superjson";

// export const getStaticProps: GetStaticProps = async (context) => {
//   const ssg = createServerSideHelpers({
//     router: appRouter,
//     ctx: { prisma, currentUserId: null },
//     transformer: superjson,
//   });

//   return {
//     props: {
//       title: "Profile",
//     },
//   };
// };

export default ProfilePage;
