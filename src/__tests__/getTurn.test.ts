import { createGameFromMoves } from '..';
import { getTurn } from '..';

test("Test that it's player 1's turn when the game starts", () => {
  expect(getTurn(createGameFromMoves([]))).toBe(1);
});

test("Test that it's player 2's turn after a pawn opening move", () => {
  expect(getTurn(createGameFromMoves(['e2']))).toBe(2);
});

test("Test that it's player 2's turn after a wall opening move", () => {
  expect(getTurn(createGameFromMoves(['e8h']))).toBe(2);
});

test("Test that it's player 1's again two moves into the game", () => {
  expect(getTurn(createGameFromMoves(['e2', 'e8']))).toBe(1);
});
