import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectTheme, toggleTheme } from "../../store/themeSlice";
import moonIcon from "../../../assets/moon-dark-theme-svgrepo-com.svg";
import sunIcon from "../../../assets/sun-light-theme-svgrepo-com.svg";

function ThemeToggle() {
  const dispatch = useAppDispatch();
  const isDark = useAppSelector(selectTheme) === "dark";

  return (
    <button
      type="button"
      onClick={() => dispatch(toggleTheme())}
      className="inline-flex items-center gap-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-500 transition-colors"
      aria-label={`Перемкнути на ${isDark ? "світлу" : "темну"} тему`}
      title={`Перемкнути на ${isDark ? "світлу" : "темну"} тему`}
    >
      {isDark ? (
        <>
          <img
            src={sunIcon}
            alt=""
            aria-hidden="true"
            className="w-4 h-4"
          />
        </>
      ) : (
        <>
          <img
            src={moonIcon}
            alt=""
            aria-hidden="true"
            className="w-4 h-4"
          />
        </>
      )}
    </button>
  );
}

export default ThemeToggle;
