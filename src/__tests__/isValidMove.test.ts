import { createGameFromMoves } from '../createGameFromMoves';
import { isValidMove } from '../isValidMove';

test('Test that taking one step forward with no obstacles is a valid move', () => {
  expect(isValidMove(createGameFromMoves([]), { x: 'e', y: 2 })).toBe(true);
});

test('Test that stepping forward on opponent is not a valid move', () => {
  expect(
    isValidMove(
      createGameFromMoves(['e2', 'e8', 'e3', 'e7', 'e4', 'e6', 'e5']),
      { x: 'e', y: 5 },
    ),
  ).toBe(false);
});

test('Test that stepping to the right on opponent is not a valid move', () => {
  expect(
    isValidMove(
      createGameFromMoves([
        'e2',
        'e8',
        'e3',
        'e7',
        'e4',
        'e6',
        'f4',
        'e5',
        'f5',
      ]),
      { x: 'f', y: 5 },
    ),
  ).toBe(false);
});

test('Test that jumping forward over opponent is a valid move', () => {
  expect(
    isValidMove(
      createGameFromMoves(['e2', 'e8', 'e3', 'e7', 'e4', 'e6', 'a1h', 'e5']),
      { x: 'e', y: 6 },
    ),
  ).toBe(false);
});
