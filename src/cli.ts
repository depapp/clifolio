import { Command } from "commander";
import figlet from "figlet";
import chalk from "chalk";
import { loadPortfolio } from "./config/loader.js";

export interface CliOptions {
  command: "view" | "init";
  file?: string;
  theme?: string;
  noAnimation: boolean;
  source?: string;
  output?: string;
}

function showBanner() {
  const banner = figlet.textSync("clifolio", { font: "Small" });
  console.log(`\n${chalk.cyan(banner)}`);
  console.log(chalk.dim("  Portfolios that live in the terminal.\n"));
}

export async function parseCli(argv: string[]): Promise<CliOptions> {
  let result: CliOptions | undefined;

  const program = new Command();

  program
    .name("clifolio")
    .description(
      "Portfolios that live in the terminal."
    )
    .version("1.0.0")
    .addHelpText("after", `
${chalk.cyan("─── How to publish your portfolio ───")}

  1. Run ${chalk.bold("npx clifolio init")} to create your clifolio.yml
  2. Edit the file with your details (skills, projects, etc.)
  3. Preview locally: ${chalk.bold("npx clifolio --file clifolio.yml")}
  4. Go to ${chalk.underline("https://gist.github.com")}
  5. Create a ${chalk.bold("public")} gist with filename ${chalk.bold("clifolio.yml")}
  6. Paste your config content and save

  Anyone can now view your portfolio from any terminal:
  ${chalk.bold("npx clifolio @yourgithubusername")}
`);

  program
    .command("init")
    .description("Create a new clifolio.yml config file interactively")
    .option("-o, --output <path>", "Output file path", "clifolio.yml")
    .action((opts) => {
      result = {
        command: "init",
        noAnimation: false,
        output: opts.output,
      };
    });

  program
    .command("view", { isDefault: true })
    .description("View a portfolio in the terminal")
    .argument("[source]", "GitHub username (@user) or path to YAML file")
    .option("-f, --file <path>", "Path to local YAML config file")
    .option("-t, --theme <name>", "Override theme (default, ocean, dracula, monokai, nord)")
    .option("--no-animation", "Disable animations")
    .action((source, opts) => {
      const resolvedSource = opts.file ?? source;
      if (!resolvedSource) {
        showBanner();
        console.log("  Usage:");
        console.log("    npx clifolio @username             Fetch portfolio from GitHub Gist");
        console.log("    npx clifolio --file config.yml     Load from local YAML file");
        console.log("    npx clifolio@latest init           Create a new config interactively\n");
        console.log("  Examples:");
        console.log("    npx clifolio @depapp");
        console.log("    npx clifolio --file portfolio.yml --theme dracula\n");
        console.log(chalk.dim("  Run " + chalk.bold("npx clifolio --help") + chalk.dim(" to learn how to publish your portfolio.\n")));
        process.exit(0);
      }
      result = {
        command: "view",
        file: opts.file,
        theme: opts.theme,
        noAnimation: !opts.animation,
        source: resolvedSource,
      };
    });

  await program.parseAsync(argv);

  if (!result) {
    program.help();
    process.exit(1);
  }

  return result;
}

export { loadPortfolio };
