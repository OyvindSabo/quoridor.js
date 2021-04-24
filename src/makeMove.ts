import { isValidMove } from './isValidMove';
import { Game, Move } from './types';
import { unvalidatedMove } from './utils';

export const makeMove = (game: Game, move: Move) => {
  if (!isValidMove(game, move)) return game;
  return unvalidatedMove(game, move);
};
