import { createGameFromMoves } from '..';
import { isMoveValid } from '..';
import { isGameOver } from '..';

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

test('Test that right up diagonal move against right border is valid', () => {
  expect(
    isMoveValid(
      createGameFromMoves([
        'f1',
        'e8',
        'g1',
        'e7',
        'h1',
        'e6',
        'i1',
        'e5',
        'i2',
        'f5',
        'i3',
        'g5',
        'i4',
        'h5',
        'i5',
      ]),
      'i6',
    ),
  ).toBe(true);
});

test('Test that right down diagonal move against right border is valid', () => {
  expect(
    isMoveValid(
      createGameFromMoves([
        'f1',
        'e8',
        'g1',
        'e7',
        'h1',
        'e6',
        'i1',
        'e5',
        'i2',
        'f5',
        'i3',
        'g5',
        'i4',
        'h5',
        'i5',
      ]),
      'i4',
    ),
  ).toBe(true);
});

test('Test that left up diagonal move against left border is valid', () => {
  expect(
    isMoveValid(
      createGameFromMoves([
        'd1',
        'e8',
        'c1',
        'e7',
        'b1',
        'e6',
        'a1',
        'e5',
        'a2',
        'd5',
        'a3',
        'c5',
        'a4',
        'b5',
        'a5',
      ]),
      'a6',
    ),
  ).toBe(true);
});

test('Test that left down diagonal move against left border is valid', () => {
  expect(
    isMoveValid(
      createGameFromMoves([
        'd1',
        'e8',
        'c1',
        'e7',
        'b1',
        'e6',
        'a1',
        'e5',
        'a2',
        'd5',
        'a3',
        'c5',
        'a4',
        'b5',
        'a5',
      ]),
      'a4',
    ),
  ).toBe(true);
});

test('Test that down right diagonal move against bottom border is valid', () => {
  expect(
    isMoveValid(
      createGameFromMoves([
        'e2',
        'e8',
        'e3',
        'e7',
        'e4',
        'e6',
        'e5',
        'e4',
        'e3',
        'e2',
        'e1',
      ]),
      'f1',
    ),
  ).toBe(true);
});

test('Test that down right diagonal move against bottom border is valid', () => {
  expect(
    isMoveValid(
      createGameFromMoves([
        'e2',
        'e8',
        'e3',
        'e7',
        'e4',
        'e6',
        'e5',
        'e4',
        'e3',
        'e2',
        'e1',
      ]),
      'd1',
    ),
  ).toBe(true);
});

test('Test that making a move after the game is over is not valid', () => {
  const finishedGame = createGameFromMoves([
    'e2',
    'e8',
    'e3',
    'e7',
    'e4',
    'e6',
    'e5',
    'e4',
    'e6',
    'e5',
    'e7',
    'e4',
    'e8',
    'e3',
    'e9',
  ]);
  expect(isGameOver(finishedGame)).toBe(true);
  expect(isMoveValid(finishedGame, 'e2')).toBe(false);
});
