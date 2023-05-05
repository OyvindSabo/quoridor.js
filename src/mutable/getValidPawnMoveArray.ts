import { getTurn } from '../immutable/getTurn';
import {
  getPositionFromEastEastMove,
  getPositionFromEastMove,
  getPositionFromNorthEastMove,
  getPositionFromNorthMove,
  getPositionFromNorthNorthMove,
  getPositionFromNorthWestMove,
  getPositionFromSouthEastMove,
  getPositionFromSouthMove,
  getPositionFromSouthSouthMove,
  getPositionFromSouthWestMove,
  getPositionFromWestMove,
  getPositionFromWestWestMove,
  isValidNormalMove,
} from '../immutable/utils';
import { Game, PawnPosition } from '../types';

export const getValidPawnMoveArray = (game: Game) => {
  const currentPosition = game.playerPositions[getTurn(game)].position;
  const unvalidatedPawnMoveArray = [
    getPositionFromNorthMove(currentPosition),
    getPositionFromEastMove(currentPosition),
    getPositionFromWestMove(currentPosition),
    getPositionFromSouthMove(currentPosition),
  ];
  // This can be extended to also check if the players are next to each other
  const includeMovesOverOpponent = game.pastMoves.length >= 7;
  if (includeMovesOverOpponent) {
    unvalidatedPawnMoveArray.concat([
      getPositionFromNorthNorthMove(currentPosition),
      getPositionFromNorthEastMove(currentPosition),
      getPositionFromNorthWestMove(currentPosition),
      getPositionFromEastEastMove(currentPosition),
      getPositionFromWestWestMove(currentPosition),
      getPositionFromSouthEastMove(currentPosition),
      getPositionFromSouthWestMove(currentPosition),
      getPositionFromSouthSouthMove(currentPosition),
    ]);
  }
  const validPawnMoveArray = unvalidatedPawnMoveArray.filter(
    (newPosition) =>
      newPosition && isValidNormalMove(game, currentPosition, newPosition),
  ) as PawnPosition[];
  return validPawnMoveArray;
};
