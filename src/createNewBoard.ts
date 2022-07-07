import { pawnAndWallPositions } from './consts';
import { Board, Position } from './types';
import { isWallPosition } from './utils';

const getDefaultValueForPosition = (position: Position) => {
  if (isWallPosition(position)) return false;
  if (position === 'e1') return 1;
  if (position === 'e9') return 2;
  return null;
};

export const createNewBoard = () => {
  return pawnAndWallPositions.reduce(
    (board, position) => ({
      ...board,
      [position]: getDefaultValueForPosition(position),
    }),
    {} as Board,
  );
};
