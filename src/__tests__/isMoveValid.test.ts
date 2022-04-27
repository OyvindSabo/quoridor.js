import { createGameFromMoves } from '../createGameFromMoves';
import { isMoveValid } from '../isMoveValid';
import { getUnicodeRepresentation } from '../getUnicodeRepresentation';

test('Test that taking one step forward with no obstacles is a valid move', () => {
  expect(isMoveValid(createGameFromMoves([]), 'e2')).toBe(true);
});

test('Test that stepping forward on opponent is not a valid move', () => {
  expect(
    isMoveValid(
      createGameFromMoves(['e2', 'e8', 'e3', 'e7', 'e4', 'e6', 'e5']),
      'e5',
    ),
  ).toBe(false);
});

test('Test that stepping to the right on opponent is not a valid move', () => {
  expect(
    isMoveValid(
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
      'f5',
    ),
  ).toBe(false);
});

test('Test that jumping forward over opponent is a valid move', () => {
  expect(
    isMoveValid(
      createGameFromMoves(['e2', 'e8', 'e3', 'e7', 'e4', 'e6', 'a1h', 'e5']),
      'e6',
    ),
  ).toBe(true);
});

test('Test that blocking all paths for a player is not a valid move', () => {
  // Adding walls horizontally across the board
  expect(
    isMoveValid(
      createGameFromMoves(['a5h', 'c5h', 'e5h', 'g5h', 'h5v']),
      'h6h',
    ),
  ).toBe(false);

  // Adding walls around player 1
  expect(isMoveValid(createGameFromMoves(['d1v', 'e1h']), 'f1v')).toBe(false);

  // Adding walls around player 2
  expect(isMoveValid(createGameFromMoves(['d8v', 'e8h']), 'f8v')).toBe(false);
});
