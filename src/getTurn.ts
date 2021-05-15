import { Game, Player } from './types';

export const getTurn = (game: Game) => {
  return ((game.pastMoves.length % 2) + 1) as Player;
};
