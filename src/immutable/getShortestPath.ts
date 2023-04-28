import { aStar } from './aStar';
import { Game, PawnPosition, Player } from '../types';
import {
  doesHorizontalWallBlockPlayer,
  getShortestPathWithNoObstacles,
  isHorizontalWallMove,
} from './utils';

export const getShortestPath = (
  game: Game,
  player: Player,
): PawnPosition[] | null => {
  const placedHorizontalWalls = game.pastMoves.filter(isHorizontalWallMove);
  if (
    placedHorizontalWalls.some((wall) =>
      doesHorizontalWallBlockPlayer(game, player, wall),
    )
  ) {
    return aStar(game, player);
  }
  // The shortest path has no obstacles if no horizontal walls have been placed
  // between the player and the goal
  return getShortestPathWithNoObstacles(game, player);
};
