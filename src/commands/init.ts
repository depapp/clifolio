import { writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { createInterface } from "node:readline/promises";

const TEMPLATE = `# clifolio.yml — Your terminal portfolio
# Docs: https://github.com/yourusername/clifolio

theme: ocean  # Options: default, ocean, dracula, monokai, nord

name: "{{NAME}}"
title: "{{TITLE}}"
tagline: "{{TAGLINE}}"

about: |
  Write a short bio about yourself here.
  Share what drives you and what you're passionate about.

skills:
  - name: JavaScript
    level: 90
  - name: TypeScript
    level: 85
  - name: React
    level: 80
  - name: Node.js
    level: 75
  # Add more skills...

experience:
  - company: "Your Company"
    role: "Your Role"
    period: "2023 - Present"
    description: "Describe what you do..."
  # Add more experience...

projects:
  - name: "My Project"
    description: "A brief description of your project"
    tech: ["TypeScript", "React"]
    url: "https://github.com/you/project"
    # stars: 100  # Optional
  # Add more projects...

education:
  - institution: "Your University"
    degree: "B.S. Computer Science"
    year: "2023"
  # Add more education...

contact:
  email: "you@example.com"
  github: "{{GITHUB}}"
  # linkedin: "yourname"
  # twitter: "yourhandle"
  # website: "https://yoursite.dev"
`;

async function prompt(
  rl: ReturnType<typeof createInterface>,
  question: string,
  defaultValue: string
): Promise<string> {
  const answer = await rl.question(`  ${question} (${defaultValue}): `);
  return answer.trim() || defaultValue;
}

export async function runInit(outputPath: string = "clifolio.yml") {
  if (existsSync(outputPath)) {
    console.error(`\n  ⚠️  ${outputPath} already exists. Use a different filename or delete the existing file.\n`);
    process.exit(1);
  }

  console.log("\n  🖥️  Welcome to clifolio! Let's create your portfolio config.\n");

  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  try {
    const name = await prompt(rl, "Your name", "Jane Doe");
    const title = await prompt(rl, "Your title", "Software Developer");
    const tagline = await prompt(rl, "Your tagline", "Building cool things");
    const github = await prompt(rl, "GitHub username", "username");

    const content = TEMPLATE
      .replace("{{NAME}}", name)
      .replace("{{TITLE}}", title)
      .replace("{{TAGLINE}}", tagline)
      .replace("{{GITHUB}}", github);

    await writeFile(outputPath, content, "utf-8");

    console.log(`\n  ✅ Created ${outputPath}`);
    console.log(`\n  Next steps:`);
    console.log(`    1. Edit ${outputPath} to fill in your details`);
    console.log(`    2. Preview: npx clifolio@latest --file ${outputPath}`);
    console.log(`    3. Create a public GitHub Gist named "clifolio.yml"`);
    console.log(`    4. Share: npx clifolio@latest @${github}\n`);
  } finally {
    rl.close();
  }
}
