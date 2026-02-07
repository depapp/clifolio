import React from "react";
import { Text, Box } from "ink";
import { useTheme } from "../themes/index.js";

interface StatusBarProps {
  currentIndex?: number;
  totalSections?: number;
}

export function StatusBar({ currentIndex, totalSections }: StatusBarProps) {
  const theme = useTheme();
  const counter =
    currentIndex !== undefined && totalSections
      ? `[${currentIndex + 1}/${totalSections}]`
      : "";

  return (
    <Box flexDirection="column" paddingX={1} marginTop={1} alignItems="center">
      <Text color={theme.border}>{"─".repeat(60)}</Text>
      <Box justifyContent="space-between" width={60}>
        <Text color={theme.muted}>
          ← → / h l: navigate  •  o: open link  •  q: quit
        </Text>
        <Text color={theme.muted}>{counter}</Text>
      </Box>
    </Box>
  );
}
