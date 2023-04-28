import { Game } from '../types';
import { getOppositePlayer, isWallPosition } from '../immutable/utils';
import { getTurn } from '../immutable/getTurn';

export const doUndo = (game: Game): void => {
  const turn = getOppositePlayer(getTurn(game));
  const move = game.pastMoves.pop();
  const previousPosition = game.playerPositions[turn].previousPosition;
  if (!move || !previousPosition) return;
  game.futureMoves.unshift(move);
  if (isWallPosition(move)) {
    game.board[move] = false;
    game.playerWallCounts[turn] += 1;
  } else {
    game.board[move] = null;
    game.board[previousPosition.position] = turn;
  }
  game.playerPositions[turn] = previousPosition;
};
