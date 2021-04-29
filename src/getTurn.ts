import { Game, Player } from './types';

export const getTurn = (game: Game) => {
  return ((game.history.length % 2) + 1) as Player;
};
