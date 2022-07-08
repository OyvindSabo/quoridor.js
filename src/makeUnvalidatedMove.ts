import { getTurn } from './getTurn';
import { Board, Game, Move } from './types';
import { isWallPosition } from './utils';

export const makeUnvalidatedMove = (game: Game, move: Move): Game => {
  if (isWallPosition(move)) {
    // If wall move
    return {
      ...game,
      board: { ...game.board, [move]: true },
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
    return {
      ...game,
      board: Object.fromEntries(
        Object.entries(game.board).map(([pos, val]) => [
          pos,
          pos === move ? getTurn(game) : val === getTurn(game) ? 0 : val,
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
    };
  }
};
