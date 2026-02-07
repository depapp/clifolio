import React from "react";
import { Text, Box } from "ink";
import { useTheme } from "../themes/index.js";
import type { Project } from "../config/types.js";

interface ProjectsProps {
  projects: Project[];
}

export function Projects({ projects }: ProjectsProps) {
  const theme = useTheme();

  return (
    <Box flexDirection="column" paddingX={2} paddingY={1}>
      <Box marginBottom={1}>
        <Text color={theme.heading} bold underline>
          Projects
        </Text>
      </Box>
      {projects.map((project) => (
        <Box key={project.name} flexDirection="column" marginBottom={1}>
          <Box>
            <Text color={theme.primary} bold>
              ◆ {project.name}
            </Text>
            {project.stars !== undefined && (
              <Text color={theme.accent}> ★ {project.stars}</Text>
            )}
          </Box>
          <Box paddingLeft={2}>
            <Text color={theme.text}>{project.description}</Text>
          </Box>
          {project.tech && project.tech.length > 0 && (
            <Box paddingLeft={2}>
              <Text color={theme.muted}>
                [{project.tech.join(" · ")}]
              </Text>
            </Box>
          )}
          {project.url && (
            <Box paddingLeft={2}>
              <Text color={theme.highlight} dimColor>
                {project.url}
              </Text>
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
}
