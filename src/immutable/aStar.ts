import {
  goalPositionsMap,
  pawnPositions,
  verticalDistanceToGoalMap,
} from './consts';
import { Game, PawnPosition, Player } from '../types';
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

const getVerticalDistanceToGoal = (position: PawnPosition, turn: Player) => {
  return verticalDistanceToGoalMap[turn][position];
};

const hasReachedGoal = (position: PawnPosition, turn: Player) => {
  return goalPositionsMap[turn].has(position);
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
  // TODO: forEach might not be the most efficient way to loop here.
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
  > = {
    a1: null,
    a2: null,
    a3: null,
    a4: null,
    a5: null,
    a6: null,
    a7: null,
    a8: null,
    a9: null,
    b1: null,
    b2: null,
    b3: null,
    b4: null,
    b5: null,
    b6: null,
    b7: null,
    b8: null,
    b9: null,
    c1: null,
    c2: null,
    c3: null,
    c4: null,
    c5: null,
    c6: null,
    c7: null,
    c8: null,
    c9: null,
    d1: null,
    d2: null,
    d3: null,
    d4: null,
    d5: null,
    d6: null,
    d7: null,
    d8: null,
    d9: null,
    e1: null,
    e2: null,
    e3: null,
    e4: null,
    e5: null,
    e6: null,
    e7: null,
    e8: null,
    e9: null,
    f1: null,
    f2: null,
    f3: null,
    f4: null,
    f5: null,
    f6: null,
    f7: null,
    f8: null,
    f9: null,
    g1: null,
    g2: null,
    g3: null,
    g4: null,
    g5: null,
    g6: null,
    g7: null,
    g8: null,
    g9: null,
    h1: null,
    h2: null,
    h3: null,
    h4: null,
    h5: null,
    h6: null,
    h7: null,
    h8: null,
    h9: null,
    i1: null,
    i2: null,
    i3: null,
    i4: null,
    i5: null,
    i6: null,
    i7: null,
    i8: null,
    i9: null,
  };
  // When a node is relaxed it is removed from discoveredPositions
  const discoveredPositions = new Set([startPosition]);
  // This is a subset of discoveredPositions
  const relaxedPositions = new Set<PawnPosition>();
  while (true) {
    const mostPromisingPosition = getMostPromisingPosition(
      discoveredPositions,
      player,
    );
    if (!mostPromisingPosition) return null;
    if (hasReachedGoal(mostPromisingPosition, player)) {
      return getPath(positionToPreviousPosition, mostPromisingPosition);
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
};
