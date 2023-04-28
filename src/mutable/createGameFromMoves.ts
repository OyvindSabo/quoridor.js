import { Move } from '../types';
import { createNewGame } from '../immutable/createNewGame';
import { doMakeUnvalidatedMove } from './doMakeUnvalidatedMove';

export const createGameFromMoves = (moves: Move[]) => {
  const game = createNewGame();
  for (const move of moves) {
    doMakeUnvalidatedMove(game, move);
  }
  return game;
};
