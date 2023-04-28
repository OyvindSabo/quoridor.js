import { Game } from '../types';
import { createGameFromMoves } from './createGameFromMoves';
import {
  butlast,
  getOppositePlayer,
  isWallPosition,
  last,
} from '../immutable/utils';
import { getTurn } from '../immutable/getTurn';

export const doUndo = (game: Game) => {
  const move = game.pastMoves.pop();
  if (!move) return;
  const turn = getOppositePlayer(getTurn(game));
  if (isWallPosition(move)) {
    game.board[move] = false;
    game.playerWallCounts[turn] += 1;
  }
  return {
    ...createGameFromMoves(butlast(game.pastMoves)),
    futureMoves: [last(game.pastMoves)]
      .concat(game.futureMoves)
      .filter(Boolean),
  };
};
