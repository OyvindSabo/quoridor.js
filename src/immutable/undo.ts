import { Game } from '../types';
import { createGameFromMoves } from './createGameFromMoves';
import { butlast, last } from './utils';

export const undo = (game: Game) => {
  return {
    ...createGameFromMoves(butlast(game.pastMoves)),
    futureMoves: [last(game.pastMoves)]
      .concat(game.futureMoves)
      .filter(Boolean),
  };
};
