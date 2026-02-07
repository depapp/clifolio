#!/usr/bin/env node
import React, { useState, useEffect } from "react";
import { render, Text, Box } from "ink";
import Spinner from "ink-spinner";
import { parseCli, loadPortfolio } from "./cli.js";
import { App } from "./components/App.js";
import { runInit } from "./commands/init.js";
import type { Portfolio } from "./config/types.js";

interface LoaderProps {
  source: string;
  themeOverride?: string;
  animate: boolean;
}

function Loader({ source, themeOverride, animate }: LoaderProps) {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPortfolio(source)
      .then(setPortfolio)
      .catch((err: unknown) => {
        const msg = err instanceof Error ? err.message : String(err);
        setError(msg);
      });
  }, [source]);

  if (error) {
    return (
      <Box flexDirection="column" paddingY={1} paddingX={2}>
        <Text color="#FF6B6B" bold>  ❌ Error</Text>
        <Text color="#ABB2BF">  {error}</Text>
        <Text color="#5C6370">{"\n"}  Run `termfolio --help` for usage info.</Text>
      </Box>
    );
  }

  if (!portfolio) {
    const label = source.startsWith("@")
      ? `Fetching portfolio for ${source}...`
      : `Loading ${source}...`;
    return (
      <Box paddingY={2} paddingX={2}>
        <Text color="#6CB6FF">
          <Spinner type="dots" />
        </Text>
        <Text color="#8B949E"> {label}</Text>
      </Box>
    );
  }

  return (
    <App
      portfolio={portfolio}
      themeOverride={themeOverride}
      animate={animate}
    />
  );
}

async function main() {
  const options = await parseCli(process.argv);

  if (options.command === "init") {
    await runInit(options.output);
    return;
  }

  render(
    React.createElement(Loader, {
      source: options.source!,
      themeOverride: options.theme,
      animate: !options.noAnimation,
    })
  );
}

main();
