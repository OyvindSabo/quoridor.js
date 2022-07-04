import { createGameFromMoves } from '../createGameFromMoves';
import { createNewGame } from '../createNewGame';
import { getUnicodeRepresentation } from '../getUnicodeRepresentation';
import { shortestPath } from '../utils';

test('Test that a shortest path to the other side of the board is found if there are no obstacles (the other player does not count as an obstacle)', () => {
  expect(shortestPath(createNewGame(), 1)).toEqual([
    { x: 'e', y: 2 },
    { x: 'e', y: 3 },
    { x: 'e', y: 4 },
    { x: 'e', y: 5 },
    { x: 'e', y: 6 },
    { x: 'e', y: 7 },
    { x: 'e', y: 8 },
    { x: 'e', y: 9 },
  ]);
  expect(shortestPath(createNewGame(), 2)).toEqual([
    { x: 'e', y: 8 },
    { x: 'e', y: 7 },
    { x: 'e', y: 6 },
    { x: 'e', y: 5 },
    { x: 'e', y: 4 },
    { x: 'e', y: 3 },
    { x: 'e', y: 2 },
    { x: 'e', y: 1 },
  ]);
});

test('Test that shortest path does not go up through the right part of a horizontal wall', () => {
  expect(shortestPath(createGameFromMoves(['e1h']), 1)).toEqual([
    { x: 'd', y: 1 },
    { x: 'd', y: 2 },
    { x: 'd', y: 3 },
    { x: 'd', y: 4 },
    { x: 'd', y: 5 },
    { x: 'd', y: 6 },
    { x: 'd', y: 7 },
    { x: 'd', y: 8 },
    { x: 'd', y: 9 },
  ]);
});

test('Test that shortest path does not go up through the left part of a horizontal wall', () => {
  expect(shortestPath(createGameFromMoves(['d1h']), 1)).toEqual([
    { x: 'f', y: 1 },
    { x: 'f', y: 2 },
    { x: 'f', y: 3 },
    { x: 'f', y: 4 },
    { x: 'f', y: 5 },
    { x: 'f', y: 6 },
    { x: 'f', y: 7 },
    { x: 'f', y: 8 },
    { x: 'f', y: 9 },
  ]);
});

test('Test that shortest path does not go down through the right part of a horizontal wall', () => {
  expect(shortestPath(createGameFromMoves(['e8h']), 2)).toEqual([
    { x: 'd', y: 9 },
    { x: 'd', y: 8 },
    { x: 'd', y: 7 },
    { x: 'd', y: 6 },
    { x: 'd', y: 5 },
    { x: 'd', y: 4 },
    { x: 'd', y: 3 },
    { x: 'd', y: 2 },
    { x: 'd', y: 1 },
  ]);
});

test('Test that shortest path does not go down through the left part of a horizontal wall', () => {
  expect(shortestPath(createGameFromMoves(['d8h']), 2)).toEqual([
    { x: 'f', y: 9 },
    { x: 'f', y: 8 },
    { x: 'f', y: 7 },
    { x: 'f', y: 6 },
    { x: 'f', y: 5 },
    { x: 'f', y: 4 },
    { x: 'f', y: 3 },
    { x: 'f', y: 2 },
    { x: 'f', y: 1 },
  ]);
});

test('Test that shortest path does not go left through the bottom part of a vertical wall', () => {
  expect(shortestPath(createGameFromMoves(['e1h', 'd1v']), 1)).toEqual([
    { x: 'f', y: 1 },
    { x: 'g', y: 1 },
    { x: 'g', y: 2 },
    { x: 'g', y: 3 },
    { x: 'g', y: 4 },
    { x: 'g', y: 5 },
    { x: 'g', y: 6 },
    { x: 'g', y: 7 },
    { x: 'g', y: 8 },
    { x: 'g', y: 9 },
  ]);
});

test('Test that shortest path does not go left through the top part of a vertical wall', () => {
  expect(shortestPath(createGameFromMoves(['e2h', 'd1v', 'e2']), 1)).toEqual([
    { x: 'f', y: 2 },
    { x: 'g', y: 2 },
    { x: 'g', y: 3 },
    { x: 'g', y: 4 },
    { x: 'g', y: 5 },
    { x: 'g', y: 6 },
    { x: 'g', y: 7 },
    { x: 'g', y: 8 },
    { x: 'g', y: 9 },
  ]);
});

test('Test that shortest path does not go right through the bottom part of a vertical wall', () => {
  expect(shortestPath(createGameFromMoves(['d1h', 'e1v']), 1)).toEqual([
    { x: 'd', y: 1 },
    { x: 'c', y: 1 },
    { x: 'c', y: 2 },
    { x: 'c', y: 3 },
    { x: 'c', y: 4 },
    { x: 'c', y: 5 },
    { x: 'c', y: 6 },
    { x: 'c', y: 7 },
    { x: 'c', y: 8 },
    { x: 'c', y: 9 },
  ]);
});

test('Test that shortest path does not go right through the top part of a vertical wall', () => {
  expect(shortestPath(createGameFromMoves(['d2h', 'e1v', 'e2']), 1)).toEqual([
    { x: 'd', y: 2 },
    { x: 'c', y: 2 },
    { x: 'c', y: 3 },
    { x: 'c', y: 4 },
    { x: 'c', y: 5 },
    { x: 'c', y: 6 },
    { x: 'c', y: 7 },
    { x: 'c', y: 8 },
    { x: 'c', y: 9 },
  ]);
});

test('Test that a shortest path to the other side of the board cannot be found if the player is surrounded by walls', () => {
  // Adding walls around player 1
  const gameWithTrappedPlayer1 = createGameFromMoves(['d1v', 'e1h', 'f1v']);
  expect(shortestPath(gameWithTrappedPlayer1, 1)).toBe(null);
});
