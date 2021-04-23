import { Game } from './types';
import { getValidPawnMoveArray, getValidWallMoveArray } from './utils';

export const getValidMoveArray = (game: Game) => {
  const validPawnMoveArray = getValidPawnMoveArray(game);
  const validWallMoveArray = getValidWallMoveArray(game);
  return [...validPawnMoveArray, ...validWallMoveArray];
};
