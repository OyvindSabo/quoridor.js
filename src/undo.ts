import { Game } from './types';
import { createGameFromMoves } from './createGameFromMoves';

export const undo = (game: Game) => {
  return createGameFromMoves(game.history.slice(0, -1));
};
