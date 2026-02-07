import React, { useState, useEffect } from "react";
import { Text, Box } from "ink";
import figlet from "figlet";
import { useTheme } from "../themes/index.js";

interface HeaderProps {
  name: string;
  title: string;
  tagline?: string;
  animate?: boolean;
}

export function Header({ name, title, tagline, animate = true }: HeaderProps) {
  const theme = useTheme();
  const [asciiArt, setAsciiArt] = useState<string>("");
  const [visible, setVisible] = useState(!animate);

  useEffect(() => {
    figlet.text(name, { font: "Small" }, (_err, result) => {
      setAsciiArt(result ?? name);
    });
  }, [name]);

  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => setVisible(true), 100);
      return () => clearTimeout(timer);
    }
  }, [animate]);

  if (!visible) return null;

  return (
    <Box flexDirection="column" alignItems="center" paddingY={1}>
      <Text color={theme.primary} bold>{asciiArt}</Text>
      <Text color={theme.secondary} bold>
        {title}
      </Text>
      {tagline && (
        <Text color={theme.muted} italic>
          {tagline}
        </Text>
      )}
      <Box marginTop={1} width={60} justifyContent="center">
        <Text color={theme.border}>
          {"─".repeat(60)}
        </Text>
      </Box>
    </Box>
  );
}
