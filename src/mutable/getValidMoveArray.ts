import { isGameOver } from '../immutable/isGameOver';
import { Game, PawnPosition, WallPosition } from '../types';
import { getValidWallMoveArray } from './getValidWallMoveArray';
import { getValidPawnMoveArray } from './getValidPawnMoveArray';

export const getValidMoveArray = (game: Game) => {
  if (isGameOver(game)) return [];
  const validPawnMoveArray = getValidPawnMoveArray(game);
  const validWallMoveArray = getValidWallMoveArray(game);
  return (validPawnMoveArray as (PawnPosition | WallPosition)[]).concat(
    validWallMoveArray,
  );
};
