import { type NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";

const ProfilePage: NextPage = () => {
  const { data, isLoading, isError } = api.profile.getUserByUsername.useQuery({
    username: "boris-chb",
  });

  if (isLoading) return <div>loading...</div>;
  if (!data) return <div>404</div>;

  return <>{data.username}</>;
};

export default ProfilePage;
