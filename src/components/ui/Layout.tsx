import { useState, type ReactNode, useEffect } from "react";
import { type NextPage } from "next";
import Head from "next/head";
import ThemeToggleSwitch from "./ThemeToggleSwitch";

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prevState) => !prevState);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <>
      <Head>
        <title>Twitter Clone</title>
        <meta name="description" content="twitter clone" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-start gap-3 bg-slate-50 dark:bg-slate-950">
        <ThemeToggleSwitch
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />
        <div className="mx-auto flex h-screen w-full flex-col gap-5 border-x border-slate-400 p-4  md:max-w-2xl">
          {children}
        </div>
      </main>
    </>
  );
};

export default Layout;
