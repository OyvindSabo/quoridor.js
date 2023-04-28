import { createGameFromMoves } from '..';
import { undo } from '..';

test('Test that nothing happens when we try to undo last move from a game with no history', () => {
  expect(undo(createGameFromMoves([]))).toStrictEqual(createGameFromMoves([]));
});

test('Test that last move is correctly undone when past move history is not empty', () => {
  expect(
    undo(createGameFromMoves(['e2', 'e8', 'e3', 'e7', 'e4'])),
  ).toStrictEqual({
    ...createGameFromMoves(['e2', 'e8', 'e3', 'e7']),
    futureMoves: ['e4'],
  });
});

test('Test that future moves are correctly updated when dong multiple undos', () => {
  expect(
    undo(undo(createGameFromMoves(['e2', 'e8', 'e3', 'e7', 'e4']))),
  ).toStrictEqual({
    ...createGameFromMoves(['e2', 'e8', 'e3']),
    futureMoves: ['e7', 'e4'],
  });
});
