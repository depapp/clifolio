# clifolio 🖥️

> View developer portfolios right in your terminal

A CLI that generates a beautiful, interactive terminal-based portfolio/resume from a YAML config. Anyone can run `npx clifolio @username` to see your portfolio with animations, project showcases, and contact info — right in the terminal.

![clifolio demo](https://raw.githubusercontent.com/yourusername/clifolio/main/demo.gif)

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
- 🛠️ **Interactive scaffolder** — `clifolio init` creates a config file for you
- ⚡ **Loading spinner** — animated feedback while fetching remote portfolios
- 🎯 **Friendly errors** — clear, actionable error messages

## 🚀 Quick Start

```bash
# View someone's portfolio
npx clifolio @username

# View from a local YAML file
npx clifolio --file portfolio.yml

# Create your own portfolio config
npx clifolio init
```

## 📋 Setup Your Portfolio

1. Run `npx clifolio init` to scaffold your `clifolio.yml`
2. Edit the file with your details
3. Preview locally: `npx clifolio --file clifolio.yml`
4. Create a **public** GitHub Gist named `clifolio.yml`
5. Share: `npx clifolio @yourgithubusername`

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
npx clifolio @username --theme dracula
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
