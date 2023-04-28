import { Game } from '../types';
import { doMakeUnvalidatedMove } from './doMakeUnvalidatedMove';

export const doRedo = (game: Game): void => {
  const futureMoves = game.futureMoves;
  const move = futureMoves.shift();
  if (!move) return;
  doMakeUnvalidatedMove(game, move);
  game.futureMoves = futureMoves;
};
