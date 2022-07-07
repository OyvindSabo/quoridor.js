import { getWinner } from './getWinner';
import { Game } from './types';

export const isGameOver = (game: Game) => {
  return getWinner(game) !== null;
};
