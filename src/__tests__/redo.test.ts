import { createGameFromMoves } from '../createGameFromMoves';
import { redo } from '../redo';
import { undo } from '../undo';

test('Test that nothing happens when we try to redo move from a game with no history', () => {
  expect(redo(createGameFromMoves([]))).toStrictEqual(createGameFromMoves([]));
});

test('Test that undoing and redoing move is equivalent of doing nothing', () => {
  expect(
    redo(undo(createGameFromMoves(['e2', 'e8', 'e3', 'e7', 'e4']))),
  ).toStrictEqual(createGameFromMoves(['e2', 'e8', 'e3', 'e7', 'e4']));
});

test('Test that the correct future move is chosen when redoing after multiple undos', () => {
  expect(
    redo(undo(undo(createGameFromMoves(['e2', 'e8', 'e3', 'e7', 'e4'])))),
  ).toStrictEqual({
    ...createGameFromMoves(['e2', 'e8', 'e3', 'e7']),
    futureMoves: ['e4'],
  });
});
