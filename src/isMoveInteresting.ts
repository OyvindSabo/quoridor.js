import { Game, Move, PawnPosition } from './types';
import {
  getNumberOfNeighborWalls,
  isPawnMove,
  isWallAdjacentToAtLeastOnePawn,
  moveObjectToMove,
  overlapsPath,
  shortestPath,
} from './utils';

/**
 * A move is considered interesting if it satisfies any of the following:
 * - It is a pawn move.
 * - It is a wall move blocking a shortest path.
 * - It is a wall move touching at least one other wall.
 * - It is a wall move adjacent to a pawn.
 */
export const isMoveInteresting = (game: Game, move: Move) => {
  if (isPawnMove(move)) return true;
  if (getNumberOfNeighborWalls(game, move) > 0) return true;

  const player1ShortestPath = shortestPath(game, 1);
  if (!player1ShortestPath) return false;
  if (overlapsPath(player1ShortestPath, move)) return true;

  const player2ShortestPath = shortestPath(game, 2);
  if (!player2ShortestPath) return false;
  if (overlapsPath(player2ShortestPath, move)) return true;
  if (isWallAdjacentToAtLeastOnePawn(game, move)) return true;

  return false;
};

export default isMoveInteresting;
