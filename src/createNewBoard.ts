import { getAllPawnPositions } from './getAllPawnPositions';
import { getAllWallPositions } from './getAllWallPositions';
import { Board, Position } from './types';
import { isWallPosition } from './utils';

const getDefaultValueForPosition = (position: Position) => {
  if (isWallPosition(position)) return false;
  if (position === 'e1') return 1;
  if (position === 'e9') return 2;
  return null;
};

export const createNewBoard = () => {
  return [...getAllPawnPositions(), ...getAllWallPositions()].reduce(
    (board, position) => ({
      ...board,
      [position]: getDefaultValueForPosition(position),
    }),
    {} as Board,
  );
};
