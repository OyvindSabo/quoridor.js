import { isMoveValid } from './isMoveValid';
import { makeUnvalidatedMove } from './makeUnvalidatedMove';
import { Game, Move } from '../types';

export const makeMove = (game: Game, move: Move) => {
  if (!isMoveValid(game, move)) return game;
  return makeUnvalidatedMove(game, move);
};
