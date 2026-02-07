import React from "react";
import { Text, Box } from "ink";
import { useTheme } from "../themes/index.js";
import type { Contact as ContactType } from "../config/types.js";

interface ContactProps {
  contact: ContactType;
}

const icons: Record<string, string> = {
  email: "📧",
  github: "🐙",
  linkedin: "🔗",
  twitter: "🐦",
  website: "🌐",
};

const prefixes: Record<string, string> = {
  email: "mailto:",
  github: "https://github.com/",
  linkedin: "https://linkedin.com/in/",
  twitter: "https://twitter.com/",
  website: "",
};

export function Contact({ contact }: ContactProps) {
  const theme = useTheme();
  const entries = Object.entries(contact).filter(
    ([_, val]) => val !== undefined
  );

  return (
    <Box flexDirection="column" paddingX={2} paddingY={1}>
      <Box marginBottom={1}>
        <Text color={theme.heading} bold underline>
          Contact
        </Text>
      </Box>
      {entries.map(([key, value]) => (
        <Box key={key}>
          <Text>{icons[key] ?? "•"} </Text>
          <Box width={12}>
            <Text color={theme.accent}>{key}</Text>
          </Box>
          <Text color={theme.highlight}>
            {key === "website" || key === "email"
              ? value
              : `${prefixes[key] ?? ""}${value}`}
          </Text>
        </Box>
      ))}
    </Box>
  );
}
