import { possiblyTrappedPositions, wallPositions } from '../immutable/consts';
import { getShortestPath } from '../immutable/getShortestPath';
import { getTurn } from '../immutable/getTurn';
import {
  doesWallMoveHaveSameDirectionAsAllPreviousWallMoves,
  getNumberOfNeighborWalls,
  getNumberOfPlacedWalls,
  getOppositePlayer,
  overlapsPath,
  overlapsWall,
} from '../immutable/utils';
import { Game } from '../types';
import { doMakeUnvalidatedMove } from './doMakeUnvalidatedMove';
import { doUndo } from './doUndo';

export const getValidWallMoveArray = (game: Game) => {
  const thisTurn = getTurn(game);
  if (game.playerWallCounts[thisTurn] < 1) {
    return [];
  }
  const thatTurn = getOppositePlayer(thisTurn);

  const numberOfPlacedWalls = getNumberOfPlacedWalls(game);
  if (numberOfPlacedWalls <= 3) {
    if (
      !possiblyTrappedPositions[(numberOfPlacedWalls + 1) as 1 | 2 | 3 | 4].has(
        game.playerPositions[1].position,
      ) &&
      !possiblyTrappedPositions[(numberOfPlacedWalls + 1) as 1 | 2 | 3 | 4].has(
        game.playerPositions[2].position,
      )
    ) {
      return wallPositions.filter((wallMove) => !overlapsWall(game, wallMove));
    }
    // TODO: We could have a similar lookup map to see if a wall position is
    // possibly trapping given a number of already placed walls.

    // TODO: Even if the players are in a possibly trapped position we should
    // check if the walls are placed so that they are actually trapped to
    // possibly avoid having to run A*.
  }

  const thisPlayersShortestPath = getShortestPath(game, thisTurn);
  const thatPlayersShortestPath = getShortestPath(game, thatTurn);
  if (thisPlayersShortestPath === null || thatPlayersShortestPath === null) {
    return [];
  }
  return wallPositions.filter((wallMove) => {
    if (overlapsWall(game, wallMove)) return false;
    if (
      !overlapsPath(thisPlayersShortestPath, wallMove) &&
      !overlapsPath(thatPlayersShortestPath, wallMove)
    ) {
      return true;
    }
    if (doesWallMoveHaveSameDirectionAsAllPreviousWallMoves(game, wallMove)) {
      return true;
    }
    if (getNumberOfNeighborWalls(game, wallMove) < 2) {
      return true;
    }
    doMakeUnvalidatedMove(game, wallMove);
    const thisTurnAfterMove = getTurn(game);
    const thatTurnAfterMove = getOppositePlayer(getTurn(game));
    const thisShortestPath = getShortestPath(game, thisTurnAfterMove);
    const thatShortestPath = getShortestPath(game, thatTurnAfterMove);
    doUndo(game);
    return Boolean(thisShortestPath && thatShortestPath);
  });
};
