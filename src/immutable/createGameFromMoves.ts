import { Move } from '../types';
import { createNewGame } from './createNewGame';
import { makeUnvalidatedMove } from './makeUnvalidatedMove';

export const createGameFromMoves = (moves: Move[]) => {
  return moves.reduce(makeUnvalidatedMove, createNewGame());
};
