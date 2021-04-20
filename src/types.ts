export type HorizontalPiecePosition =
  | 'a'
  | 'b'
  | 'c'
  | 'd'
  | 'e'
  | 'f'
  | 'g'
  | 'h'
  | 'i';

export type HorizontalWallPosition =
  | 'a'
  | 'b'
  | 'c'
  | 'd'
  | 'e'
  | 'f'
  | 'g'
  | 'h';

export type VerticalPiecePosition = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type VerticalWallPosition = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type PiecePosition = {
  x: HorizontalPiecePosition;
  y: VerticalPiecePosition;
};

export type PieceMove = {
  x: HorizontalPiecePosition;
  y: VerticalPiecePosition;
};

export type WallMove = {
  x: HorizontalWallPosition;
  y: VerticalWallPosition;
  w: 'h' | 'v';
};

export type Move = PieceMove | WallMove;

export type Player = 1 | 2;

export type PlayerMatrix = Record<
  HorizontalPiecePosition,
  Record<VerticalPiecePosition, Player | 0>
>;

export type WallMatrix = Record<
  HorizontalWallPosition,
  Record<VerticalWallPosition, { h: boolean; v: boolean }>
>;

type History = Record<Player, Move[]>;

type WallCount = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

// I have renamed board to piece
export type Game = {
  pieceMatrix: PlayerMatrix;
  wallMatrix: WallMatrix;
  history: History;
  turn: Player;
  playerPositions: Record<
    Player,
    PiecePosition & { previousPosition?: PiecePosition }
  >;
  playerWallCounts: Record<Player, WallCount>;
};
