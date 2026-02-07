import { Command } from "commander";
import { loadPortfolio } from "./config/loader.js";

export interface CliOptions {
  command: "view" | "init";
  file?: string;
  theme?: string;
  noAnimation: boolean;
  source?: string;
  output?: string;
}

export async function parseCli(argv: string[]): Promise<CliOptions> {
  let result: CliOptions | undefined;

  const program = new Command();

  program
    .name("termfolio")
    .description(
      "🖥️  View developer portfolios right in your terminal"
    )
    .version("1.0.0");

  program
    .command("init")
    .description("Create a new termfolio.yml config file interactively")
    .option("-o, --output <path>", "Output file path", "termfolio.yml")
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
        console.log(
          "\n  🖥️  termfolio — View developer portfolios in your terminal\n"
        );
        console.log("  Usage:");
        console.log("    termfolio @username          Fetch portfolio from GitHub Gist");
        console.log("    termfolio --file config.yml  Load from local YAML file");
        console.log("    termfolio init               Create a new config interactively\n");
        console.log("  Examples:");
        console.log("    npx termfolio @janedoe");
        console.log("    npx termfolio --file portfolio.yml --theme dracula\n");
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
