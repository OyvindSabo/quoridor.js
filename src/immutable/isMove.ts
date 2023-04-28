import { positions } from './consts';
import { Move } from '../types';

export const isMove = (maybeMove: string): maybeMove is Move => {
  return positions.has(maybeMove as Move);
};
