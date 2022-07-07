import { getTurn } from './getTurn';
import {
  Board,
  Game,
  HorizontalWallPosition,
  Move,
  PlayerMatrix,
  VerticalWallPosition,
} from './types';
import {
  getHorizontalCoordinate,
  getVerticalCoordinate,
  getWallOrientation,
  isWallPosition,
} from './utils';

export const makeUnvalidatedMove = (game: Game, move: Move): Game => {
  const currentPosition = game.playerPositions[getTurn(game)].position;
  if (isWallPosition(move)) {
    // If wall move
    return {
      ...game,
      board: { ...game.board, [move]: true },
      wallMatrix: {
        ...game.wallMatrix,
        [getHorizontalCoordinate(move)]: {
          ...game.wallMatrix[
            getHorizontalCoordinate(move) as HorizontalWallPosition
          ],
          [getVerticalCoordinate(move)]: {
            ...game.wallMatrix[
              getHorizontalCoordinate(move) as HorizontalWallPosition
            ][getVerticalCoordinate(move) as VerticalWallPosition],
            [getWallOrientation(move)]: true,
          },
        },
      },
      playerWallCounts: {
        ...game.playerWallCounts,
        [getTurn(game)]: game.playerWallCounts[getTurn(game)] - 1,
      },
      playerPositions: {
        ...game.playerPositions,
        [getTurn(game)]: {
          ...game.playerPositions[getTurn(game)],
          previousPosition: game.playerPositions[getTurn(game)],
        },
      },
      pastMoves: [...game.pastMoves, move],
      futureMoves: [],
    };
  } else {
    const pieceMatrixWithRemovedPiece = {
      ...game.pieceMatrix,
      [getHorizontalCoordinate(currentPosition)]: {
        ...game.pieceMatrix[getHorizontalCoordinate(currentPosition)],
        [getVerticalCoordinate(currentPosition)]: 0, // Remove piece from previous position
      },
    } as PlayerMatrix;
    return {
      ...game,
      board: Object.fromEntries(
        Object.entries(game.board).map(([pos, val]) => [
          pos,
          pos === move ? getTurn(game) : val === getTurn(game) ? null : val,
        ]),
      ) as Board,
      playerPositions: {
        ...game.playerPositions,
        [getTurn(game)]: {
          position: move,
          previousPosition: game.playerPositions[getTurn(game)],
        },
      },
      pastMoves: [...game.pastMoves, move],
      futureMoves: [],
      pieceMatrix: {
        ...pieceMatrixWithRemovedPiece,
        [getHorizontalCoordinate(move)]: {
          ...pieceMatrixWithRemovedPiece[getHorizontalCoordinate(move)],
          [getVerticalCoordinate(move)]: getTurn(game), // Add piece to new position
        },
      },
    };
  }
};
