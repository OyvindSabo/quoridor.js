import { Game } from '../types';
import { createNewBoard } from './createNewBoard';

export const createNewGame = () => {
  const game: Game = {
    board: createNewBoard(),
    pastMoves: [],
    futureMoves: [],
    playerPositions: { 1: { position: 'e1' }, 2: { position: 'e9' } },
    playerWallCounts: { 1: 10, 2: 10 },
  };
  return game;
};
