import React, { createContext, useContext } from "react";
import { type Theme, getTheme } from "./defaults.js";

export type { Theme } from "./defaults.js";
export { getTheme, themes } from "./defaults.js";

const ThemeContext = createContext<Theme>(getTheme("default"));

export function ThemeProvider({
  themeName,
  children,
}: {
  themeName: string;
  children: React.ReactNode;
}) {
  const theme = getTheme(themeName);
  return React.createElement(
    ThemeContext.Provider,
    { value: theme },
    children
  );
}

export function useTheme(): Theme {
  return useContext(ThemeContext);
}
