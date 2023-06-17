import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

interface ThemeToggleSwitchProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeToggleSwitch: React.FC<ThemeToggleSwitchProps> = ({
  isDarkMode,
  toggleDarkMode,
}) => {
  return (
    <>
      <div
        onClick={toggleDarkMode}
        className={`relative flex h-32 w-60 cursor-pointer items-center rounded-full bg-white p-0.5  shadow-lg `}
      >
        <div
          className={`absolute h-28 w-28 rounded-full bg-white shadow-md transition-transform duration-300 ease-in ${
            isDarkMode ? "translate-x-2" : "translate-x-28"
          }`}
        >
          <div className="flex h-full w-full items-center justify-center">
            {isDarkMode ? (
              <SunIcon className="spin-animation text-3xl text-amber-300" />
            ) : (
              <MoonIcon className="spin-animation text-3xl text-slate-300" />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ThemeToggleSwitch;
