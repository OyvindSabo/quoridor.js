import { isGameOver } from './isGameOver';
import { Game, PawnPosition, WallPosition } from './types';
import { getValidPawnMoveArray, getValidWallMoveArray } from './utils';

export const getValidMoveArray = (game: Game) => {
  if (isGameOver(game)) return [];
  const validPawnMoveArray = getValidPawnMoveArray(game);
  const validWallMoveArray = getValidWallMoveArray(game);
  return (validPawnMoveArray as (PawnPosition | WallPosition)[]).concat(
    validWallMoveArray,
  );
};
