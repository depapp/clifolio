# clifolio. portfolios that live in the terminal.

A CLI that generates a beautiful, interactive terminal-based portfolio/resume from a YAML config. Anyone can run `npx clifolio @username` to see your portfolio with animations, project showcases, and contact info — right in the terminal.

## ✨ Features

- 🎨 **5 built-in themes** — default, ocean, dracula, monokai, nord
- ⌨️ **Keyboard navigation** — arrow keys or vim-style h/l to switch sections
- 🔤 **ASCII art header** — your name rendered in figlet with theme-matched colors
- 📊 **Visual skill bars** — progress bar visualization for your tech stack
- 📁 **Project showcase** — cards with tech tags, star counts, and clickable links
- 💼 **Work timeline** — clean timeline layout for experience
- 🔗 **Open links** — press `o` to open project URLs or contact links in your browser
- ✍️ **Typing animation** — smooth character-by-character reveal effect
- 🖥️ **GitHub Gist integration** — host your config as a gist, share via `npx clifolio @you`
- 🛠️ **Interactive scaffolder** — `npx clifolio@latest init` creates a config file for you
- ⚡ **Loading spinner** — animated feedback while fetching remote portfolios
- 🎯 **Friendly errors** — clear, actionable error messages

## 🚀 Quick Start

```bash
# View someone's portfolio
npx clifolio @username

# View from a local YAML file
npx clifolio --file portfolio.yml

# Create your own portfolio config
npx clifolio@latest init
```

## 📋 Setup Your Portfolio

### Step 1: Create your config file

```bash
npx clifolio@latest init
```

This will interactively ask for your name, title, tagline, and GitHub username, then generate a `clifolio.yml` file.

### Step 2: Edit your config

Open `clifolio.yml` and fill in your skills, experience, projects, education, and contact info. See the [Config Reference](#-config-reference) below for all available fields.

### Step 3: Preview locally

```bash
npx clifolio --file clifolio.yml
```

Make sure everything looks good before publishing.

### Step 4: Publish to GitHub Gist

This is how other people will access your portfolio from anywhere in the world.

1. Go to [gist.github.com](https://gist.github.com)
2. Set the filename to exactly **`clifolio.yml`**
3. Paste the contents of your local `clifolio.yml` into the gist
4. Click **"Create public gist"** (must be public, not secret!)

> ⚠️ The gist filename **must** be `clifolio.yml` — this is how the CLI finds your portfolio.

### Step 5: Share your portfolio

Once your gist is live, anyone can view your portfolio by running:

```bash
npx clifolio @yourgithubusername
```

That's it! No servers, no hosting, no deployments. Your portfolio lives as a simple gist and is viewable from any terminal in the world.

### How it works under the hood

When someone runs `npx clifolio @username`, the CLI:
1. Calls the GitHub API to list the user's public gists
2. Finds the gist containing a file named `clifolio.yml`
3. Downloads the raw YAML content
4. Validates it against the schema
5. Renders the interactive portfolio in the terminal

## Usage

```
Usage: clifolio [options] [command]

🖥️  View developer portfolios right in your terminal

Options:
  -V, --version         output the version number
  -h, --help            display help for command

Commands:
  init                  Create a new clifolio.yml config file interactively
  view [options] [source]  View a portfolio in the terminal (default)
```

### View command options

```
  -f, --file <path>     Path to local YAML config file
  -t, --theme <name>    Override theme (default, ocean, dracula, monokai, nord)
  --no-animation        Disable animations
```

## ⌨️ Keyboard Shortcuts

| Key           | Action                    |
| ------------- | ------------------------- |
| `←` / `h`     | Previous section          |
| `→` / `l`     | Next section              |
| `o`           | Open link in browser      |
| `q`           | Quit                      |

## 📝 Config Reference

Create a `clifolio.yml` file with the following structure:

```yaml
theme: ocean  # Options: default, ocean, dracula, monokai, nord
name: "Your Name"
title: "Your Title"
tagline: "Your tagline"

about: |
  A short bio about yourself...

skills:
  - name: TypeScript
    level: 95       # 0-100
  - name: React
    level: 90

experience:
  - company: "Company Name"
    role: "Your Role"
    period: "2022 - Present"
    description: "What you did..."

projects:
  - name: "Project Name"
    description: "What it does"
    tech: ["TypeScript", "React"]
    url: "https://github.com/you/project"
    stars: 100

education:
  - institution: "University"
    degree: "B.S. Computer Science"
    year: "2020"

contact:
  email: "you@example.com"
  github: "yourusername"
  linkedin: "yourusername"
  twitter: "yourusername"
  website: "https://yoursite.dev"
```

## 🎨 Themes

Five built-in color themes:

| Theme      | Vibe                        |
| ---------- | --------------------------- |
| `default`  | Clean dark (One Dark Pro)   |
| `ocean`    | GitHub-inspired blues       |
| `dracula`  | Purple-accented dark        |
| `monokai`  | Classic editor palette      |
| `nord`     | Arctic, cool-toned          |

Override with `--theme`:

```bash
npx clifolio@latest @username --theme dracula
```

## 🛠️ Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Run locally
node dist/index.js --file examples/sample.yml

# Watch mode
npm run dev
```

## 🏗️ Built With

- [Ink](https://github.com/vadimdemedes/ink) — React for interactive CLIs
- [React](https://react.dev) — Component-based UI
- [Zod](https://zod.dev) — Schema validation
- [Figlet](https://github.com/patorjk/figlet.js) — ASCII art generation
- [Commander](https://github.com/tj/commander.js) — CLI framework
- [js-yaml](https://github.com/nodeca/js-yaml) — YAML parsing

## 📄 License

MIT
