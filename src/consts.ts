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

export const positions = new Set<PawnPosition | WallPosition>([
  ...pawnPositions,
  ...wallPositions,
]);

export const horizontallyMirroredPositionsMap: Record<
  PawnPosition,
  PawnPosition
> &
  Record<WallPosition, WallPosition> = {
  a1: 'i1',
  a2: 'i2',
  a3: 'i3',
  a4: 'i4',
  a5: 'i5',
  a6: 'i6',
  a7: 'i7',
  a8: 'i8',
  a9: 'i9',
  b1: 'h1',
  b2: 'h2',
  b3: 'h3',
  b4: 'h4',
  b5: 'h5',
  b6: 'h6',
  b7: 'h7',
  b8: 'h8',
  b9: 'h9',
  c1: 'g1',
  c2: 'g2',
  c3: 'g3',
  c4: 'g4',
  c5: 'g5',
  c6: 'g6',
  c7: 'g7',
  c8: 'g8',
  c9: 'g9',
  d1: 'f1',
  d2: 'f2',
  d3: 'f3',
  d4: 'f4',
  d5: 'f5',
  d6: 'f6',
  d7: 'f7',
  d8: 'f8',
  d9: 'f9',
  e1: 'e1',
  e2: 'e2',
  e3: 'e3',
  e4: 'e4',
  e5: 'e5',
  e6: 'e6',
  e7: 'e7',
  e8: 'e8',
  e9: 'e9',
  f1: 'd1',
  f2: 'd2',
  f3: 'd3',
  f4: 'd4',
  f5: 'd5',
  f6: 'd6',
  f7: 'd7',
  f8: 'd8',
  f9: 'd9',
  g1: 'c1',
  g2: 'c2',
  g3: 'c3',
  g4: 'c4',
  g5: 'c5',
  g6: 'c6',
  g7: 'c7',
  g8: 'c8',
  g9: 'c9',
  h1: 'b1',
  h2: 'b2',
  h3: 'b3',
  h4: 'b4',
  h5: 'b5',
  h6: 'b6',
  h7: 'b7',
  h8: 'b8',
  h9: 'b9',
  i1: 'a1',
  i2: 'a2',
  i3: 'a3',
  i4: 'a4',
  i5: 'a5',
  i6: 'a6',
  i7: 'a7',
  i8: 'a8',
  i9: 'a9',
  a1h: 'h1h',
  a1v: 'h1v',
  a2h: 'h2h',
  a2v: 'h2v',
  a3h: 'h3h',
  a3v: 'h3v',
  a4h: 'h4h',
  a4v: 'h4v',
  a5h: 'h5h',
  a5v: 'h5v',
  a6h: 'h6h',
  a6v: 'h6v',
  a7h: 'h7h',
  a7v: 'h7v',
  a8h: 'h8h',
  a8v: 'h8v',
  b1h: 'g1h',
  b1v: 'g1v',
  b2h: 'g2h',
  b2v: 'g2v',
  b3h: 'g3h',
  b3v: 'g3v',
  b4h: 'g4h',
  b4v: 'g4v',
  b5h: 'g5h',
  b5v: 'g5v',
  b6h: 'g6h',
  b6v: 'g6v',
  b7h: 'g7h',
  b7v: 'g7v',
  b8h: 'g8h',
  b8v: 'g8v',
  c1h: 'f1h',
  c1v: 'f1v',
  c2h: 'f2h',
  c2v: 'f2v',
  c3h: 'f3h',
  c3v: 'f3v',
  c4h: 'f4h',
  c4v: 'f4v',
  c5h: 'f5h',
  c5v: 'f5v',
  c6h: 'f6h',
  c6v: 'f6v',
  c7h: 'f7h',
  c7v: 'f7v',
  c8h: 'f8h',
  c8v: 'f8v',
  d1h: 'e1h',
  d1v: 'e1v',
  d2h: 'e2h',
  d2v: 'e2v',
  d3h: 'e3h',
  d3v: 'e3v',
  d4h: 'e4h',
  d4v: 'e4v',
  d5h: 'e5h',
  d5v: 'e5v',
  d6h: 'e6h',
  d6v: 'e6v',
  d7h: 'e7h',
  d7v: 'e7v',
  d8h: 'e8h',
  d8v: 'e8v',
  e1h: 'd1h',
  e1v: 'd1v',
  e2h: 'd2h',
  e2v: 'd2v',
  e3h: 'd3h',
  e3v: 'd3v',
  e4h: 'd4h',
  e4v: 'd4v',
  e5h: 'd5h',
  e5v: 'd5v',
  e6h: 'd6h',
  e6v: 'd6v',
  e7h: 'd7h',
  e7v: 'd7v',
  e8h: 'd8h',
  e8v: 'd8v',
  f1h: 'c1h',
  f1v: 'c1v',
  f2h: 'c2h',
  f2v: 'c2v',
  f3h: 'c3h',
  f3v: 'c3v',
  f4h: 'c4h',
  f4v: 'c4v',
  f5h: 'c5h',
  f5v: 'c5v',
  f6h: 'c6h',
  f6v: 'c6v',
  f7h: 'c7h',
  f7v: 'c7v',
  f8h: 'c8h',
  f8v: 'c8v',
  g1h: 'b1h',
  g1v: 'b1v',
  g2h: 'b2h',
  g2v: 'b2v',
  g3h: 'b3h',
  g3v: 'b3v',
  g4h: 'b4h',
  g4v: 'b4v',
  g5h: 'b5h',
  g5v: 'b5v',
  g6h: 'b6h',
  g6v: 'b6v',
  g7h: 'b7h',
  g7v: 'b7v',
  g8h: 'b8h',
  g8v: 'b8v',
  h1h: 'a1h',
  h1v: 'a1v',
  h2h: 'a2h',
  h2v: 'a2v',
  h3h: 'a3h',
  h3v: 'a3v',
  h4h: 'a4h',
  h4v: 'a4v',
  h5h: 'a5h',
  h5v: 'a5v',
  h6h: 'a6h',
  h6v: 'a6v',
  h7h: 'a7h',
  h7v: 'a7v',
  h8h: 'a8h',
  h8v: 'a8v',
};

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

const initialPlayerMatrix: PlayerMatrix = {
  a1: null,
  a2: null,
  a3: null,
  a4: null,
  a5: null,
  a6: null,
  a7: null,
  a8: null,
  a9: null,
  b1: null,
  b2: null,
  b3: null,
  b4: null,
  b5: null,
  b6: null,
  b7: null,
  b8: null,
  b9: null,
  c1: null,
  c2: null,
  c3: null,
  c4: null,
  c5: null,
  c6: null,
  c7: null,
  c8: null,
  c9: null,
  d1: null,
  d2: null,
  d3: null,
  d4: null,
  d5: null,
  d6: null,
  d7: null,
  d8: null,
  d9: null,
  e1: 1,
  e2: null,
  e3: null,
  e4: null,
  e5: null,
  e6: null,
  e7: null,
  e8: null,
  e9: 2,
  f1: null,
  f2: null,
  f3: null,
  f4: null,
  f5: null,
  f6: null,
  f7: null,
  f8: null,
  f9: null,
  g1: null,
  g2: null,
  g3: null,
  g4: null,
  g5: null,
  g6: null,
  g7: null,
  g8: null,
  g9: null,
  h1: null,
  h2: null,
  h3: null,
  h4: null,
  h5: null,
  h6: null,
  h7: null,
  h8: null,
  h9: null,
  i1: null,
  i2: null,
  i3: null,
  i4: null,
  i5: null,
  i6: null,
  i7: null,
  i8: null,
  i9: null,
};

const initialWallMatrix: WallMatrix = {
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

export const initialBoard: PlayerMatrix & WallMatrix = {
  ...initialPlayerMatrix,
  ...initialWallMatrix,
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

export const verticallyIncrementablePositions = new Set<
  PawnPosition | WallPosition
>([
  'a1',
  'a2',
  'a3',
  'a4',
  'a5',
  'a6',
  'a7',
  'a8',
  'b1',
  'b2',
  'b3',
  'b4',
  'b5',
  'b6',
  'b7',
  'b8',
  'c1',
  'c2',
  'c3',
  'c4',
  'c5',
  'c6',
  'c7',
  'c8',
  'd1',
  'd2',
  'd3',
  'd4',
  'd5',
  'd6',
  'd7',
  'd8',
  'e1',
  'e2',
  'e3',
  'e4',
  'e5',
  'e6',
  'e7',
  'e8',
  'f1',
  'f2',
  'f3',
  'f4',
  'f5',
  'f6',
  'f7',
  'f8',
  'g1',
  'g2',
  'g3',
  'g4',
  'g5',
  'g6',
  'g7',
  'g8',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'h7',
  'h8',
  'i1',
  'i2',
  'i3',
  'i4',
  'i5',
  'i6',
  'i7',
  'i8',
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
]);

export const verticallyDecrementablePositions = new Set<
  PawnPosition | WallPosition
>([
  'a2',
  'a3',
  'a4',
  'a5',
  'a6',
  'a7',
  'a8',
  'a9',
  'b2',
  'b3',
  'b4',
  'b5',
  'b6',
  'b7',
  'b8',
  'b9',
  'c2',
  'c3',
  'c4',
  'c5',
  'c6',
  'c7',
  'c8',
  'c9',
  'd2',
  'd3',
  'd4',
  'd5',
  'd6',
  'd7',
  'd8',
  'd9',
  'e2',
  'e3',
  'e4',
  'e5',
  'e6',
  'e7',
  'e8',
  'e9',
  'f2',
  'f3',
  'f4',
  'f5',
  'f6',
  'f7',
  'f8',
  'f9',
  'g2',
  'g3',
  'g4',
  'g5',
  'g6',
  'g7',
  'g8',
  'g9',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'h7',
  'h8',
  'h9',
  'i2',
  'i3',
  'i4',
  'i5',
  'i6',
  'i7',
  'i8',
  'i9',
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
]);

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

export const horizontallyIncrementablePositions = new Set<
  PawnPosition | WallPosition
>([
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
]);

export const horizontallyDecrementablePositions = new Set<
  PawnPosition | WallPosition
>([
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
]);

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

export const moveUpRightMap: Record<string, PawnPosition | undefined> = {
  a1: 'b2',
  a2: 'b3',
  a3: 'b4',
  a4: 'b5',
  a5: 'b6',
  a6: 'b7',
  a7: 'b8',
  a8: 'b9',
  b1: 'c2',
  b2: 'c3',
  b3: 'c4',
  b4: 'c5',
  b5: 'c6',
  b6: 'c7',
  b7: 'c8',
  b8: 'c9',
  c1: 'd2',
  c2: 'd3',
  c3: 'd4',
  c4: 'd5',
  c5: 'd6',
  c6: 'd7',
  c7: 'd8',
  c8: 'd9',
  d1: 'e2',
  d2: 'e3',
  d3: 'e4',
  d4: 'e5',
  d5: 'e6',
  d6: 'e7',
  d7: 'e8',
  d8: 'e9',
  e1: 'f2',
  e2: 'f3',
  e3: 'f4',
  e4: 'f5',
  e5: 'f6',
  e6: 'f7',
  e7: 'f8',
  e8: 'f9',
  f1: 'g2',
  f2: 'g3',
  f3: 'g4',
  f4: 'g5',
  f5: 'g6',
  f6: 'g7',
  f7: 'g8',
  f8: 'g9',
  g1: 'h2',
  g2: 'h3',
  g3: 'h4',
  g4: 'h5',
  g5: 'h6',
  g6: 'h7',
  g7: 'h8',
  g8: 'h9',
  h1: 'i2',
  h2: 'i3',
  h3: 'i4',
  h4: 'i5',
  h5: 'i6',
  h6: 'i7',
  h7: 'i8',
  h8: 'i9',
};

export const moveDownRightMap: Record<string, PawnPosition | undefined> = {
  a2: 'b3',
  a3: 'b2',
  a4: 'b3',
  a5: 'b4',
  a6: 'b5',
  a7: 'b6',
  a8: 'b7',
  a9: 'b8',
  b2: 'b9',
  b3: 'c2',
  b4: 'c3',
  b5: 'c4',
  b6: 'c5',
  b7: 'c6',
  b8: 'c7',
  b9: 'c8',
  c2: 'd2',
  c3: 'd3',
  c4: 'd4',
  c5: 'd5',
  c6: 'd6',
  c7: 'd7',
  c8: 'd8',
  d2: 'd9',
  d3: 'e2',
  d4: 'e3',
  d5: 'e4',
  d6: 'e5',
  d7: 'e6',
  d8: 'e7',
  d9: 'e8',
  e2: 'e9',
  e3: 'f2',
  e4: 'f3',
  e5: 'f4',
  e6: 'f5',
  e7: 'f6',
  e8: 'f7',
  e9: 'f8',
  f2: 'f9',
  f3: 'g2',
  f4: 'g3',
  f5: 'g4',
  f6: 'g5',
  f7: 'g6',
  f8: 'g7',
  f9: 'g8',
  g2: 'h1',
  g3: 'h2',
  g4: 'h3',
  g5: 'h4',
  g6: 'h5',
  g7: 'h6',
  g8: 'h7',
  g9: 'h8',
  h2: 'i1',
  h3: 'i2',
  h4: 'i3',
  h5: 'i4',
  h6: 'i5',
  h7: 'i6',
  h8: 'i7',
  h9: 'i8',
};

export const moveRightRightMap: Record<string, PawnPosition | undefined> = {
  a1: 'c1',
  a2: 'c2',
  a3: 'c3',
  a4: 'c4',
  a5: 'c5',
  a6: 'c6',
  a7: 'c7',
  a8: 'c8',
  a9: 'c9',
  b1: 'd1',
  b2: 'd2',
  b3: 'd3',
  b4: 'd4',
  b5: 'd5',
  b6: 'd6',
  b7: 'd7',
  b8: 'd8',
  b9: 'd9',
  c1: 'e1',
  c2: 'e2',
  c3: 'e3',
  c4: 'e4',
  c5: 'e5',
  c6: 'e6',
  c7: 'e7',
  c8: 'e8',
  c9: 'e9',
  d1: 'f1',
  d2: 'f2',
  d3: 'f3',
  d4: 'f4',
  d5: 'f5',
  d6: 'f6',
  d7: 'f7',
  d8: 'f8',
  d9: 'f9',
  e1: 'g1',
  e2: 'g2',
  e3: 'g3',
  e4: 'g4',
  e5: 'g5',
  e6: 'g6',
  e7: 'g7',
  e8: 'g8',
  e9: 'g9',
  f1: 'h1',
  f2: 'h2',
  f3: 'h3',
  f4: 'h4',
  f5: 'h5',
  f6: 'h6',
  f7: 'h7',
  f8: 'h8',
  f9: 'h9',
  g1: 'i1',
  g2: 'i2',
  g3: 'i3',
  g4: 'i4',
  g5: 'i5',
  g6: 'i6',
  g7: 'i7',
  g8: 'i8',
  g9: 'i9',
};

export const moveDownDownMap: Record<string, PawnPosition | undefined> = {
  a3: 'a1',
  a4: 'a2',
  a5: 'a3',
  a6: 'a4',
  a7: 'a5',
  a8: 'a6',
  a9: 'a7',
  b3: 'b1',
  b4: 'b2',
  b5: 'b3',
  b6: 'b4',
  b7: 'b5',
  b8: 'b6',
  b9: 'b7',
  c3: 'c1',
  c4: 'c2',
  c5: 'c3',
  c6: 'c4',
  c7: 'c5',
  c8: 'c6',
  c9: 'c7',
  d3: 'd1',
  d4: 'd2',
  d5: 'd3',
  d6: 'd4',
  d7: 'd5',
  d8: 'd6',
  d9: 'd7',
  e3: 'e1',
  e4: 'e2',
  e5: 'e3',
  e6: 'e4',
  e7: 'e5',
  e8: 'e6',
  e9: 'e7',
  f3: 'f1',
  f4: 'f2',
  f5: 'f3',
  f6: 'f4',
  f7: 'f5',
  f8: 'f6',
  f9: 'f7',
  g3: 'g1',
  g4: 'g2',
  g5: 'g3',
  g6: 'g4',
  g7: 'g5',
  g8: 'g6',
  g9: 'g7',
  h3: 'h1',
  h4: 'h2',
  h5: 'h3',
  h6: 'h4',
  h7: 'h5',
  h8: 'h6',
  h9: 'h7',
  i3: 'i1',
  i4: 'i2',
  i5: 'i3',
  i6: 'i4',
  i7: 'i5',
  i8: 'i6',
  i9: 'i7',
};

export const moveDownMap: Record<string, PawnPosition | undefined> = {
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

export const moveLeftMap: Record<string, PawnPosition | undefined> = {
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

export const moveLeftLeftMap: Record<string, PawnPosition | undefined> = {
  c1: 'a1',
  c2: 'a2',
  c3: 'a3',
  c4: 'a4',
  c5: 'a5',
  c6: 'a6',
  c7: 'a7',
  c8: 'a8',
  c9: 'a9',
  d1: 'b1',
  d2: 'b2',
  d3: 'b3',
  d4: 'b4',
  d5: 'b5',
  d6: 'b6',
  d7: 'b7',
  d8: 'b8',
  d9: 'b9',
  e1: 'c1',
  e2: 'c2',
  e3: 'c3',
  e4: 'c4',
  e5: 'c5',
  e6: 'c6',
  e7: 'c7',
  e8: 'c8',
  e9: 'c9',
  f1: 'd1',
  f2: 'd2',
  f3: 'd3',
  f4: 'd4',
  f5: 'd5',
  f6: 'd6',
  f7: 'd7',
  f8: 'd8',
  f9: 'd9',
  g1: 'e1',
  g2: 'e2',
  g3: 'e3',
  g4: 'e4',
  g5: 'e5',
  g6: 'e6',
  g7: 'e7',
  g8: 'e8',
  g9: 'e9',
  h1: 'f1',
  h2: 'f2',
  h3: 'f3',
  h4: 'f4',
  h5: 'f5',
  h6: 'f6',
  h7: 'f7',
  h8: 'f8',
  h9: 'f9',
  i1: 'g1',
  i2: 'g2',
  i3: 'g3',
  i4: 'g4',
  i5: 'g5',
  i6: 'g6',
  i7: 'g7',
  i8: 'g8',
  i9: 'g9',
};

export const moveRightMap: Record<string, PawnPosition | undefined> = {
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

export const moveUpMap: Record<string, PawnPosition | undefined> = {
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

export const moveUpUpMap: Record<string, PawnPosition | undefined> = {
  a1: 'a3',
  a2: 'a4',
  a3: 'a5',
  a4: 'a6',
  a5: 'a7',
  a6: 'a8',
  a7: 'a9',
  b1: 'b3',
  b2: 'b4',
  b3: 'b5',
  b4: 'b6',
  b5: 'b7',
  b6: 'b8',
  b7: 'b9',
  c1: 'c3',
  c2: 'c4',
  c3: 'c5',
  c4: 'c6',
  c5: 'c7',
  c6: 'c8',
  c7: 'c9',
  d1: 'd3',
  d2: 'd4',
  d3: 'd5',
  d4: 'd6',
  d5: 'd7',
  d6: 'd8',
  d7: 'd9',
  e1: 'e3',
  e2: 'e4',
  e3: 'e5',
  e4: 'e6',
  e5: 'e7',
  e6: 'e8',
  e7: 'e9',
  f1: 'f3',
  f2: 'f4',
  f3: 'f5',
  f4: 'f6',
  f5: 'f7',
  f6: 'f8',
  f7: 'f9',
  g1: 'g3',
  g2: 'g4',
  g3: 'g5',
  g4: 'g6',
  g5: 'g7',
  g6: 'g8',
  g7: 'g9',
  h1: 'h3',
  h2: 'h4',
  h3: 'h5',
  h4: 'h6',
  h5: 'h7',
  h6: 'h8',
  h7: 'h9',
  i1: 'i3',
  i2: 'i4',
  i3: 'i5',
  i4: 'i6',
  i5: 'i7',
  i6: 'i8',
  i7: 'i9',
};
