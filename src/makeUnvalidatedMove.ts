import { getTurn } from './getTurn';
import { Board, Game, Move } from './types';
import { isWallPosition } from './utils';

export const makeUnvalidatedMove = (game: Game, move: Move): Game => {
  const turn = getTurn(game);
  if (isWallPosition(move)) {
    // If wall move
    return {
      ...game,
      board: { ...game.board, [move]: true },
      playerWallCounts: {
        ...game.playerWallCounts,
        [turn]: game.playerWallCounts[turn] - 1,
      },
      playerPositions: {
        ...game.playerPositions,
        [turn]: {
          ...game.playerPositions[turn],
          previousPosition: game.playerPositions[turn],
        },
      },
      pastMoves: game.pastMoves.concat(move),
      futureMoves: [],
    };
  } else {
    return {
      ...game,
      board: Object.fromEntries(
        Object.entries(game.board).map(([pos, val]) => [
          pos,
          pos === move ? turn : val === turn ? null : val,
        ]),
      ) as Board,
      playerPositions: {
        ...game.playerPositions,
        [turn]: {
          position: move,
          previousPosition: game.playerPositions[turn],
        },
      },
      pastMoves: game.pastMoves.concat(move),
      futureMoves: [],
    };
  }
};
