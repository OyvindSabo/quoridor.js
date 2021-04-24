import { Game, Move, WallMoveObject } from './types';
import {
  doesWallMoveOverlapExistingWall,
  getOppositePlayer,
  isValidNormalMove,
  isWallMove,
  moveToMoveObject,
  shortestPath,
  unvalidatedMove,
} from './utils';

export const isValidMove = (game: Game, move: Move) => {
  // Handle wall moves
  const currentPosition = game.playerPositions[game.turn];
  if (isWallMove(moveToMoveObject(move))) {
    if (game.playerWallCounts[game.turn] < 1) return false; // Check that player has enough walls
    if (
      doesWallMoveOverlapExistingWall(
        game,
        moveToMoveObject(move) as WallMoveObject,
      )
    )
      return false; // Check that wall does not overlap other walls
    const gameWithUnvalidatedMove = unvalidatedMove(game, move);
    if (
      shortestPath(gameWithUnvalidatedMove, game.turn) &&
      shortestPath(gameWithUnvalidatedMove, getOppositePlayer(game.turn))
    ) {
      return true;
    }
    return false;
  }
  return isValidNormalMove(game, currentPosition, moveToMoveObject(move));
};
