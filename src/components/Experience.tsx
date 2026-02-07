import React from "react";
import { Text, Box } from "ink";
import { useTheme } from "../themes/index.js";
import type { Experience as ExperienceType } from "../config/types.js";

interface ExperienceProps {
  items: ExperienceType[];
}

export function Experience({ items }: ExperienceProps) {
  const theme = useTheme();

  return (
    <Box flexDirection="column" paddingX={2} paddingY={1}>
      <Box marginBottom={1}>
        <Text color={theme.heading} bold underline>
          Experience
        </Text>
      </Box>
      {items.map((item, i) => (
        <Box key={i} flexDirection="column" marginBottom={1}>
          <Box>
            <Text color={theme.muted}>{"│ "}</Text>
            <Text color={theme.primary} bold>
              {item.role}
            </Text>
            <Text color={theme.muted}> @ </Text>
            <Text color={theme.accent}>{item.company}</Text>
          </Box>
          <Box>
            <Text color={theme.muted}>{"│ "}</Text>
            <Text color={theme.muted} italic>
              {item.period}
            </Text>
          </Box>
          {item.description && (
            <Box>
              <Text color={theme.muted}>{"│ "}</Text>
              <Text color={theme.text}>{item.description}</Text>
            </Box>
          )}
          {i < items.length - 1 && (
            <Text color={theme.muted}>{"│"}</Text>
          )}
        </Box>
      ))}
    </Box>
  );
}
