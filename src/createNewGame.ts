import { initialBoard } from './consts';
import { Game } from './types';

export const createNewGame = () => {
  const game: Game = {
    board: initialBoard,
    pastMoves: [],
    futureMoves: [],
    playerPositions: { 1: { position: 'e1' }, 2: { position: 'e9' } },
    playerWallCounts: { 1: 10, 2: 10 },
  };
  return game;
};
