export interface Theme {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  heading: string;
  text: string;
  muted: string;
  border: string;
  success: string;
  highlight: string;
}

export const themes: Record<string, Theme> = {
  default: {
    name: "default",
    primary: "#61AFEF",
    secondary: "#C678DD",
    accent: "#E5C07B",
    heading: "#FFFFFF",
    text: "#ABB2BF",
    muted: "#5C6370",
    border: "#3E4451",
    success: "#98C379",
    highlight: "#61AFEF",
  },
  ocean: {
    name: "ocean",
    primary: "#6CB6FF",
    secondary: "#D2A8FF",
    accent: "#F0B72F",
    heading: "#E6EDF3",
    text: "#8B949E",
    muted: "#484F58",
    border: "#30363D",
    success: "#3FB950",
    highlight: "#58A6FF",
  },
  dracula: {
    name: "dracula",
    primary: "#BD93F9",
    secondary: "#FF79C6",
    accent: "#F1FA8C",
    heading: "#F8F8F2",
    text: "#BFBFBF",
    muted: "#6272A4",
    border: "#44475A",
    success: "#50FA7B",
    highlight: "#8BE9FD",
  },
  monokai: {
    name: "monokai",
    primary: "#66D9EF",
    secondary: "#F92672",
    accent: "#E6DB74",
    heading: "#F8F8F2",
    text: "#A6A6A6",
    muted: "#75715E",
    border: "#49483E",
    success: "#A6E22E",
    highlight: "#FD971F",
  },
  nord: {
    name: "nord",
    primary: "#88C0D0",
    secondary: "#B48EAD",
    accent: "#EBCB8B",
    heading: "#ECEFF4",
    text: "#D8DEE9",
    muted: "#4C566A",
    border: "#3B4252",
    success: "#A3BE8C",
    highlight: "#81A1C1",
  },
};

export function getTheme(name: string): Theme {
  return themes[name] ?? themes["default"];
}
