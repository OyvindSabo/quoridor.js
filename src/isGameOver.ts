import { Game } from './types';

export const isGameOver = (game: Game) => {
  return game.playerPositions[1].y === 9 || game.playerPositions[2].y === 1;
};
