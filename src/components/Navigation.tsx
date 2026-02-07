import React from "react";
import { Text, Box } from "ink";
import { useTheme } from "../themes/index.js";

interface NavigationProps {
  sections: string[];
  activeIndex: number;
}

export function Navigation({ sections, activeIndex }: NavigationProps) {
  const theme = useTheme();

  return (
    <Box flexDirection="column" alignItems="center">
      <Box paddingX={1} paddingY={0} justifyContent="center">
        {sections.map((section, i) => {
          const isActive = i === activeIndex;
          return (
            <Box key={section} marginX={1} flexDirection="column" alignItems="center">
              <Text
                color={isActive ? theme.primary : theme.muted}
                bold={isActive}
                inverse={isActive}
              >
                {` ${section} `}
              </Text>
              <Text color={isActive ? theme.primary : "transparent"}>
                {"▔".repeat(section.length + 2)}
              </Text>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
