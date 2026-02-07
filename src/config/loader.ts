import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { load as loadYaml } from "js-yaml";
import { PortfolioSchema, type Portfolio } from "./schema.js";
import { ZodError } from "zod";

function formatZodError(err: ZodError): string {
  return err.issues
    .map((issue) => `  • ${issue.path.join(".")}: ${issue.message}`)
    .join("\n");
}

export async function loadFromFile(filePath: string): Promise<Portfolio> {
  if (!existsSync(filePath)) {
    throw new Error(
      `File not found: ${filePath}\n\n  Run \`npx clifolio@latest init\` to create a config file, or provide a valid path.`
    );
  }

  const content = await readFile(filePath, "utf-8");

  let data: unknown;
  try {
    data = loadYaml(content);
  } catch {
    throw new Error(
      `Invalid YAML in ${filePath}. Please check your syntax.`
    );
  }

  try {
    return PortfolioSchema.parse(data);
  } catch (err) {
    if (err instanceof ZodError) {
      throw new Error(
        `Invalid portfolio config in ${filePath}:\n${formatZodError(err)}`
      );
    }
    throw err;
  }
}

export async function loadFromGist(username: string): Promise<Portfolio> {
  let res: Response;
  try {
    res = await fetch(
      `https://api.github.com/users/${username}/gists`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "clifolio-cli",
        },
      }
    );
  } catch {
    throw new Error(
      `Network error: Could not connect to GitHub API.\n  Check your internet connection and try again.`
    );
  }

  if (res.status === 404) {
    throw new Error(
      `GitHub user @${username} not found.\n  Double-check the username and try again.`
    );
  }

  if (res.status === 403) {
    throw new Error(
      `GitHub API rate limit exceeded.\n  Wait a few minutes and try again, or use --file with a local config.`
    );
  }

  if (!res.ok) {
    throw new Error(
      `Failed to fetch gists for @${username}: ${res.status} ${res.statusText}`
    );
  }

  const gists = (await res.json()) as Array<{
    files: Record<string, { filename: string; raw_url: string }>;
  }>;

  const gist = gists.find((g) =>
    Object.keys(g.files).some((f) => f === "clifolio.yml")
  );

  if (!gist) {
    throw new Error(
      `No clifolio.yml gist found for @${username}.\n\n  To set up your portfolio:\n    1. Run \`npx clifolio@latest init\` to create a config file\n    2. Create a public GitHub Gist named "clifolio.yml"\n    3. Paste your config content into the gist`
    );
  }

  const file = gist.files["clifolio.yml"];
  const rawRes = await fetch(file.raw_url);

  if (!rawRes.ok) {
    throw new Error(`Failed to fetch clifolio.yml content: ${rawRes.status}`);
  }

  const content = await rawRes.text();

  let data: unknown;
  try {
    data = loadYaml(content);
  } catch {
    throw new Error(
      `Invalid YAML in @${username}'s clifolio.yml gist. The gist content has syntax errors.`
    );
  }

  try {
    return PortfolioSchema.parse(data);
  } catch (err) {
    if (err instanceof ZodError) {
      throw new Error(
        `Invalid portfolio config in @${username}'s gist:\n${formatZodError(err)}`
      );
    }
    throw err;
  }
}

export async function loadPortfolio(
  source: string
): Promise<Portfolio> {
  if (source.startsWith("@")) {
    return loadFromGist(source.slice(1));
  }
  return loadFromFile(source);
}
