import type { ReactNode } from "react";
import { useThemeToggle } from "../hooks/useThemeToggle";
import { ThemeContext } from "./ThemeContext";

function ThemeProvider({ children }: { children: ReactNode }) {
  const { isDark, toggleTheme } = useThemeToggle();

  return (
    <ThemeContext.Provider
      value={{ theme: isDark ? "dark" : "light", isDark, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider