import { isValidMove, unvalidatedMove } from './isValidMove';
import { Game, Move } from './types';

export const makeMove = (game: Game, move: Move) => {
  if (!isValidMove(game, move)) return game;
  return unvalidatedMove(game, move);
};
