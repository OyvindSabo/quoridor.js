import { getTurn } from './getTurn';
import { Game, Move, PawnPosition } from './types';
import {
  doesWallMoveOverlapExistingWall,
  getOppositePlayer,
  isValidNormalMove,
  isWallPosition,
  moveObjectToMove,
  shortestPath,
  unvalidatedMove,
} from './utils';

export const isValidMove = (game: Game, move: Move) => {
  // Handle wall moves
  const currentPosition = game.playerPositions[getTurn(game)];
  if (isWallPosition(move)) {
    if (game.playerWallCounts[getTurn(game)] < 1) return false; // Check that player has enough walls
    if (doesWallMoveOverlapExistingWall(game, move)) return false; // Check that wall does not overlap other walls
    const gameWithUnvalidatedMove = unvalidatedMove(game, move);
    if (
      shortestPath(gameWithUnvalidatedMove, getTurn(game)) &&
      shortestPath(gameWithUnvalidatedMove, getOppositePlayer(getTurn(game)))
    ) {
      return true;
    }
    return false;
  }
  return isValidNormalMove(
    game,
    moveObjectToMove(currentPosition) as PawnPosition,
    move,
  );
};
