import { Game, MoveObject } from './types';
import {
  doesWallMoveOverlapExistingWall,
  getOppositePlayer,
  isValidNormalMove,
  isWallMove,
  moveObjectToMove,
  shortestPath,
  unvalidatedMove,
} from './utils';

export const isValidMove = (game: Game, moveObject: MoveObject) => {
  // Handle wall moves
  const currentPosition = game.playerPositions[game.turn];
  if (isWallMove(moveObject)) {
    if (game.playerWallCounts[game.turn] < 1) return false; // Check that player has enough walls
    if (doesWallMoveOverlapExistingWall(game, moveObject)) return false; // Check that wall does not overlap other walls
    const gameWithUnvalidatedMove = unvalidatedMove(
      game,
      moveObjectToMove(moveObject),
    );
    if (
      shortestPath(gameWithUnvalidatedMove, game.turn) &&
      shortestPath(gameWithUnvalidatedMove, getOppositePlayer(game.turn))
    ) {
      return true;
    }
    return false;
  }
  return isValidNormalMove(game, currentPosition, moveObject);
};
