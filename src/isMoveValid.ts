import { getShortestPath } from './getShortestPath';
import { getTurn } from './getTurn';
import { makeUnvalidatedMove } from './makeUnvalidatedMove';
import { Game, Move } from './types';
import {
  doesWallMoveOverlapExistingWall,
  getOppositePlayer,
  isValidNormalMove,
  isWallPosition,
} from './utils';

export const isMoveValid = (game: Game, move: Move) => {
  // Handle wall moves
  const currentPosition = game.playerPositions[getTurn(game)].position;
  if (isWallPosition(move)) {
    if (game.playerWallCounts[getTurn(game)] < 1) return false; // Check that player has enough walls
    if (doesWallMoveOverlapExistingWall(game, move)) return false; // Check that wall does not overlap other walls
    const gameWithUnvalidatedMove = makeUnvalidatedMove(game, move);
    if (
      getShortestPath(gameWithUnvalidatedMove, getTurn(game)) &&
      getShortestPath(gameWithUnvalidatedMove, getOppositePlayer(getTurn(game)))
    ) {
      return true;
    }
    return false;
  }
  return isValidNormalMove(game, currentPosition, move);
};
