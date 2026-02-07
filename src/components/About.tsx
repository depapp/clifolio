import React from "react";
import { Text, Box } from "ink";
import { useTheme } from "../themes/index.js";
import { useTypingAnimation } from "../hooks/useAnimation.js";

interface AboutProps {
  content: string;
  animate?: boolean;
}

export function About({ content, animate = true }: AboutProps) {
  const theme = useTheme();
  const displayText = useTypingAnimation(content, animate);

  return (
    <Box flexDirection="column" paddingX={2} paddingY={1}>
      <Box marginBottom={1}>
        <Text color={theme.heading} bold underline>
          About
        </Text>
      </Box>
      <Text color={theme.text}>{displayText}</Text>
    </Box>
  );
}
