import { createGameFromMoves } from '..';
import { undo, doUndo } from '..';

test('Test that nothing happens when we try to undo last move from a game with no history', () => {
  // Immutable
  expect(undo(createGameFromMoves([]))).toStrictEqual(createGameFromMoves([]));

  // Mutable
  const game = createGameFromMoves([]);
  doUndo(game);
  expect(game).toStrictEqual(createGameFromMoves([]));
});

test('Test that last move is correctly undone when past move history is not empty', () => {
  // Immutable
  expect(
    undo(createGameFromMoves(['e2', 'e8', 'e3', 'e7', 'e4'])),
  ).toStrictEqual({
    ...createGameFromMoves(['e2', 'e8', 'e3', 'e7']),
    futureMoves: ['e4'],
  });

  // Mutable
  const game = createGameFromMoves(['e2', 'e8', 'e3', 'e7', 'e4']);
  doUndo(game);
  expect(game).toStrictEqual({
    ...createGameFromMoves(['e2', 'e8', 'e3', 'e7']),
    futureMoves: ['e4'],
  });
});

test('Test that future moves are correctly updated when dong multiple undos', () => {
  // Immutable
  expect(
    undo(undo(createGameFromMoves(['e2', 'e8', 'e3', 'e7', 'e4']))),
  ).toStrictEqual({
    ...createGameFromMoves(['e2', 'e8', 'e3']),
    futureMoves: ['e7', 'e4'],
  });

  // Mutable
  const game = createGameFromMoves(['e2', 'e8', 'e3', 'e7', 'e4']);
  doUndo(game);
  doUndo(game);
  expect(game).toStrictEqual({
    ...createGameFromMoves(['e2', 'e8', 'e3']),
    futureMoves: ['e7', 'e4'],
  });
});
