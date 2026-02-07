import React from "react";
import { Text, Box } from "ink";
import { useTheme } from "../themes/index.js";
import type { Education as EducationType } from "../config/types.js";

interface EducationProps {
  items: EducationType[];
}

export function Education({ items }: EducationProps) {
  const theme = useTheme();

  return (
    <Box flexDirection="column" paddingX={2} paddingY={1}>
      <Box marginBottom={1}>
        <Text color={theme.heading} bold underline>
          Education
        </Text>
      </Box>
      {items.map((item, i) => (
        <Box key={i} flexDirection="column" marginBottom={1}>
          <Box>
            <Text color={theme.primary} bold>
              🎓 {item.institution}
            </Text>
          </Box>
          <Box paddingLeft={3}>
            <Text color={theme.text}>{item.degree}</Text>
            <Text color={theme.muted}> · {item.year}</Text>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
