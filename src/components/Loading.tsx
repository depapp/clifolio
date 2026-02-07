import React from "react";
import { Text, Box } from "ink";
import Spinner from "ink-spinner";

interface LoadingProps {
  message: string;
}

export function Loading({ message }: LoadingProps) {
  return (
    <Box paddingY={2} paddingX={2}>
      <Text color="#6CB6FF">
        <Spinner type="dots" />
      </Text>
      <Text color="#8B949E"> {message}</Text>
    </Box>
  );
}
