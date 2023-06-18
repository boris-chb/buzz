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
        className={`relative flex h-10 w-16 cursor-pointer items-center rounded-full bg-slate-100 p-0.5 shadow-inner `}
      >
        <div
          className={`absolute h-8 w-8 rounded-full ${
            isDarkMode ? "bg-white" : "bg-slate-700"
          } shadow-md transition-transform duration-300 ease-in ${
            isDarkMode ? "translate-x-0" : "translate-x-7"
          }`}
        >
          <div className="flex h-full w-full items-center justify-center">
            {isDarkMode ? (
              <SunIcon className="spin-animation text-amber-300" />
            ) : (
              <MoonIcon className="spin-animation text-slate-100" />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ThemeToggleSwitch;
