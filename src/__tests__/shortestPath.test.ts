import { createGameFromMoves } from '../createGameFromMoves';
import { createNewGame } from '../createNewGame';
import { getUnicodeRepresentation } from '../getUnicodeRepresentation';
import { shortestPath } from '../utils';

test('Test that a shortest path to the other side of the board is found if there are no obstacles (the other player does not count as an obstacle)', () => {
  expect(shortestPath(createNewGame(), 1)).toEqual([
    'e1',
    'e2',
    'e3',
    'e4',
    'e5',
    'e6',
    'e7',
    'e8',
    'e9',
  ]);
  expect(shortestPath(createNewGame(), 2)).toEqual([
    'e9',
    'e8',
    'e7',
    'e6',
    'e5',
    'e4',
    'e3',
    'e2',
    'e1',
  ]);
});

test('Test that shortest path does not go up through the right part of a horizontal wall', () => {
  expect(shortestPath(createGameFromMoves(['e1h']), 1)).toEqual([
    'e1',
    'd1',
    'd2',
    'd3',
    'd4',
    'd5',
    'd6',
    'd7',
    'd8',
    'd9',
  ]);
});

test('Test that shortest path does not go up through the left part of a horizontal wall', () => {
  expect(shortestPath(createGameFromMoves(['d1h']), 1)).toEqual([
    'e1',
    'f1',
    'f2',
    'f3',
    'f4',
    'f5',
    'f6',
    'f7',
    'f8',
    'f9',
  ]);
});

test('Test that shortest path does not go down through the right part of a horizontal wall', () => {
  expect(shortestPath(createGameFromMoves(['e8h']), 2)).toEqual([
    'e9',
    'd9',
    'd8',
    'd7',
    'd6',
    'd5',
    'd4',
    'd3',
    'd2',
    'd1',
  ]);
});

test('Test that shortest path does not go down through the left part of a horizontal wall', () => {
  expect(shortestPath(createGameFromMoves(['d8h']), 2)).toEqual([
    'e9',
    'f9',
    'f8',
    'f7',
    'f6',
    'f5',
    'f4',
    'f3',
    'f2',
    'f1',
  ]);
});

test('Test that shortest path does not go left through the bottom part of a vertical wall', () => {
  expect(shortestPath(createGameFromMoves(['e1h', 'd1v']), 1)).toEqual([
    'e1',
    'f1',
    'g1',
    'g2',
    'g3',
    'g4',
    'g5',
    'g6',
    'g7',
    'g8',
    'g9',
  ]);
});

test('Test that shortest path does not go left through the top part of a vertical wall', () => {
  expect(shortestPath(createGameFromMoves(['e2h', 'd1v', 'e2']), 1)).toEqual([
    'e2',
    'f2',
    'g2',
    'g3',
    'g4',
    'g5',
    'g6',
    'g7',
    'g8',
    'g9',
  ]);
});

test('Test that shortest path does not go right through the bottom part of a vertical wall', () => {
  expect(shortestPath(createGameFromMoves(['d1h', 'e1v']), 1)).toEqual([
    'e1',
    'd1',
    'c1',
    'c2',
    'c3',
    'c4',
    'c5',
    'c6',
    'c7',
    'c8',
    'c9',
  ]);
});

test('Test that shortest path does not go right through the top part of a vertical wall', () => {
  expect(shortestPath(createGameFromMoves(['d2h', 'e1v', 'e2']), 1)).toEqual([
    'e2',
    'd2',
    'c2',
    'c3',
    'c4',
    'c5',
    'c6',
    'c7',
    'c8',
    'c9',
  ]);
});

test('Test that a shortest path to the other side of the board cannot be found if the player is surrounded by walls', () => {
  // Adding walls around player 1
  const gameWithTrappedPlayer1 = createGameFromMoves(['d1v', 'e1h', 'f1v']);
  expect(shortestPath(gameWithTrappedPlayer1, 1)).toBe(null);
});
