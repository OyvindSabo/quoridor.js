import { createGameFromMoves } from '..';
import { undo, redo, doUndo, doRedo } from '..';

test('Test that nothing happens when we try to redo move from a game with no history', () => {
  // Immutable
  expect(redo(createGameFromMoves([]))).toStrictEqual(createGameFromMoves([]));

  // Mutable
  const game = createGameFromMoves([]);
  doRedo(game);
  expect(game).toStrictEqual(createGameFromMoves([]));
});

test('Test that undoing and redoing move is equivalent of doing nothing', () => {
  // Immutable
  expect(
    redo(undo(createGameFromMoves(['e2', 'e8', 'e3', 'e7', 'e4']))),
  ).toStrictEqual(createGameFromMoves(['e2', 'e8', 'e3', 'e7', 'e4']));

  // Mutable
  const game = createGameFromMoves(['e2', 'e8', 'e3', 'e7', 'e4']);
  doUndo(game);
  doRedo(game);
  expect(game).toStrictEqual(
    createGameFromMoves(['e2', 'e8', 'e3', 'e7', 'e4']),
  );
});

test('Test that the correct future move is chosen when redoing after multiple undos', () => {
  // Immutable
  expect(
    redo(undo(undo(createGameFromMoves(['e2', 'e8', 'e3', 'e7', 'e4'])))),
  ).toStrictEqual({
    ...createGameFromMoves(['e2', 'e8', 'e3', 'e7']),
    futureMoves: ['e4'],
  });

  // Mutable
  const game = createGameFromMoves(['e2', 'e8', 'e3', 'e7', 'e4']);
  doUndo(game);
  doUndo(game);
  doRedo(game);
  expect(game).toStrictEqual({
    ...createGameFromMoves(['e2', 'e8', 'e3', 'e7']),
    futureMoves: ['e4'],
  });
});
