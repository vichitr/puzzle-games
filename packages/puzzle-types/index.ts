/**
 * Framework-agnostic TypeScript types for Puzzle Games JSON data.
 * @see https://puzzlegames.fun
 * @see https://github.com/vichitr/puzzle-games/blob/main/docs/puzzle-data-format.md
 */

export type PuzzleDifficulty = "easy" | "medium" | "hard";
export type PuzzleSource = "linkedin" | "site";
export type PuzzleKind = "daily" | "level";

export type PuzzleType =
  | "queens"
  | "tango"
  | "zip"
  | "mini-sudoku"
  | "patches"
  | "crossclimb"
  | "pinpoint";

/** Fields shared by every puzzle JSON file. */
export interface BasePuzzle {
  id: string;
  type: PuzzleType | string;
  date: string;
  difficulty?: PuzzleDifficulty;
  source?: PuzzleSource;
  kind?: PuzzleKind;
  level?: number;
  tags?: string[];
}

export interface QueensPuzzle extends BasePuzzle {
  type: "queens";
  size: number;
  regions: number[][];
  solution: number[];
  revealOrder?: number[];
}

export type TangoSymbol = "sun" | "moon";
export type TangoCell = TangoSymbol | null;

export interface TangoConstraint {
  a: [number, number];
  b: [number, number];
  op: "=" | "x";
}

export interface TangoPuzzle extends BasePuzzle {
  type: "tango";
  size: number;
  given: TangoCell[][];
  constraints: TangoConstraint[];
  solution: TangoSymbol[][];
  revealOrder?: [number, number][];
}

export interface ZipWall {
  a: [number, number];
  b: [number, number];
}

export interface ZipPuzzle extends BasePuzzle {
  type: "zip";
  size: number;
  numbers: number[][];
  walls: ZipWall[];
  solution: [number, number][];
}

export type SudokuCell = number | null;

export interface MiniSudokuPuzzle extends BasePuzzle {
  type: "mini-sudoku";
  size: number;
  boxRows: number;
  boxCols: number;
  given: SudokuCell[][];
  solution: number[][];
}

export type PatchShape = "square" | "tall" | "wide" | "any";

export interface PatchClue {
  r: number;
  c: number;
  area: number;
  shape: PatchShape;
}

export interface PatchRect {
  r: number;
  c: number;
  w: number;
  h: number;
}

export interface PatchesPuzzle extends BasePuzzle {
  type: "patches";
  rows: number;
  cols: number;
  clues: PatchClue[];
  solution: PatchRect[];
}

export interface CrossclimbRung {
  clue: string;
  answer: string;
}

export interface CrossclimbPuzzle extends BasePuzzle {
  type: "crossclimb";
  length: number;
  top: string;
  bottom: string;
  comboClue: string;
  middle: CrossclimbRung[];
}

export interface PinpointPuzzle extends BasePuzzle {
  type: "pinpoint";
  clues: string[];
  category: string;
  acceptedAnswers: string[];
}

export type Puzzle =
  | QueensPuzzle
  | TangoPuzzle
  | ZipPuzzle
  | MiniSudokuPuzzle
  | PatchesPuzzle
  | CrossclimbPuzzle
  | PinpointPuzzle;

/** Lightweight listing shape used for archive pages. */
export interface PuzzleSummary {
  id: string;
  type: string;
  date: string;
  difficulty?: PuzzleDifficulty;
  source: PuzzleSource;
  kind: PuzzleKind;
  level?: number;
  tags: string[];
  slug: string;
}

/** Metadata for each game type (labels and descriptions). */
export interface PuzzleTypeMeta {
  type: PuzzleType;
  label: string;
  description: string;
  supportsRandom?: boolean;
}

export const PUZZLE_TYPES: PuzzleTypeMeta[] = [
  {
    type: "queens",
    label: "Queens",
    description:
      "Place one queen per row, column and color region so none touch.",
  },
  {
    type: "tango",
    label: "Tango",
    description:
      "Fill the grid with suns and moons, balanced and never three in a row.",
  },
  {
    type: "zip",
    label: "Zip",
    description:
      "Draw one path through every cell, hitting the numbers 1..N in order.",
  },
  {
    type: "mini-sudoku",
    label: "Mini Sudoku",
    description:
      "Fill the 6x6 grid so every row, column and box holds 1-6 once.",
  },
  {
    type: "patches",
    label: "Patches",
    description:
      "Tile the grid with rectangles, one per numbered clue, no gaps or overlaps.",
  },
  {
    type: "crossclimb",
    label: "Crossclimb",
    description:
      "Solve the clues and order a word ladder that changes one letter at a time.",
    supportsRandom: false,
  },
  {
    type: "pinpoint",
    label: "Pinpoint",
    description:
      "Guess the category linking five clues in as few reveals as possible.",
    supportsRandom: false,
  },
];
