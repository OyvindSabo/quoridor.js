import { isMove } from '../isMove';

test('Test that a pawn is a Move as long as it is within the boundaries of the board', () => {
  expect(isMove('a1')).toBe(true);
  expect(isMove('a5')).toBe(true);
  expect(isMove('a9')).toBe(true);
  expect(isMove('e1')).toBe(true);
  expect(isMove('e5')).toBe(true);
  expect(isMove('e9')).toBe(true);
  expect(isMove('i1')).toBe(true);
  expect(isMove('i5')).toBe(true);
  expect(isMove('i9')).toBe(true);
});

test('Test that a wall moves is a Move as long as it is not on the top row or the rightmost column', () => {
  expect(isMove('a1h')).toBe(true);
  expect(isMove('a1v')).toBe(true);
  expect(isMove('a5h')).toBe(true);
  expect(isMove('a5v')).toBe(true);
  expect(isMove('a8h')).toBe(true);
  expect(isMove('a8v')).toBe(true);
  expect(isMove('e1h')).toBe(true);
  expect(isMove('e1v')).toBe(true);
  expect(isMove('e5h')).toBe(true);
  expect(isMove('e5v')).toBe(true);
  expect(isMove('e8h')).toBe(true);
  expect(isMove('e8v')).toBe(true);
  expect(isMove('h1h')).toBe(true);
  expect(isMove('h1v')).toBe(true);
  expect(isMove('h5h')).toBe(true);
  expect(isMove('h5v')).toBe(true);
  expect(isMove('h8h')).toBe(true);
  expect(isMove('h8v')).toBe(true);
});

test('Test that a wall moves on the top row or the rightmost column are not Moves', () => {
  expect(isMove('a9h')).toBe(false);
  expect(isMove('a9v')).toBe(false);
  expect(isMove('e9h')).toBe(false);
  expect(isMove('e9v')).toBe(false);
  expect(isMove('i9h')).toBe(false);
  expect(isMove('i9v')).toBe(false);
  expect(isMove('i5h')).toBe(false);
  expect(isMove('i5v')).toBe(false);
  expect(isMove('i1h')).toBe(false);
  expect(isMove('i1v')).toBe(false);
});

test('Test that humbug is not a move', () => {
  expect(isMove('humbug')).toBe(false);
});
