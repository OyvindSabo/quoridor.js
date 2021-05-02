import { isMoveValid } from './isMoveValid';
import { Game, Move } from './types';
import { unvalidatedMove } from './utils';

export const makeMove = (game: Game, move: Move) => {
  if (!isMoveValid(game, move)) return game;
  return unvalidatedMove(game, move);
};
