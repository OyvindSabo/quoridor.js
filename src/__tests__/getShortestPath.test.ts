import { createGameFromMoves } from '../createGameFromMoves';
import { createNewGame } from '../createNewGame';
import { getShortestPath } from '../getShortestPath';

test('Test that a shortest path to the other side of the board is found if there are no obstacles (the other player does not count as an obstacle)', () => {
  // First test when no moves are made
  expect(getShortestPath(createNewGame(), 1)).toEqual([
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
  expect(getShortestPath(createNewGame(), 2)).toEqual([
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
  // Then test when each player has made one move so that the expected shortest
  // path of one player is not identical to the reversed shortest path of the
  // other
  expect(getShortestPath(createGameFromMoves(['e2', 'e8']), 1)).toEqual([
    'e2',
    'e3',
    'e4',
    'e5',
    'e6',
    'e7',
    'e8',
    'e9',
  ]);
  expect(getShortestPath(createGameFromMoves(['e2', 'e8']), 2)).toEqual([
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
  expect(getShortestPath(createGameFromMoves(['e1h']), 1)).toEqual([
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
  expect(getShortestPath(createGameFromMoves(['d1h']), 1)).toEqual([
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
  expect(getShortestPath(createGameFromMoves(['e8h']), 2)).toEqual([
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
  expect(getShortestPath(createGameFromMoves(['d8h']), 2)).toEqual([
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
  expect(getShortestPath(createGameFromMoves(['e1h', 'd1v']), 1)).toEqual([
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
  expect(
    getShortestPath(createGameFromMoves(['e2h', 'd1v', 'e2']), 1),
  ).toEqual(['e2', 'f2', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7', 'g8', 'g9']);
});

test('Test that shortest path does not go right through the bottom part of a vertical wall', () => {
  expect(getShortestPath(createGameFromMoves(['d1h', 'e1v']), 1)).toEqual([
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
  expect(
    getShortestPath(createGameFromMoves(['d2h', 'e1v', 'e2']), 1),
  ).toEqual(['e2', 'd2', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9']);
});

test('Test that a shortest path to the other side of the board cannot be found if the player is surrounded by walls', () => {
  // Adding walls around player 1
  const gameWithTrappedPlayer1 = createGameFromMoves(['d1v', 'e1h', 'f1v']);
  expect(getShortestPath(gameWithTrappedPlayer1, 1)).toBe(null);
});
