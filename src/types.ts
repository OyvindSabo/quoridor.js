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

export type PawnPosition =
  | 'a1'
  | 'a2'
  | 'a3'
  | 'a4'
  | 'a5'
  | 'a6'
  | 'a7'
  | 'a8'
  | 'a9'
  | 'b1'
  | 'b2'
  | 'b3'
  | 'b4'
  | 'b5'
  | 'b6'
  | 'b7'
  | 'b8'
  | 'b9'
  | 'c1'
  | 'c2'
  | 'c3'
  | 'c4'
  | 'c5'
  | 'c6'
  | 'c7'
  | 'c8'
  | 'c9'
  | 'd1'
  | 'd2'
  | 'd3'
  | 'd4'
  | 'd5'
  | 'd6'
  | 'd7'
  | 'd8'
  | 'd9'
  | 'e1'
  | 'e2'
  | 'e3'
  | 'e4'
  | 'e5'
  | 'e6'
  | 'e7'
  | 'e8'
  | 'e9'
  | 'f1'
  | 'f2'
  | 'f3'
  | 'f4'
  | 'f5'
  | 'f6'
  | 'f7'
  | 'f8'
  | 'f9'
  | 'g1'
  | 'g2'
  | 'g3'
  | 'g4'
  | 'g5'
  | 'g6'
  | 'g7'
  | 'g8'
  | 'g9'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'h7'
  | 'h8'
  | 'h9'
  | 'i1'
  | 'i2'
  | 'i3'
  | 'i4'
  | 'i5'
  | 'i6'
  | 'i7'
  | 'i8'
  | 'i9';

export type PawnMove = PawnPosition;

export type WallMove =
  | 'a1h'
  | 'a1v'
  | 'a2h'
  | 'a2v'
  | 'a3h'
  | 'a3v'
  | 'a4h'
  | 'a4v'
  | 'a5h'
  | 'a5v'
  | 'a6h'
  | 'a6v'
  | 'a7h'
  | 'a7v'
  | 'a8h'
  | 'a8v'
  | 'b1h'
  | 'b1v'
  | 'b2h'
  | 'b2v'
  | 'b3h'
  | 'b3v'
  | 'b4h'
  | 'b4v'
  | 'b5h'
  | 'b5v'
  | 'b6h'
  | 'b6v'
  | 'b7h'
  | 'b7v'
  | 'b8h'
  | 'b8v'
  | 'c1h'
  | 'c1v'
  | 'c2h'
  | 'c2v'
  | 'c3h'
  | 'c3v'
  | 'c4h'
  | 'c4v'
  | 'c5h'
  | 'c5v'
  | 'c6h'
  | 'c6v'
  | 'c7h'
  | 'c7v'
  | 'c8h'
  | 'c8v'
  | 'd1h'
  | 'd1v'
  | 'd2h'
  | 'd2v'
  | 'd3h'
  | 'd3v'
  | 'd4h'
  | 'd4v'
  | 'd5h'
  | 'd5v'
  | 'd6h'
  | 'd6v'
  | 'd7h'
  | 'd7v'
  | 'd8h'
  | 'd8v'
  | 'e1h'
  | 'e1v'
  | 'e2h'
  | 'e2v'
  | 'e3h'
  | 'e3v'
  | 'e4h'
  | 'e4v'
  | 'e5h'
  | 'e5v'
  | 'e6h'
  | 'e6v'
  | 'e7h'
  | 'e7v'
  | 'e8h'
  | 'e8v'
  | 'f1h'
  | 'f1v'
  | 'f2h'
  | 'f2v'
  | 'f3h'
  | 'f3v'
  | 'f4h'
  | 'f4v'
  | 'f5h'
  | 'f5v'
  | 'f6h'
  | 'f6v'
  | 'f7h'
  | 'f7v'
  | 'f8h'
  | 'f8v'
  | 'g1h'
  | 'g1v'
  | 'g2h'
  | 'g2v'
  | 'g3h'
  | 'g3v'
  | 'g4h'
  | 'g4v'
  | 'g5h'
  | 'g5v'
  | 'g6h'
  | 'g6v'
  | 'g7h'
  | 'g7v'
  | 'g8h'
  | 'g8v'
  | 'h1h'
  | 'h1v'
  | 'h2h'
  | 'h2v'
  | 'h3h'
  | 'h3v'
  | 'h4h'
  | 'h4v'
  | 'h5h'
  | 'h5v'
  | 'h6h'
  | 'h6v'
  | 'h7h'
  | 'h7v'
  | 'h8h'
  | 'h8v';

export type Move = PawnMove | WallMove;

export type PawnMoveObject = {
  x: HorizontalPiecePosition;
  y: VerticalPiecePosition;
};

export type WallMoveObject = {
  x: HorizontalWallPosition;
  y: VerticalWallPosition;
  w: 'h' | 'v';
};

export type MoveObject = PawnMoveObject | WallMoveObject;

export type Player = 1 | 2;

export type PlayerMatrix = Record<
  HorizontalPiecePosition,
  Record<VerticalPiecePosition, Player | 0>
>;

export type WallMatrix = Record<
  HorizontalWallPosition,
  Record<VerticalWallPosition, { h: boolean; v: boolean }>
>;

type History = Record<Player, MoveObject[]>;

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
