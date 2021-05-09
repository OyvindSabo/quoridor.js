import { createGameFromMoves } from '../createGameFromMoves';
import { undoLastMove } from '../undoLastMove';

test('Test that nothing happens when we try to undo last move from a game with no history', () => {
  expect(undoLastMove(createGameFromMoves([]))).toStrictEqual(
    createGameFromMoves([]),
  );
});

test('Test that last move is correctly undone when the move history is not empty', () => {
  expect(
    undoLastMove(createGameFromMoves(['e2', 'e8', 'e3', 'e7', 'e4'])),
  ).toStrictEqual(createGameFromMoves(['e2', 'e8', 'e3', 'e7']));
});
