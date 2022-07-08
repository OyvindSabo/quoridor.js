import {
  DecrementableHorizontalPiecePosition,
  DecrementableHorizontalWallCoordinate,
  DecrementableVerticalPiecePosition,
  DecrementableVerticalWallCoordinate,
  HorizontallyDecrementablePawnPosition,
  HorizontallyIncrementablePawnPosition,
  HorizontalPiecePosition,
  HorizontalWallCoordinate,
  IncrementableHorizontalPiecePosition,
  IncrementableHorizontalWallCoordinate,
  IncrementableVerticalPiecePosition,
  IncrementableVerticalWallCoordinate,
  PawnPosition,
  PlayerMatrix,
  VerticallyDecrementablePawnPosition,
  VerticallyIncrementablePawnPosition,
  VerticalPiecePosition,
  VerticalWallCoordinate,
  WallMatrix,
  WallPosition,
} from './types';

export const pawnPositions = [
  'a1',
  'a2',
  'a3',
  'a4',
  'a5',
  'a6',
  'a7',
  'a8',
  'a9',
  'b1',
  'b2',
  'b3',
  'b4',
  'b5',
  'b6',
  'b7',
  'b8',
  'b9',
  'c1',
  'c2',
  'c3',
  'c4',
  'c5',
  'c6',
  'c7',
  'c8',
  'c9',
  'd1',
  'd2',
  'd3',
  'd4',
  'd5',
  'd6',
  'd7',
  'd8',
  'd9',
  'e1',
  'e2',
  'e3',
  'e4',
  'e5',
  'e6',
  'e7',
  'e8',
  'e9',
  'f1',
  'f2',
  'f3',
  'f4',
  'f5',
  'f6',
  'f7',
  'f8',
  'f9',
  'g1',
  'g2',
  'g3',
  'g4',
  'g5',
  'g6',
  'g7',
  'g8',
  'g9',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'h7',
  'h8',
  'h9',
  'i1',
  'i2',
  'i3',
  'i4',
  'i5',
  'i6',
  'i7',
  'i8',
  'i9',
] as PawnPosition[];

export const wallPositions: WallPosition[] = [
  'a1h',
  'a1v',
  'a2h',
  'a2v',
  'a3h',
  'a3v',
  'a4h',
  'a4v',
  'a5h',
  'a5v',
  'a6h',
  'a6v',
  'a7h',
  'a7v',
  'a8h',
  'a8v',
  'b1h',
  'b1v',
  'b2h',
  'b2v',
  'b3h',
  'b3v',
  'b4h',
  'b4v',
  'b5h',
  'b5v',
  'b6h',
  'b6v',
  'b7h',
  'b7v',
  'b8h',
  'b8v',
  'c1h',
  'c1v',
  'c2h',
  'c2v',
  'c3h',
  'c3v',
  'c4h',
  'c4v',
  'c5h',
  'c5v',
  'c6h',
  'c6v',
  'c7h',
  'c7v',
  'c8h',
  'c8v',
  'd1h',
  'd1v',
  'd2h',
  'd2v',
  'd3h',
  'd3v',
  'd4h',
  'd4v',
  'd5h',
  'd5v',
  'd6h',
  'd6v',
  'd7h',
  'd7v',
  'd8h',
  'd8v',
  'e1h',
  'e1v',
  'e2h',
  'e2v',
  'e3h',
  'e3v',
  'e4h',
  'e4v',
  'e5h',
  'e5v',
  'e6h',
  'e6v',
  'e7h',
  'e7v',
  'e8h',
  'e8v',
  'f1h',
  'f1v',
  'f2h',
  'f2v',
  'f3h',
  'f3v',
  'f4h',
  'f4v',
  'f5h',
  'f5v',
  'f6h',
  'f6v',
  'f7h',
  'f7v',
  'f8h',
  'f8v',
  'g1h',
  'g1v',
  'g2h',
  'g2v',
  'g3h',
  'g3v',
  'g4h',
  'g4v',
  'g5h',
  'g5v',
  'g6h',
  'g6v',
  'g7h',
  'g7v',
  'g8h',
  'g8v',
  'h1h',
  'h1v',
  'h2h',
  'h2v',
  'h3h',
  'h3v',
  'h4h',
  'h4v',
  'h5h',
  'h5v',
  'h6h',
  'h6v',
  'h7h',
  'h7v',
  'h8h',
  'h8v',
];

export const isWallPositionMap: Record<string, true | undefined> = {
  a1h: true,
  a1v: true,
  a2h: true,
  a2v: true,
  a3h: true,
  a3v: true,
  a4h: true,
  a4v: true,
  a5h: true,
  a5v: true,
  a6h: true,
  a6v: true,
  a7h: true,
  a7v: true,
  a8h: true,
  a8v: true,
  b1h: true,
  b1v: true,
  b2h: true,
  b2v: true,
  b3h: true,
  b3v: true,
  b4h: true,
  b4v: true,
  b5h: true,
  b5v: true,
  b6h: true,
  b6v: true,
  b7h: true,
  b7v: true,
  b8h: true,
  b8v: true,
  c1h: true,
  c1v: true,
  c2h: true,
  c2v: true,
  c3h: true,
  c3v: true,
  c4h: true,
  c4v: true,
  c5h: true,
  c5v: true,
  c6h: true,
  c6v: true,
  c7h: true,
  c7v: true,
  c8h: true,
  c8v: true,
  d1h: true,
  d1v: true,
  d2h: true,
  d2v: true,
  d3h: true,
  d3v: true,
  d4h: true,
  d4v: true,
  d5h: true,
  d5v: true,
  d6h: true,
  d6v: true,
  d7h: true,
  d7v: true,
  d8h: true,
  d8v: true,
  e1h: true,
  e1v: true,
  e2h: true,
  e2v: true,
  e3h: true,
  e3v: true,
  e4h: true,
  e4v: true,
  e5h: true,
  e5v: true,
  e6h: true,
  e6v: true,
  e7h: true,
  e7v: true,
  e8h: true,
  e8v: true,
  f1h: true,
  f1v: true,
  f2h: true,
  f2v: true,
  f3h: true,
  f3v: true,
  f4h: true,
  f4v: true,
  f5h: true,
  f5v: true,
  f6h: true,
  f6v: true,
  f7h: true,
  f7v: true,
  f8h: true,
  f8v: true,
  g1h: true,
  g1v: true,
  g2h: true,
  g2v: true,
  g3h: true,
  g3v: true,
  g4h: true,
  g4v: true,
  g5h: true,
  g5v: true,
  g6h: true,
  g6v: true,
  g7h: true,
  g7v: true,
  g8h: true,
  g8v: true,
  h1h: true,
  h1v: true,
  h2h: true,
  h2v: true,
  h3h: true,
  h3v: true,
  h4h: true,
  h4v: true,
  h5h: true,
  h5v: true,
  h6h: true,
  h6v: true,
  h7h: true,
  h7v: true,
  h8h: true,
  h8v: true,
};

export const pawnAndWallPositions = [...pawnPositions, ...wallPositions];

export const initialPlayerMatrix: PlayerMatrix = {
  a1: 0,
  a2: 0,
  a3: 0,
  a4: 0,
  a5: 0,
  a6: 0,
  a7: 0,
  a8: 0,
  a9: 0,
  b1: 0,
  b2: 0,
  b3: 0,
  b4: 0,
  b5: 0,
  b6: 0,
  b7: 0,
  b8: 0,
  b9: 0,
  c1: 0,
  c2: 0,
  c3: 0,
  c4: 0,
  c5: 0,
  c6: 0,
  c7: 0,
  c8: 0,
  c9: 0,
  d1: 0,
  d2: 0,
  d3: 0,
  d4: 0,
  d5: 0,
  d6: 0,
  d7: 0,
  d8: 0,
  d9: 0,
  e1: 1,
  e2: 0,
  e3: 0,
  e4: 0,
  e5: 0,
  e6: 0,
  e7: 0,
  e8: 0,
  e9: 2,
  f1: 0,
  f2: 0,
  f3: 0,
  f4: 0,
  f5: 0,
  f6: 0,
  f7: 0,
  f8: 0,
  f9: 0,
  g1: 0,
  g2: 0,
  g3: 0,
  g4: 0,
  g5: 0,
  g6: 0,
  g7: 0,
  g8: 0,
  g9: 0,
  h1: 0,
  h2: 0,
  h3: 0,
  h4: 0,
  h5: 0,
  h6: 0,
  h7: 0,
  h8: 0,
  h9: 0,
  i1: 0,
  i2: 0,
  i3: 0,
  i4: 0,
  i5: 0,
  i6: 0,
  i7: 0,
  i8: 0,
  i9: 0,
};

export const initialWallMatrix: WallMatrix = {
  a1h: false,
  a1v: false,
  a2h: false,
  a2v: false,
  a3h: false,
  a3v: false,
  a4h: false,
  a4v: false,
  a5h: false,
  a5v: false,
  a6h: false,
  a6v: false,
  a7h: false,
  a7v: false,
  a8h: false,
  a8v: false,
  b1h: false,
  b1v: false,
  b2h: false,
  b2v: false,
  b3h: false,
  b3v: false,
  b4h: false,
  b4v: false,
  b5h: false,
  b5v: false,
  b6h: false,
  b6v: false,
  b7h: false,
  b7v: false,
  b8h: false,
  b8v: false,
  c1h: false,
  c1v: false,
  c2h: false,
  c2v: false,
  c3h: false,
  c3v: false,
  c4h: false,
  c4v: false,
  c5h: false,
  c5v: false,
  c6h: false,
  c6v: false,
  c7h: false,
  c7v: false,
  c8h: false,
  c8v: false,
  d1h: false,
  d1v: false,
  d2h: false,
  d2v: false,
  d3h: false,
  d3v: false,
  d4h: false,
  d4v: false,
  d5h: false,
  d5v: false,
  d6h: false,
  d6v: false,
  d7h: false,
  d7v: false,
  d8h: false,
  d8v: false,
  e1h: false,
  e1v: false,
  e2h: false,
  e2v: false,
  e3h: false,
  e3v: false,
  e4h: false,
  e4v: false,
  e5h: false,
  e5v: false,
  e6h: false,
  e6v: false,
  e7h: false,
  e7v: false,
  e8h: false,
  e8v: false,
  f1h: false,
  f1v: false,
  f2h: false,
  f2v: false,
  f3h: false,
  f3v: false,
  f4h: false,
  f4v: false,
  f5h: false,
  f5v: false,
  f6h: false,
  f6v: false,
  f7h: false,
  f7v: false,
  f8h: false,
  f8v: false,
  g1h: false,
  g1v: false,
  g2h: false,
  g2v: false,
  g3h: false,
  g3v: false,
  g4h: false,
  g4v: false,
  g5h: false,
  g5v: false,
  g6h: false,
  g6v: false,
  g7h: false,
  g7v: false,
  g8h: false,
  g8v: false,
  h1h: false,
  h1v: false,
  h2h: false,
  h2v: false,
  h3h: false,
  h3v: false,
  h4h: false,
  h4v: false,
  h5h: false,
  h5v: false,
  h6h: false,
  h6v: false,
  h7h: false,
  h7v: false,
  h8h: false,
  h8v: false,
};

export const horizontalPawnCoordinates: HorizontalPiecePosition[] = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
];

/**
 * These are the only piece positions where a player risks not having a path to the goal if a specific number of walls are placed
 */
export const possiblyTrappedPositions = {
  1: [] as PawnPosition[],
  2: [
    'a1',
    'a2',
    'a8',
    'a9',
    'b1',
    'b2',
    'b8',
    'b9',
    'h1',
    'h2',
    'h8',
    'h9',
    'i1',
    'i2',
    'i8',
    'i9',
  ],
  3: [
    'a1',
    'a2',
    'a3',
    'a4',
    'a5',
    'a6',
    'a7',
    'a8',
    'a9',
    'b1',
    'b2',
    'b3',
    'b4',
    'b5',
    'b6',
    'b7',
    'b8',
    'b9',
    'c1',
    'c2',
    'c8',
    'c9',
    'd1',
    'd2',
    'd8',
    'd9',
    'e1',
    'e2',
    'e8',
    'e9',
    'f1',
    'f2',
    'f8',
    'f9',
    'g1',
    'g2',
    'g8',
    'g9',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'h7',
    'h8',
    'h9',
    'i1',
    'i2',
    'i3',
    'i4',
    'i5',
    'i6',
    'i7',
    'i8',
    'i9',
  ],
};

export const horizontallyIncrementableWallPositions = [
  'a1h',
  'a1v',
  'a2h',
  'a2v',
  'a3h',
  'a3v',
  'a4h',
  'a4v',
  'a5h',
  'a5v',
  'a6h',
  'a6v',
  'a7h',
  'a7v',
  'a8h',
  'a8v',
  'b1h',
  'b1v',
  'b2h',
  'b2v',
  'b3h',
  'b3v',
  'b4h',
  'b4v',
  'b5h',
  'b5v',
  'b6h',
  'b6v',
  'b7h',
  'b7v',
  'b8h',
  'b8v',
  'c1h',
  'c1v',
  'c2h',
  'c2v',
  'c3h',
  'c3v',
  'c4h',
  'c4v',
  'c5h',
  'c5v',
  'c6h',
  'c6v',
  'c7h',
  'c7v',
  'c8h',
  'c8v',
  'd1h',
  'd1v',
  'd2h',
  'd2v',
  'd3h',
  'd3v',
  'd4h',
  'd4v',
  'd5h',
  'd5v',
  'd6h',
  'd6v',
  'd7h',
  'd7v',
  'd8h',
  'd8v',
  'e1h',
  'e1v',
  'e2h',
  'e2v',
  'e3h',
  'e3v',
  'e4h',
  'e4v',
  'e5h',
  'e5v',
  'e6h',
  'e6v',
  'e7h',
  'e7v',
  'e8h',
  'e8v',
  'f1h',
  'f1v',
  'f2h',
  'f2v',
  'f3h',
  'f3v',
  'f4h',
  'f4v',
  'f5h',
  'f5v',
  'f6h',
  'f6v',
  'f7h',
  'f7v',
  'f8h',
  'f8v',
  'g1h',
  'g1v',
  'g2h',
  'g2v',
  'g3h',
  'g3v',
  'g4h',
  'g4v',
  'g5h',
  'g5v',
  'g6h',
  'g6v',
  'g7h',
  'g7v',
  'g8h',
  'g8v',
];

export const horizontallyDecrementableWallPositions = [
  'b1h',
  'b1v',
  'b2h',
  'b2v',
  'b3h',
  'b3v',
  'b4h',
  'b4v',
  'b5h',
  'b5v',
  'b6h',
  'b6v',
  'b7h',
  'b7v',
  'b8h',
  'b8v',
  'c1h',
  'c1v',
  'c2h',
  'c2v',
  'c3h',
  'c3v',
  'c4h',
  'c4v',
  'c5h',
  'c5v',
  'c6h',
  'c6v',
  'c7h',
  'c7v',
  'c8h',
  'c8v',
  'd1h',
  'd1v',
  'd2h',
  'd2v',
  'd3h',
  'd3v',
  'd4h',
  'd4v',
  'd5h',
  'd5v',
  'd6h',
  'd6v',
  'd7h',
  'd7v',
  'd8h',
  'd8v',
  'e1h',
  'e1v',
  'e2h',
  'e2v',
  'e3h',
  'e3v',
  'e4h',
  'e4v',
  'e5h',
  'e5v',
  'e6h',
  'e6v',
  'e7h',
  'e7v',
  'e8h',
  'e8v',
  'f1h',
  'f1v',
  'f2h',
  'f2v',
  'f3h',
  'f3v',
  'f4h',
  'f4v',
  'f5h',
  'f5v',
  'f6h',
  'f6v',
  'f7h',
  'f7v',
  'f8h',
  'f8v',
  'g1h',
  'g1v',
  'g2h',
  'g2v',
  'g3h',
  'g3v',
  'g4h',
  'g4v',
  'g5h',
  'g5v',
  'g6h',
  'g6v',
  'g7h',
  'g7v',
  'g8h',
  'g8v',
  'h1h',
  'h1v',
  'h2h',
  'h2v',
  'h3h',
  'h3v',
  'h4h',
  'h4v',
  'h5h',
  'h5v',
  'h6h',
  'h6v',
  'h7h',
  'h7v',
  'h8h',
  'h8v',
];

export const verticallyIncrementableWallPositions = [
  'a1h',
  'a1v',
  'a2h',
  'a2v',
  'a3h',
  'a3v',
  'a4h',
  'a4v',
  'a5h',
  'a5v',
  'a6h',
  'a6v',
  'a7h',
  'a7v',
  'b1h',
  'b1v',
  'b2h',
  'b2v',
  'b3h',
  'b3v',
  'b4h',
  'b4v',
  'b5h',
  'b5v',
  'b6h',
  'b6v',
  'b7h',
  'b7v',
  'c1h',
  'c1v',
  'c2h',
  'c2v',
  'c3h',
  'c3v',
  'c4h',
  'c4v',
  'c5h',
  'c5v',
  'c6h',
  'c6v',
  'c7h',
  'c7v',
  'd1h',
  'd1v',
  'd2h',
  'd2v',
  'd3h',
  'd3v',
  'd4h',
  'd4v',
  'd5h',
  'd5v',
  'd6h',
  'd6v',
  'd7h',
  'd7v',
  'e1h',
  'e1v',
  'e2h',
  'e2v',
  'e3h',
  'e3v',
  'e4h',
  'e4v',
  'e5h',
  'e5v',
  'e6h',
  'e6v',
  'e7h',
  'e7v',
  'f1h',
  'f1v',
  'f2h',
  'f2v',
  'f3h',
  'f3v',
  'f4h',
  'f4v',
  'f5h',
  'f5v',
  'f6h',
  'f6v',
  'f7h',
  'f7v',
  'g1h',
  'g1v',
  'g2h',
  'g2v',
  'g3h',
  'g3v',
  'g4h',
  'g4v',
  'g5h',
  'g5v',
  'g6h',
  'g6v',
  'g7h',
  'g7v',
  'h1h',
  'h1v',
  'h2h',
  'h2v',
  'h3h',
  'h3v',
  'h4h',
  'h4v',
  'h5h',
  'h5v',
  'h6h',
  'h6v',
  'h7h',
  'h7v',
];

export const verticallyDecrementableWallPositions = [
  'a2h',
  'a2v',
  'a3h',
  'a3v',
  'a4h',
  'a4v',
  'a5h',
  'a5v',
  'a6h',
  'a6v',
  'a7h',
  'a7v',
  'a8h',
  'a8v',
  'b2h',
  'b2v',
  'b3h',
  'b3v',
  'b4h',
  'b4v',
  'b5h',
  'b5v',
  'b6h',
  'b6v',
  'b7h',
  'b7v',
  'b8h',
  'b8v',
  'c2h',
  'c2v',
  'c3h',
  'c3v',
  'c4h',
  'c4v',
  'c5h',
  'c5v',
  'c6h',
  'c6v',
  'c7h',
  'c7v',
  'c8h',
  'c8v',
  'd2h',
  'd2v',
  'd3h',
  'd3v',
  'd4h',
  'd4v',
  'd5h',
  'd5v',
  'd6h',
  'd6v',
  'd7h',
  'd7v',
  'd8h',
  'd8v',
  'e2h',
  'e2v',
  'e3h',
  'e3v',
  'e4h',
  'e4v',
  'e5h',
  'e5v',
  'e6h',
  'e6v',
  'e7h',
  'e7v',
  'e8h',
  'e8v',
  'f2h',
  'f2v',
  'f3h',
  'f3v',
  'f4h',
  'f4v',
  'f5h',
  'f5v',
  'f6h',
  'f6v',
  'f7h',
  'f7v',
  'f8h',
  'f8v',
  'g2h',
  'g2v',
  'g3h',
  'g3v',
  'g4h',
  'g4v',
  'g5h',
  'g5v',
  'g6h',
  'g6v',
  'g7h',
  'g7v',
  'g8h',
  'g8v',
  'h2h',
  'h2v',
  'h3h',
  'h3v',
  'h4h',
  'h4v',
  'h5h',
  'h5v',
  'h6h',
  'h6v',
  'h7h',
  'h7v',
  'h8h',
  'h8v',
];

export const verticalPiecePositions = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export const decrementedHorizontalWallCoordinates: Record<
  DecrementableHorizontalWallCoordinate,
  IncrementableHorizontalWallCoordinate
> = {
  b: 'a',
  c: 'b',
  d: 'c',
  e: 'd',
  f: 'e',
  g: 'f',
  h: 'g',
};

export const incrementedHorizontalWallCoordinates: Record<
  IncrementableHorizontalWallCoordinate,
  DecrementableHorizontalWallCoordinate
> = {
  a: 'b',
  b: 'c',
  c: 'd',
  d: 'e',
  e: 'f',
  f: 'g',
  g: 'h',
};

export const decrementedVerticalWallCoordinates: Record<
  DecrementableVerticalWallCoordinate,
  IncrementableVerticalWallCoordinate
> = {
  2: 1,
  3: 2,
  4: 3,
  5: 4,
  6: 5,
  7: 6,
  8: 7,
};

export const incrementedVerticalWallCoordinates: Record<
  IncrementableVerticalWallCoordinate,
  DecrementableVerticalWallCoordinate
> = {
  1: 2,
  2: 3,
  3: 4,
  4: 5,
  5: 6,
  6: 7,
  7: 8,
};

export const decrementedHorizontalPiecePositions: Record<
  DecrementableHorizontalPiecePosition,
  IncrementableHorizontalPiecePosition
> = {
  b: 'a',
  c: 'b',
  d: 'c',
  e: 'd',
  f: 'e',
  g: 'f',
  h: 'g',
  i: 'h',
};

export const decrementedVerticalPiecePositions: Record<
  DecrementableVerticalPiecePosition,
  IncrementableVerticalPiecePosition
> = {
  2: 1,
  3: 2,
  4: 3,
  5: 4,
  6: 5,
  7: 6,
  8: 7,
  9: 8,
};

export const incrementedVerticalPiecePositions: Record<
  IncrementableVerticalPiecePosition,
  DecrementableVerticalPiecePosition
> = {
  1: 2,
  2: 3,
  3: 4,
  4: 5,
  5: 6,
  6: 7,
  7: 8,
  8: 9,
};

export const incrementedHorizontalPiecePositions: Record<
  IncrementableHorizontalPiecePosition,
  DecrementableHorizontalPiecePosition
> = {
  a: 'b',
  b: 'c',
  c: 'd',
  d: 'e',
  e: 'f',
  f: 'g',
  g: 'h',
  h: 'i',
};

export const isHorizontalWallCoordinateMap: Record<
  HorizontalPiecePosition | HorizontalWallCoordinate,
  boolean
> = {
  a: true,
  b: true,
  c: true,
  d: true,
  e: true,
  f: true,
  g: true,
  h: true,
  i: false,
};

export const isVerticalWallCoordinateMap: Record<
  VerticalPiecePosition | VerticalWallCoordinate,
  boolean
> = {
  1: true,
  2: true,
  3: true,
  4: true,
  5: true,
  6: true,
  7: true,
  8: true,
  9: false,
};

export const isIncrementableHorizontalWallCoordinateMap: Record<
  HorizontalPiecePosition | HorizontalWallCoordinate,
  boolean
> = {
  a: true,
  b: true,
  c: true,
  d: true,
  e: true,
  f: true,
  g: true,
  h: false,
  i: false,
};

export const isDecrementableHorizontalWallCoordinateMap: Record<
  HorizontalPiecePosition | HorizontalWallCoordinate,
  boolean
> = {
  a: false,
  b: true,
  c: true,
  d: true,
  e: true,
  f: true,
  g: true,
  h: true,
  i: false,
};

export const isIncrementableVerticalWallCoordinateMap: Record<
  VerticalPiecePosition | VerticalWallCoordinate,
  boolean
> = {
  1: true,
  2: true,
  3: true,
  4: true,
  5: true,
  6: true,
  7: true,
  8: false,
  9: false,
};

export const isDecrementableVerticalWallCoordinateMap: Record<
  VerticalPiecePosition | VerticalWallCoordinate,
  boolean
> = {
  1: false,
  2: true,
  3: true,
  4: true,
  5: true,
  6: true,
  7: true,
  8: true,
  9: false,
};

export const isIncrementableHorizontalPiecePositionMap: Record<
  HorizontalPiecePosition | HorizontalWallCoordinate,
  boolean
> = {
  a: true,
  b: true,
  c: true,
  d: true,
  e: true,
  f: true,
  g: true,
  h: true,
  i: false,
};

export const isDecrementableHorizontalPiecePositionMap: Record<
  HorizontalPiecePosition | HorizontalWallCoordinate,
  boolean
> = {
  a: false,
  b: true,
  c: true,
  d: true,
  e: true,
  f: true,
  g: true,
  h: true,
  i: true,
};

export const isIncrementableVerticalPiecePositionMap: Record<
  VerticalPiecePosition | VerticalWallCoordinate,
  boolean
> = {
  1: true,
  2: true,
  3: true,
  4: true,
  5: true,
  6: true,
  7: true,
  8: true,
  9: false,
};

export const isDecrementableVerticalPiecePositionMap: Record<
  VerticalPiecePosition | VerticalWallCoordinate,
  boolean
> = {
  1: false,
  2: true,
  3: true,
  4: true,
  5: true,
  6: true,
  7: true,
  8: true,
  9: true,
};

export const verticallyIncrementedPawnPositions: Record<
  VerticallyIncrementablePawnPosition,
  PawnPosition
> = {
  a1: 'a2',
  a2: 'a3',
  a3: 'a4',
  a4: 'a5',
  a5: 'a6',
  a6: 'a7',
  a7: 'a8',
  a8: 'a9',
  b1: 'b2',
  b2: 'b3',
  b3: 'b4',
  b4: 'b5',
  b5: 'b6',
  b6: 'b7',
  b7: 'b8',
  b8: 'b9',
  c1: 'c2',
  c2: 'c3',
  c3: 'c4',
  c4: 'c5',
  c5: 'c6',
  c6: 'c7',
  c7: 'c8',
  c8: 'c9',
  d1: 'd2',
  d2: 'd3',
  d3: 'd4',
  d4: 'd5',
  d5: 'd6',
  d6: 'd7',
  d7: 'd8',
  d8: 'd9',
  e1: 'e2',
  e2: 'e3',
  e3: 'e4',
  e4: 'e5',
  e5: 'e6',
  e6: 'e7',
  e7: 'e8',
  e8: 'e9',
  f1: 'f2',
  f2: 'f3',
  f3: 'f4',
  f4: 'f5',
  f5: 'f6',
  f6: 'f7',
  f7: 'f8',
  f8: 'f9',
  g1: 'g2',
  g2: 'g3',
  g3: 'g4',
  g4: 'g5',
  g5: 'g6',
  g6: 'g7',
  g7: 'g8',
  g8: 'g9',
  h1: 'h2',
  h2: 'h3',
  h3: 'h4',
  h4: 'h5',
  h5: 'h6',
  h6: 'h7',
  h7: 'h8',
  h8: 'h9',
  i1: 'i2',
  i2: 'i3',
  i3: 'i4',
  i4: 'i5',
  i5: 'i6',
  i6: 'i7',
  i7: 'i8',
  i8: 'i9',
};

export const isVerticallyIncrementablePawnPositionMap = {
  a1: true,
  a2: true,
  a3: true,
  a4: true,
  a5: true,
  a6: true,
  a7: true,
  a8: true,
  a9: false,
  b1: true,
  b2: true,
  b3: true,
  b4: true,
  b5: true,
  b6: true,
  b7: true,
  b8: true,
  b9: false,
  c1: true,
  c2: true,
  c3: true,
  c4: true,
  c5: true,
  c6: true,
  c7: true,
  c8: true,
  c9: false,
  d1: true,
  d2: true,
  d3: true,
  d4: true,
  d5: true,
  d6: true,
  d7: true,
  d8: true,
  d9: false,
  e1: true,
  e2: true,
  e3: true,
  e4: true,
  e5: true,
  e6: true,
  e7: true,
  e8: true,
  e9: false,
  f1: true,
  f2: true,
  f3: true,
  f4: true,
  f5: true,
  f6: true,
  f7: true,
  f8: true,
  f9: false,
  g1: true,
  g2: true,
  g3: true,
  g4: true,
  g5: true,
  g6: true,
  g7: true,
  g8: true,
  g9: false,
  h1: true,
  h2: true,
  h3: true,
  h4: true,
  h5: true,
  h6: true,
  h7: true,
  h8: true,
  h9: false,
  i1: true,
  i2: true,
  i3: true,
  i4: true,
  i5: true,
  i6: true,
  i7: true,
  i8: true,
  i9: false,
};

export const verticallyDecrementedPawnPositions: Record<
  VerticallyDecrementablePawnPosition,
  PawnPosition
> = {
  a2: 'a1',
  a3: 'a2',
  a4: 'a3',
  a5: 'a4',
  a6: 'a5',
  a7: 'a6',
  a8: 'a7',
  a9: 'a8',
  b2: 'b1',
  b3: 'b2',
  b4: 'b3',
  b5: 'b4',
  b6: 'b5',
  b7: 'b6',
  b8: 'b7',
  b9: 'b8',
  c2: 'c1',
  c3: 'c2',
  c4: 'c3',
  c5: 'c4',
  c6: 'c5',
  c7: 'c6',
  c8: 'c7',
  c9: 'c8',
  d2: 'd1',
  d3: 'd2',
  d4: 'd3',
  d5: 'd4',
  d6: 'd5',
  d7: 'd6',
  d8: 'd7',
  d9: 'd8',
  e2: 'e1',
  e3: 'e2',
  e4: 'e3',
  e5: 'e4',
  e6: 'e5',
  e7: 'e6',
  e8: 'e7',
  e9: 'e8',
  f2: 'f1',
  f3: 'f2',
  f4: 'f3',
  f5: 'f4',
  f6: 'f5',
  f7: 'f6',
  f8: 'f7',
  f9: 'f8',
  g2: 'g1',
  g3: 'g2',
  g4: 'g3',
  g5: 'g4',
  g6: 'g5',
  g7: 'g6',
  g8: 'g7',
  g9: 'g8',
  h2: 'h1',
  h3: 'h2',
  h4: 'h3',
  h5: 'h4',
  h6: 'h5',
  h7: 'h6',
  h8: 'h7',
  h9: 'h8',
  i2: 'i1',
  i3: 'i2',
  i4: 'i3',
  i5: 'i4',
  i6: 'i5',
  i7: 'i6',
  i8: 'i7',
  i9: 'i8',
};

export const isVerticallyDecrementablePawnPositionMap = {
  a1: false,
  a2: true,
  a3: true,
  a4: true,
  a5: true,
  a6: true,
  a7: true,
  a8: true,
  a9: true,
  b1: false,
  b2: true,
  b3: true,
  b4: true,
  b5: true,
  b6: true,
  b7: true,
  b8: true,
  b9: true,
  c1: false,
  c2: true,
  c3: true,
  c4: true,
  c5: true,
  c6: true,
  c7: true,
  c8: true,
  c9: true,
  d1: false,
  d2: true,
  d3: true,
  d4: true,
  d5: true,
  d6: true,
  d7: true,
  d8: true,
  d9: true,
  e1: false,
  e2: true,
  e3: true,
  e4: true,
  e5: true,
  e6: true,
  e7: true,
  e8: true,
  e9: true,
  f1: false,
  f2: true,
  f3: true,
  f4: true,
  f5: true,
  f6: true,
  f7: true,
  f8: true,
  f9: true,
  g1: false,
  g2: true,
  g3: true,
  g4: true,
  g5: true,
  g6: true,
  g7: true,
  g8: true,
  g9: true,
  h1: false,
  h2: true,
  h3: true,
  h4: true,
  h5: true,
  h6: true,
  h7: true,
  h8: true,
  h9: true,
  i1: false,
  i2: true,
  i3: true,
  i4: true,
  i5: true,
  i6: true,
  i7: true,
  i8: true,
  i9: true,
};

export const horizontallyIncrementedPawnPositions: Record<
  HorizontallyIncrementablePawnPosition,
  PawnPosition
> = {
  a1: 'b1',
  a2: 'b2',
  a3: 'b3',
  a4: 'b4',
  a5: 'b5',
  a6: 'b6',
  a7: 'b7',
  a8: 'b8',
  a9: 'b9',
  b1: 'c1',
  b2: 'c2',
  b3: 'c3',
  b4: 'c4',
  b5: 'c5',
  b6: 'c6',
  b7: 'c7',
  b8: 'c8',
  b9: 'c9',
  c1: 'd1',
  c2: 'd2',
  c3: 'd3',
  c4: 'd4',
  c5: 'd5',
  c6: 'd6',
  c7: 'd7',
  c8: 'd8',
  c9: 'd9',
  d1: 'e1',
  d2: 'e2',
  d3: 'e3',
  d4: 'e4',
  d5: 'e5',
  d6: 'e6',
  d7: 'e7',
  d8: 'e8',
  d9: 'e9',
  e1: 'f1',
  e2: 'f2',
  e3: 'f3',
  e4: 'f4',
  e5: 'f5',
  e6: 'f6',
  e7: 'f7',
  e8: 'f8',
  e9: 'f9',
  f1: 'g1',
  f2: 'g2',
  f3: 'g3',
  f4: 'g4',
  f5: 'g5',
  f6: 'g6',
  f7: 'g7',
  f8: 'g8',
  f9: 'g9',
  g1: 'h1',
  g2: 'h2',
  g3: 'h3',
  g4: 'h4',
  g5: 'h5',
  g6: 'h6',
  g7: 'h7',
  g8: 'h8',
  g9: 'h9',
  h1: 'i1',
  h2: 'i2',
  h3: 'i3',
  h4: 'i4',
  h5: 'i5',
  h6: 'i6',
  h7: 'i7',
  h8: 'i8',
  h9: 'i9',
};

export const isHorizontallyIncrementablePawnPositionMap = {
  a1: true,
  a2: true,
  a3: true,
  a4: true,
  a5: true,
  a6: true,
  a7: true,
  a8: true,
  a9: true,
  b1: true,
  b2: true,
  b3: true,
  b4: true,
  b5: true,
  b6: true,
  b7: true,
  b8: true,
  b9: true,
  c1: true,
  c2: true,
  c3: true,
  c4: true,
  c5: true,
  c6: true,
  c7: true,
  c8: true,
  c9: true,
  d1: true,
  d2: true,
  d3: true,
  d4: true,
  d5: true,
  d6: true,
  d7: true,
  d8: true,
  d9: true,
  e1: true,
  e2: true,
  e3: true,
  e4: true,
  e5: true,
  e6: true,
  e7: true,
  e8: true,
  e9: true,
  f1: true,
  f2: true,
  f3: true,
  f4: true,
  f5: true,
  f6: true,
  f7: true,
  f8: true,
  f9: true,
  g1: true,
  g2: true,
  g3: true,
  g4: true,
  g5: true,
  g6: true,
  g7: true,
  g8: true,
  g9: true,
  h1: true,
  h2: true,
  h3: true,
  h4: true,
  h5: true,
  h6: true,
  h7: true,
  h8: true,
  h9: true,
  i1: false,
  i2: false,
  i3: false,
  i4: false,
  i5: false,
  i6: false,
  i7: false,
  i8: false,
  i9: false,
};

export const horizontallyDecrementedPawnPositions: Record<
  HorizontallyDecrementablePawnPosition,
  PawnPosition
> = {
  b1: 'a1',
  b2: 'a2',
  b3: 'a3',
  b4: 'a4',
  b5: 'a5',
  b6: 'a6',
  b7: 'a7',
  b8: 'a8',
  b9: 'a9',
  c1: 'b1',
  c2: 'b2',
  c3: 'b3',
  c4: 'b4',
  c5: 'b5',
  c6: 'b6',
  c7: 'b7',
  c8: 'b8',
  c9: 'b9',
  d1: 'c1',
  d2: 'c2',
  d3: 'c3',
  d4: 'c4',
  d5: 'c5',
  d6: 'c6',
  d7: 'c7',
  d8: 'c8',
  d9: 'c9',
  e1: 'd1',
  e2: 'd2',
  e3: 'd3',
  e4: 'd4',
  e5: 'd5',
  e6: 'd6',
  e7: 'd7',
  e8: 'd8',
  e9: 'd9',
  f1: 'e1',
  f2: 'e2',
  f3: 'e3',
  f4: 'e4',
  f5: 'e5',
  f6: 'e6',
  f7: 'e7',
  f8: 'e8',
  f9: 'e9',
  g1: 'f1',
  g2: 'f2',
  g3: 'f3',
  g4: 'f4',
  g5: 'f5',
  g6: 'f6',
  g7: 'f7',
  g8: 'f8',
  g9: 'f9',
  h1: 'g1',
  h2: 'g2',
  h3: 'g3',
  h4: 'g4',
  h5: 'g5',
  h6: 'g6',
  h7: 'g7',
  h8: 'g8',
  h9: 'g9',
  i1: 'h1',
  i2: 'h2',
  i3: 'h3',
  i4: 'h4',
  i5: 'h5',
  i6: 'h6',
  i7: 'h7',
  i8: 'h8',
  i9: 'h9',
};

export const isHorizontallyDecrementablePawnPositionMap = {
  a1: false,
  a2: false,
  a3: false,
  a4: false,
  a5: false,
  a6: false,
  a7: false,
  a8: false,
  a9: false,
  b1: true,
  b2: true,
  b3: true,
  b4: true,
  b5: true,
  b6: true,
  b7: true,
  b8: true,
  b9: true,
  c1: true,
  c2: true,
  c3: true,
  c4: true,
  c5: true,
  c6: true,
  c7: true,
  c8: true,
  c9: true,
  d1: true,
  d2: true,
  d3: true,
  d4: true,
  d5: true,
  d6: true,
  d7: true,
  d8: true,
  d9: true,
  e1: true,
  e2: true,
  e3: true,
  e4: true,
  e5: true,
  e6: true,
  e7: true,
  e8: true,
  e9: true,
  f1: true,
  f2: true,
  f3: true,
  f4: true,
  f5: true,
  f6: true,
  f7: true,
  f8: true,
  f9: true,
  g1: true,
  g2: true,
  g3: true,
  g4: true,
  g5: true,
  g6: true,
  g7: true,
  g8: true,
  g9: true,
  h1: true,
  h2: true,
  h3: true,
  h4: true,
  h5: true,
  h6: true,
  h7: true,
  h8: true,
  h9: true,
  i1: true,
  i2: true,
  i3: true,
  i4: true,
  i5: true,
  i6: true,
  i7: true,
  i8: true,
  i9: true,
};
