import { createGameFromMoves } from '../createGameFromMoves';
import { createNewGame } from '../createNewGame';
import { getValidMoveArray } from '../getValidMoveArray';

test("Test that correct valid moves are returned when no walls block the players' shortest paths", () => {
  expect(new Set(getValidMoveArray(createNewGame()))).toEqual(
    new Set([
      'e2',
      'f1',
      'd1',
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
    ]),
  );
});

test("Test that correct valid moves are returned when a wall with no neighbors blocks the players' shortest paths", () => {
  expect(new Set(getValidMoveArray(createGameFromMoves(['e4'])))).toEqual(
    new Set([
      'd9',
      'e8',
      'f9',
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
    ]),
  );
});

test("Test that correct valid moves are returned when a wall with a neighbor wall blocks the players' shortest paths", () => {
  expect(new Set(getValidMoveArray(createGameFromMoves(['c4', 'e4'])))).toEqual(
    new Set([
      'b4',
      'c3',
      'c5',
      'd4',
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
    ]),
  );
});

test('Test that getValidMove does not return wall moves that overlap with already placed walls (in this case e7h)', () => {
  expect(
    new Set(getValidMoveArray(createGameFromMoves(['e2', 'e8', 'e7h']))),
  ).toEqual(
    new Set([
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
      'd7v',
      'd8',
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
      'e8h',
      'e8v',
      'e9',
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
      'f7v',
      'f8',
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
    ]),
  );
});

test('Test that getValidMove does not return wall moves that trap a player', () => {
  expect(
    new Set(
      getValidMoveArray(
        createGameFromMoves([
          'd1',
          'f9',
          'c1',
          'g9',
          'b1',
          'h9',
          'a1',
          'i9',
          'a2',
          'i8',
          'a3v',
          'h8',
          'a5v',
          'g8',
          'a7v',
          'a8h',
          'c8h',
          'e8h',
          'g8h',
        ]),
      ),
    ),
  ).toEqual(
    new Set([
      'a1h',
      'a2h',
      'a4h',
      'a6h',
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
      'f8',
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
      'g7',
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
      'h8',
      'h8v',
    ]),
  );
});