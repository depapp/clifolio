import React from "react";
import { Text, Box } from "ink";
import { useTheme } from "../themes/index.js";
import type { Skill } from "../config/types.js";

interface SkillsProps {
  skills: Skill[];
}

function ProgressBar({ level, color }: { level: number; color: string }) {
  const width = 30;
  const filled = Math.round((level / 100) * width);
  const empty = width - filled;
  const bar = "█".repeat(filled) + "░".repeat(empty);
  return (
    <Text>
      <Text color={color}>{bar}</Text>
      <Text color="#888"> {level}%</Text>
    </Text>
  );
}

export function Skills({ skills }: SkillsProps) {
  const theme = useTheme();

  return (
    <Box flexDirection="column" paddingX={2} paddingY={1}>
      <Box marginBottom={1}>
        <Text color={theme.heading} bold underline>
          Skills
        </Text>
      </Box>
      {skills.map((skill) => (
        <Box key={skill.name} marginBottom={0}>
          <Box width={16}>
            <Text color={theme.accent}>{skill.name}</Text>
          </Box>
          <ProgressBar level={skill.level} color={theme.primary} />
        </Box>
      ))}
    </Box>
  );
}
