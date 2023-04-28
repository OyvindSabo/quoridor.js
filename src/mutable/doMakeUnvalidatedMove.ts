import { getTurn } from '../immutable/getTurn';
import { Game, Move } from '../types';
import { isWallPosition } from '../immutable/utils';

export const doMakeUnvalidatedMove = (game: Game, move: Move): void => {
  const turn = getTurn(game);
  if (isWallPosition(move)) {
    // If wall move
    game.board[move] = true;
    game.playerWallCounts[turn] -= 1;
    game.playerPositions[turn] = {
      ...game.playerPositions[turn],
      previousPosition: game.playerPositions[turn],
    };
  } else {
    game.board[move] = turn;
    game.board[game.playerPositions[turn].position] = null;
    game.playerPositions[turn] = {
      position: move,
      previousPosition: game.playerPositions[turn],
    };
  }
  game.pastMoves.push(move);
  game.futureMoves = [];
};
