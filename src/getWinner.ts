import { Game } from './types';
import { getVerticalCoordinate } from './utils';

export const getWinner = (game: Game) => {
  if (getVerticalCoordinate(game.playerPositions[1].position) === 9) return 1;
  if (getVerticalCoordinate(game.playerPositions[2].position) === 1) return 2;
  return null;
};
