# Puzzle data format

Every puzzle on [Puzzle Games](https://puzzlegames.fun) is a JSON file. All types share a common base; type-specific fields are documented below.

Working examples for each game are in [`examples/`](../examples/).

## Base fields

All puzzle JSON files include:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | yes | Stable identifier; usually matches the filename without `.json` |
| `type` | string | yes | Game discriminator (`queens`, `tango`, `zip`, etc.) |
| `date` | string | yes | ISO date (`YYYY-MM-DD`) |
| `difficulty` | `"easy"` \| `"medium"` \| `"hard"` | no | Difficulty label |
| `source` | `"linkedin"` \| `"site"` | no | Content origin (defaults to `linkedin`) |
| `kind` | `"daily"` \| `"level"` | no | Play style (defaults to `daily`) |
| `level` | number | no | Level number when `kind` is `"level"` |

## Queens

Place one queen per row, column, and color region. No two queens may touch (including diagonally).

```json
{
  "id": "1",
  "type": "queens",
  "date": "2026-01-01",
  "difficulty": "easy",
  "size": 5,
  "regions": [[0, 0, 0, 1, 2], "..."],
  "solution": [3, 1, 4, 2, 0],
  "level": 1
}
```

- `regions` — N×N grid of region IDs; each region holds exactly one queen
- `solution[row]` — column index of the queen in that row
- `revealOrder` — optional row reveal order for the solution view

[Play Queens](https://puzzlegames.fun/queens) · [Example](../examples/queens-level-1.json)

## Tango

Fill the grid with suns and moons. Equal counts per row/column, never three of a kind in a line, and all `=` / `×` constraints satisfied.

```json
{
  "id": "1",
  "type": "tango",
  "date": "2026-01-01",
  "size": 4,
  "given": [[null, "moon", "moon", null], "..."],
  "constraints": [{ "a": [1, 1], "b": [1, 2], "op": "x" }],
  "solution": [["sun", "moon", "..."], "..."]
}
```

- `given` — prefilled locked cells (`"sun"` \| `"moon"` \| `null`)
- `constraints` — adjacent pairs with `"="` (equal) or `"x"` (opposite)

[Play Tango](https://puzzlegames.fun/tango) · [Example](../examples/tango-level-1.json)

## Zip

Draw one continuous path through every cell, visiting numbered checkpoints 1..N in order without crossing walls.

```json
{
  "id": "1",
  "type": "zip",
  "date": "2026-01-01",
  "size": 4,
  "numbers": [[0, 0, 0, 0], "..."],
  "walls": [{ "a": [1, 1], "b": [2, 1] }],
  "solution": [[2, 0], [3, 0], "..."]
}
```

- `numbers` — N×N grid; `0` = no checkpoint, otherwise checkpoint order
- `walls` — blocked edges between adjacent cells
- `solution` — ordered list of `[row, col]` covering every cell exactly once

[Play Zip](https://puzzlegames.fun/zip) · [Example](../examples/zip-level-1.json)

## Mini Sudoku

Classic sudoku on a 6×6 grid with 2×3 boxes.

```json
{
  "id": "1",
  "type": "mini-sudoku",
  "date": "2026-01-01",
  "size": 6,
  "boxRows": 2,
  "boxCols": 3,
  "given": [[null, null, 5, 6, 1, 4], "..."],
  "solution": [[3, 2, 5, 6, 1, 4], "..."]
}
```

[Play Mini Sudoku](https://puzzlegames.fun/mini-sudoku) · [Example](../examples/mini-sudoku-level-1.json)

## Patches

Tile the grid with rectangles — one per numbered clue, no gaps or overlaps.

```json
{
  "id": "1",
  "type": "patches",
  "date": "2026-01-01",
  "rows": 4,
  "cols": 4,
  "clues": [{ "r": 2, "c": 0, "shape": "tall", "area": 4 }],
  "solution": [{ "r": 0, "c": 0, "w": 1, "h": 4 }]
}
```

- `clues[].shape` — `"square"` \| `"tall"` \| `"wide"` \| `"any"`

[Play Patches](https://puzzlegames.fun/patches) · [Example](../examples/patches-level-1.json)

## Crossclimb

Solve clue words and order them into a ladder where each adjacent pair differs by exactly one letter.

```json
{
  "id": "1",
  "type": "crossclimb",
  "date": "2026-01-01",
  "length": 4,
  "top": "WARM",
  "bottom": "WORK",
  "comboClue": "A hot day on the job",
  "middle": [{ "clue": "Bug in the garden", "answer": "WORM" }]
}
```

[Play Crossclimb](https://puzzlegames.fun/crossclimb) · [Example](../examples/crossclimb-level-1.json)

## Pinpoint

Guess the category that links five clues. Up to five guesses as clues are revealed one at a time.

```json
{
  "id": "1",
  "type": "pinpoint",
  "date": "2026-01-01",
  "clues": ["Lunch", "Sand", "Mail", "Safe deposit", "Think outside the"],
  "category": "Words that come before \"box\"",
  "acceptedAnswers": ["box"]
}
```

[Play Pinpoint](https://puzzlegames.fun/pinpoint) · [Example](../examples/pinpoint-level-1.json)
