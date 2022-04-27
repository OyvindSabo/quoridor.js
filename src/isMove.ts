import { getAllPawnPositions } from './getAllPawnPositions';
import { getAllWallPositions } from './getAllWallPositions';
import { Move } from './types';

export const isMove = (maybeMove: string): maybeMove is Move => {
  return [...getAllPawnPositions(), ...getAllWallPositions()].includes(
    maybeMove as Move,
  );
};
