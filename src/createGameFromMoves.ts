import { Move } from './types';
import { unvalidatedMove } from './utils';
import { createNewGame } from './createNewGame';

export const createGameFromMoves = (moves: Move[]) => {
  return moves.reduce(unvalidatedMove, createNewGame());
};
