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
        <div className="fixed right-4 top-4 z-10">
          <div className="relative">
            <ThemeToggleSwitch
              isDarkMode={isDarkMode}
              toggleDarkMode={toggleDarkMode}
            />
          </div>
        </div>
        <div className="flex min-h-screen w-full flex-col gap-5 border-x border-slate-300 p-4 dark:border-slate-500 md:max-w-2xl">
          {children}
        </div>
      </main>
    </>
  );
};

export default Layout;
