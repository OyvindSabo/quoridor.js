import { isValidMove } from './isValidMove';
import { Game, MoveObject } from './types';
import { moveObjectToMove, unvalidatedMove } from './utils';

export const makeMove = (game: Game, moveObject: MoveObject) => {
  if (!isValidMove(game, moveObject)) return game;
  return unvalidatedMove(game, moveObjectToMove(moveObject));
};
