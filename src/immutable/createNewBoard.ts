import { initialPlayerMatrix, initialWallMatrix } from './consts';

export const createNewBoard = () => {
  return {
    ...initialPlayerMatrix,
    ...initialWallMatrix,
  };
};
