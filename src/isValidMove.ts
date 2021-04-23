import { Game, MoveObject } from './types';
import {
  doesWallMoveOverlapExistingWall,
  getOppositePlayer,
  isValidNormalMove,
  isWallMove,
  shortestPath,
  unvalidatedMove,
} from './utils';

export const isValidMove = (game: Game, move: MoveObject) => {
  // Handle wall moves
  const currentPosition = game.playerPositions[game.turn];
  if (isWallMove(move)) {
    if (game.playerWallCounts[game.turn] < 1) return false; // Check that player has enough walls
    if (doesWallMoveOverlapExistingWall(game, move)) return false; // Check that wall does not overlap other walls
    const gameWithUnvalidatedMove = unvalidatedMove(game, move);
    if (
      shortestPath(gameWithUnvalidatedMove, game.turn) &&
      shortestPath(gameWithUnvalidatedMove, getOppositePlayer(game.turn))
    ) {
      return true;
    }
    return false;
  }
  return isValidNormalMove(game, currentPosition, move);
};
