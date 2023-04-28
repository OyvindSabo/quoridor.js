import { wallPositions } from './consts';
import { Game } from '../types';

/**
 * Returns a unique hash for the game state, excluding history. As long as two
 * games have the same pawn positions, the same amount of walls left per player
 * and the same occupied wall positions the same hash will be returned.
 */
export const getHash = (game: Game) => {
  const player1Position = game.playerPositions[1].position;
  const player2Position = game.playerPositions[2].position;
  const player1WallCount = game.playerWallCounts[1];
  const player2WallCount = game.playerWallCounts[2];
  const player1WallCountString =
    player1WallCount === 10 ? player1WallCount : `0${player1WallCount}`;
  const player2WallCountString =
    player2WallCount === 10 ? player2WallCount : `0${player2WallCount}`;
  let wallPositionsString = '';
  for (const wallPosition of wallPositions) {
    if (game.board[wallPosition]) {
      wallPositionsString += wallPosition;
    }
  }
  return `${player1Position}${player2Position}${player1WallCountString}${player2WallCountString}${wallPositionsString}`;
};
