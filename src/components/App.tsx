import React, { useState, useMemo } from "react";
import { Box, useApp } from "ink";
import type { Portfolio } from "../config/types.js";
import { ThemeProvider, useTheme } from "../themes/index.js";
import { Header } from "./Header.js";
import { About } from "./About.js";
import { Skills } from "./Skills.js";
import { Experience } from "./Experience.js";
import { Projects } from "./Projects.js";
import { Education } from "./Education.js";
import { Contact } from "./Contact.js";
import { Navigation } from "./Navigation.js";
import { StatusBar } from "./StatusBar.js";
import { useKeyboard } from "../hooks/useKeyboard.js";

interface AppProps {
  portfolio: Portfolio;
  themeOverride?: string;
  animate?: boolean;
}

interface Section {
  name: string;
  component: React.ReactNode;
  urls?: string[];
}

function AppInner({ portfolio, animate = true }: { portfolio: Portfolio; animate?: boolean }) {
  const theme = useTheme();
  const { exit } = useApp();

  const sections = useMemo(() => {
    const result: Section[] = [];

    if (portfolio.about) {
      result.push({
        name: "About",
        component: <About content={portfolio.about} animate={animate} />,
      });
    }

    if (portfolio.skills && portfolio.skills.length > 0) {
      result.push({
        name: "Skills",
        component: <Skills skills={portfolio.skills} />,
      });
    }

    if (portfolio.experience && portfolio.experience.length > 0) {
      result.push({
        name: "Experience",
        component: <Experience items={portfolio.experience} />,
      });
    }

    if (portfolio.projects && portfolio.projects.length > 0) {
      result.push({
        name: "Projects",
        component: <Projects projects={portfolio.projects} />,
        urls: portfolio.projects
          .map((p) => p.url)
          .filter((u): u is string => !!u),
      });
    }

    if (portfolio.education && portfolio.education.length > 0) {
      result.push({
        name: "Education",
        component: <Education items={portfolio.education} />,
      });
    }

    if (portfolio.contact) {
      result.push({
        name: "Contact",
        component: <Contact contact={portfolio.contact} />,
        urls: [
          portfolio.contact.website,
          portfolio.contact.github
            ? `https://github.com/${portfolio.contact.github}`
            : undefined,
        ].filter((u): u is string => !!u),
      });
    }

    return result;
  }, [portfolio, animate]);

  const [activeIndex, setActiveIndex] = useState(0);

  const currentSection = sections[activeIndex];

  useKeyboard({
    sectionCount: sections.length,
    activeIndex,
    setActiveIndex,
    urls: currentSection?.urls,
    onQuit: exit,
  });

  return (
    <Box flexDirection="column">
      <Header
        name={portfolio.name}
        title={portfolio.title}
        tagline={portfolio.tagline}
        animate={animate}
      />

      <Navigation
        sections={sections.map((s) => s.name)}
        activeIndex={activeIndex}
      />

      <Box
        flexDirection="column"
        marginY={1}
        borderStyle="round"
        borderColor={theme.border}
        paddingX={1}
      >
        {currentSection?.component}
      </Box>

      <StatusBar currentIndex={activeIndex} totalSections={sections.length} />
    </Box>
  );
}

export function App({ portfolio, themeOverride, animate = true }: AppProps) {
  const themeName = themeOverride ?? portfolio.theme ?? "default";

  return (
    <ThemeProvider themeName={themeName}>
      <AppInner portfolio={portfolio} animate={animate} />
    </ThemeProvider>
  );
}
