# Puzzle Games

Public companion repo for [**Puzzle Games**](https://puzzlegames.fun) — a free, browser-based collection of daily logic and word puzzles with interactive play, step-by-step solutions, level tracks, and archives.

> **Play now:** [puzzlegames.fun](https://puzzlegames.fun)

## What is Puzzle Games?

[Puzzle Games](https://puzzlegames.fun) is a static Next.js app that hosts seven puzzle types inspired by LinkedIn's daily games. Every puzzle is stored as plain JSON — no database, no backend. You can play in the browser, replay archived dailies, climb exclusive level tracks with saved progress, or generate random practice puzzles.

This repository documents the project, publishes reusable puzzle schemas and sample data, and tracks public-facing progress. The full application source lives in a private repo.

## Games

| Game | Description | Play | Level track |
|------|-------------|------|-------------|
| **Queens** | Place one queen per row, column, and color region — none may touch | [Play Queens](https://puzzlegames.fun/queens) | [Levels](https://puzzlegames.fun/queens/level-1) |
| **Tango** | Fill the grid with suns and moons, balanced and never three in a row | [Play Tango](https://puzzlegames.fun/tango) | [Levels](https://puzzlegames.fun/tango/level-1) |
| **Zip** | Draw one path through every cell, visiting numbered checkpoints in order | [Play Zip](https://puzzlegames.fun/zip) | [Levels](https://puzzlegames.fun/zip/level-1) |
| **Mini Sudoku** | Fill a 6×6 grid so every row, column, and box holds 1–6 once | [Play Mini Sudoku](https://puzzlegames.fun/mini-sudoku) | [Levels](https://puzzlegames.fun/mini-sudoku/level-1) |
| **Patches** | Tile the grid with rectangles, one per numbered clue | [Play Patches](https://puzzlegames.fun/patches) | [Levels](https://puzzlegames.fun/patches/level-1) |
| **Crossclimb** | Solve clues and order a word ladder that changes one letter at a time | [Play Crossclimb](https://puzzlegames.fun/crossclimb) | [Levels](https://puzzlegames.fun/crossclimb/level-1) |
| **Pinpoint** | Guess the category linking five clues in as few reveals as possible | [Play Pinpoint](https://puzzlegames.fun/pinpoint) | [Levels](https://puzzlegames.fun/pinpoint/level-1) |

Browse the full archive at [puzzlegames.fun/archive](https://puzzlegames.fun/archive) or replay LinkedIn dailies at [puzzlegames.fun/linkedin-puzzles](https://puzzlegames.fun/linkedin-puzzles).

## Features

- **Interactive play** — live rule validation, conflict highlighting, and win detection on every board
- **Step-by-step solutions** — cell-by-cell reveal with prev / play / next controls
- **Level tracks** — 20+ hand-authored levels per game with browser-saved progress
- **Random mode** — on-demand practice puzzles for most game types
- **LinkedIn archive** — replay past LinkedIn daily puzzles with solutions
- **Fully static** — JSON data + Next.js static export, deployed on Vercel with zero config
- **SEO & discovery** — structured data, sitemaps, and [llms.txt](https://puzzlegames.fun/llms.txt) for AI crawlers

## Repository contents

| Path | Description |
|------|-------------|
| [`docs/architecture.md`](docs/architecture.md) | How the app is structured and how puzzles are loaded |
| [`docs/puzzle-data-format.md`](docs/puzzle-data-format.md) | JSON schema reference for all seven puzzle types |
| [`examples/`](examples/) | Sample level-1 puzzle JSON for each game type |
| [`packages/puzzle-types/`](packages/puzzle-types/) | Framework-agnostic TypeScript types for puzzle data |
| [`llms.txt`](llms.txt) | Machine-readable site summary with canonical links |

## Tech stack

- [Next.js 14](https://nextjs.org/) (App Router) + TypeScript + Tailwind CSS
- Static generation — puzzles read from JSON at build time
- [@vercel/analytics](https://vercel.com/docs/analytics) & [Speed Insights](https://vercel.com/docs/speed-insights)
- Deployed at [puzzlegames.fun](https://puzzlegames.fun) via Vercel

## Quick links

- **Live site:** [puzzlegames.fun](https://puzzlegames.fun)
- **Logic puzzles hub:** [puzzlegames.fun/logic-puzzles](https://puzzlegames.fun/logic-puzzles)
- **Word puzzles hub:** [puzzlegames.fun/word-puzzles](https://puzzlegames.fun/word-puzzles)
- **Easy / Medium / Hard collections:** [easy](https://puzzlegames.fun/easy-puzzles) · [medium](https://puzzlegames.fun/medium-puzzles) · [hard](https://puzzlegames.fun/hard-puzzles)

## License

Sample puzzle data and TypeScript types in this repo are released under the [MIT License](LICENSE). Puzzle Games branding and the full web application are © Puzzle Games.
