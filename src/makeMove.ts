import { isValidMove } from './isValidMove';
import { Game, MoveObject } from './types';
import { unvalidatedMove } from './utils';

export const makeMove = (game: Game, move: MoveObject) => {
  if (!isValidMove(game, move)) return game;
  return unvalidatedMove(game, move);
};
