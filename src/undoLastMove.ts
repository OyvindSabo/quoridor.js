import { Game } from './types';
import { createGameFromMoves } from './createGameFromMoves';

export const undoLastMove = (game: Game) => {
  return createGameFromMoves(game.history.slice(0, -1));
};
