# Architecture

This document describes how [Puzzle Games](https://puzzlegames.fun) is built. The live app is a fully static Next.js site — no API routes, no database, no server-side runtime beyond build time.

## High-level overview

```
data/{type}/{catalog}/   ← plain JSON puzzle files
        ↓
lib/puzzles.ts          ← read & index at build time
        ↓
app/[type]/[id]/        ← static pages (Play + Solution tabs)
        ↓
components/{type}/      ← interactive Board + Solution reveal
lib/{type}/logic.ts     ← rule validation & win detection
```

Each puzzle type is a self-contained module: data types and game logic under `lib/{type}/`, UI under `components/{type}/`, and a registry entry that wires Board and Solution components together.

## Puzzle catalog layout

Puzzles live under `data/{type}/` in three catalog folders:

| Folder | Source | Kind | Example URL |
|--------|--------|------|-------------|
| `linkedin/` | LinkedIn archive | daily | `/queens/linkedin-queens-2026-06-15` |
| `daily/` | Site dailies | daily | `/queens/queens-daily-2026-06-15` |
| `level/` | Level tracks | level | `/queens/level-1` |

Adding a puzzle is as simple as dropping a JSON file into the right folder. The build picks it up automatically — no code changes required.

## Play modes

1. **Archive dailies** — browse and replay dated puzzles from LinkedIn or the site
2. **Level tracks** — numbered sequences (typically 20 levels per game) with progress saved in `localStorage`
3. **Random mode** — procedurally generated puzzles for practice (Queens, Tango, Zip, Mini Sudoku, Patches)
4. **Demo** — a fixed tutorial puzzle per type at `/{type}/demo`

## UI patterns

### Interactive boards

Every game type implements a `Board` component that:

- Renders the puzzle grid from JSON
- Validates moves against game rules in real time
- Highlights conflicts (duplicate queens, broken constraints, etc.)
- Detects win state when the puzzle is solved correctly

### Solution reveals

Every type also implements a `Solution` component powered by a shared `useReveal` hook:

- Steps through the answer cell-by-cell (or row-by-row)
- Prev / Play / Next controls with an optional auto-play timer
- Progress slider to jump to any step

This pattern lets players learn *how* to solve, not just see the final answer.

## Static generation & SEO

- All puzzle routes are pre-rendered via `generateStaticParams`
- Structured data (JSON-LD) on home, game hubs, and puzzle pages
- Sitemaps generated at build time and pinged on deploy
- Intent landing pages for difficulty and category keywords (`/easy-puzzles`, `/logic-puzzles`, etc.)
- [`llms.txt`](https://puzzlegames.fun/llms.txt) served for AI/LLM discovery

## Tech stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Hosting | Vercel (static export) |
| Analytics | Vercel Analytics + Speed Insights |
| Data | JSON files on disk (200+ puzzles) |

## Adding a new puzzle type

1. Define data types + game logic in `lib/{type}/`
2. Build `Board` and `Solution` components in `components/{type}/`
3. Register the type in `lib/puzzle-meta.ts` and `lib/registry.tsx`
4. Add JSON files under `data/{type}/`

See [puzzle-data-format.md](./puzzle-data-format.md) for the JSON schemas used by existing types.

## Related links

- [Play Puzzle Games](https://puzzlegames.fun)
- [Example puzzle JSON](../examples/)
- [TypeScript types](../packages/puzzle-types/)
