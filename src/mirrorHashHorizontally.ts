import { wallPositions } from './consts';
import { PawnPosition, WallPosition } from './types';
import { mirrorPositionHorizontally } from './utils';

export const mirrorHashHorizontally = (hash: string) => {
  const mirroredPlayer1Position = mirrorPositionHorizontally(
    hash.substring(0, 2) as PawnPosition,
  );
  const mirroredPlayer2Position = mirrorPositionHorizontally(
    hash.substring(2, 4) as PawnPosition,
  );

  const wallCountStrings = hash.substring(4, 8);

  const mirroredFilledWallPositions = new Set(
    ((hash.substring(8).match(/.{1,3}/g) ?? []) as WallPosition[]).map(
      mirrorPositionHorizontally,
    ),
  );

  let wallPositionsString = '';
  for (const wallPosition of wallPositions) {
    if (mirroredFilledWallPositions.has(wallPosition)) {
      wallPositionsString += wallPosition;
    }
  }

  return `${mirroredPlayer1Position}${mirroredPlayer2Position}${wallCountStrings}${wallPositionsString}`;
};
