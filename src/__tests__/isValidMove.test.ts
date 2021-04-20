import { createGameFromMoves } from '../createGameFromMoves';
import { isValidMove } from '../isValidMove';

test('Test that taking one step forward with no obstacles is a valid move', () => {
  expect(isValidMove(createGameFromMoves([]), { x: 'e', y: 2 })).toBe(true);
});

test('Test that stepping forward on opponent is not a valid move', () => {
  expect(
    isValidMove(
      createGameFromMoves([
        { x: 'e', y: 2 },
        { x: 'e', y: 8 },
        { x: 'e', y: 3 },
        { x: 'e', y: 7 },
        { x: 'e', y: 4 },
        { x: 'e', y: 6 },
        { x: 'e', y: 5 },
      ]),
      { x: 'e', y: 5 },
    ),
  ).toBe(false);
});

test('Test that stepping to the right on opponent is not a valid move', () => {
  expect(
    isValidMove(
      createGameFromMoves([
        { x: 'e', y: 2 },
        { x: 'e', y: 8 },
        { x: 'e', y: 3 },
        { x: 'e', y: 7 },
        { x: 'e', y: 4 },
        { x: 'e', y: 6 },
        { x: 'f', y: 4 },
        { x: 'e', y: 5 },
        { x: 'f', y: 5 },
      ]),
      { x: 'f', y: 5 },
    ),
  ).toBe(false);
});

test('Test that jumping forward over opponent is a valid move', () => {
  expect(
    isValidMove(
      createGameFromMoves([
        { x: 'e', y: 2 },
        { x: 'e', y: 8 },
        { x: 'e', y: 3 },
        { x: 'e', y: 7 },
        { x: 'e', y: 4 },
        { x: 'e', y: 6 },
        { x: 'a', y: 1, w: 'h' },
        { x: 'e', y: 5 },
      ]),
      { x: 'e', y: 6 },
    ),
  ).toBe(false);
});
