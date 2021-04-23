import { Game } from './types';

export const getWinner = (game: Game) => {
  if (game.playerPositions[1].y === 9) return 1;
  if (game.playerPositions[2].y === 1) return 2;
  return null;
};
