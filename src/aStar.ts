import { pawnPositions } from './consts';
import { Game, PawnPosition, Player } from './types';
import {
  getVerticalCoordinate,
  horizontallyDecrementPawnPosition,
  horizontallyIncrementPawnPosition,
  isHorizontallyDecrementablePawnPosition,
  isHorizontallyIncrementablePawnPosition,
  isValidAStarMove,
  isVerticallyDecrementablePawnPosition,
  isVerticallyIncrementablePawnPosition,
  verticallyDecrementPawnPosition,
  verticallyIncrementPawnPosition,
} from './utils';

const getValidSurroundingPositions = (
  game: Game,
  position: PawnPosition,
  discoveredPositions: Set<PawnPosition>,
  relaxedPositions: Set<PawnPosition>,
) => {
  return [
    isVerticallyIncrementablePawnPosition(position) &&
      verticallyIncrementPawnPosition(position),
    isHorizontallyIncrementablePawnPosition(position) &&
      horizontallyIncrementPawnPosition(position),
    isVerticallyDecrementablePawnPosition(position) &&
      verticallyDecrementPawnPosition(position),
    isHorizontallyDecrementablePawnPosition(position) &&
      horizontallyDecrementPawnPosition(position),
  ].filter((newPosition) => {
    return (
      newPosition &&
      !discoveredPositions.has(newPosition) &&
      !relaxedPositions.has(newPosition) &&
      isValidAStarMove(game, position, newPosition)
    );
  }) as PawnPosition[];
};

// TODO: Maybe this could rather be a map from position to distance
const getVerticalDistanceToGoal = (position: PawnPosition, turn: Player) => {
  return turn === 1
    ? 9 - getVerticalCoordinate(position)
    : getVerticalCoordinate(position) - 1;
};

const hasReachedGoal = (position: PawnPosition, turn: Player) => {
  return getVerticalDistanceToGoal(position, turn) === 0;
};

/**
 * Find the position that is closest to the goal
 */
const getMostPromisingPosition = (
  positions: Set<PawnPosition>,
  turn: Player,
) => {
  let lowestVerticalDistanceToGoal = Infinity;
  let mostPromisingPosition: PawnPosition | null = null;
  positions.forEach((position) => {
    const verticalDistanceToGoal = getVerticalDistanceToGoal(position, turn);
    if (verticalDistanceToGoal < lowestVerticalDistanceToGoal) {
      lowestVerticalDistanceToGoal = verticalDistanceToGoal;
      mostPromisingPosition = position;
    }
  });
  return mostPromisingPosition;
};

const getPath = (
  positionToPreviousPosition: Record<PawnPosition, PawnPosition | null>,
  endPosition: PawnPosition,
) => {
  let previousPosition = positionToPreviousPosition[endPosition];
  const path = [endPosition];
  while (previousPosition) {
    path.unshift(previousPosition);
    previousPosition = positionToPreviousPosition[previousPosition];
  }
  return path;
};

/**
 * Returns the shortest path from the given player's current position to the
 * goal. The path includes the player's current position.
 */
export const aStar = (game: Game, player: Player) => {
  const startPosition = game.playerPositions[player].position;
  const positionToPreviousPosition: Record<
    PawnPosition,
    PawnPosition | null
  > = Object.fromEntries(
    pawnPositions.map((position) => [position, null]),
  ) as Record<PawnPosition, PawnPosition | null>;
  // When a node is relaxed it is removed from exploredPositions
  const discoveredPositions = new Set([startPosition]);
  // This is a subset of discoveredPositions
  const relaxedPositions = new Set<PawnPosition>();
  let goalPosition: PawnPosition | null = null;
  while (!goalPosition) {
    const mostPromisingPosition = getMostPromisingPosition(
      discoveredPositions,
      player,
    );
    if (!mostPromisingPosition) return null;
    if (hasReachedGoal(mostPromisingPosition, player)) {
      goalPosition = mostPromisingPosition;
    }
    const positionsDiscoveredFromMostPromisingPosition = getValidSurroundingPositions(
      game,
      mostPromisingPosition,
      discoveredPositions,
      relaxedPositions,
    );
    for (const position of positionsDiscoveredFromMostPromisingPosition) {
      discoveredPositions.add(position);
      positionToPreviousPosition[position] = mostPromisingPosition;
    }
    relaxedPositions.add(mostPromisingPosition);
    discoveredPositions.delete(mostPromisingPosition);
  }
  return getPath(positionToPreviousPosition, goalPosition);
};
