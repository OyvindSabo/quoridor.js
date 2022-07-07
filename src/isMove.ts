import { pawnAndWallPositions } from './consts';
import { Move } from './types';

export const isMove = (maybeMove: string): maybeMove is Move => {
  return pawnAndWallPositions.includes(maybeMove as Move);
};
