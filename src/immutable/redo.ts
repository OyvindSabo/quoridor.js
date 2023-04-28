import { Game } from '../types';
import { createGameFromMoves } from './createGameFromMoves';
import { first, rest } from './utils';

export const redo = (game: Game) => {
  return {
    ...createGameFromMoves(
      game.pastMoves.concat(first(game.futureMoves)).filter(Boolean),
    ),
    futureMoves: rest(game.futureMoves),
  };
};
