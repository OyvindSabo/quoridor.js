import {
  decrementedHorizontalPiecePositions,
  decrementedHorizontalWallCoordinates,
  decrementedVerticalPiecePositions,
  decrementedVerticalWallCoordinates,
  horizontallyDecrementablePositions,
  horizontallyDecrementedPawnPositions,
  horizontallyIncrementablePositions,
  horizontallyIncrementedPawnPositions,
  horizontallyMirroredPositionsMap,
  incrementedHorizontalPiecePositions,
  incrementedHorizontalWallCoordinates,
  incrementedVerticalPiecePositions,
  incrementedVerticalWallCoordinates,
  isDecrementableHorizontalPiecePositionMap,
  isDecrementableHorizontalWallCoordinateMap,
  isDecrementableVerticalPiecePositionMap,
  isDecrementableVerticalWallCoordinateMap,
  isHorizontalWallCoordinateMap,
  isIncrementableHorizontalPiecePositionMap,
  isIncrementableHorizontalWallCoordinateMap,
  isIncrementableVerticalPiecePositionMap,
  isIncrementableVerticalWallCoordinateMap,
  isVerticalWallCoordinateMap,
  isWallPositionMap,
  moveDownDownMap,
  moveDownMap,
  moveDownRightMap,
  moveLeftLeftMap,
  moveLeftMap,
  moveRightMap,
  moveRightRightMap,
  moveUpMap,
  moveUpRightMap,
  moveUpUpMap,
  possiblyTrappedPositions,
  verticallyDecrementablePositions,
  verticallyDecrementedPawnPositions,
  verticallyIncrementablePositions,
  verticallyIncrementedPawnPositions,
  verticalPiecePositions,
  wallPositions,
} from './consts';
import { getShortestPath } from './getShortestPath';
import { getTurn } from './getTurn';
import { makeUnvalidatedMove } from './makeUnvalidatedMove';
import {
  DecrementableHorizontalPiecePosition,
  DecrementableHorizontalWallCoordinate,
  DecrementableVerticalPiecePosition,
  DecrementableVerticalWallCoordinate,
  Game,
  HorizontallyDecrementablePawnPosition,
  HorizontallyDecrementableWallPosition,
  HorizontallyIncrementablePawnPosition,
  HorizontallyIncrementableWallPosition,
  HorizontalPiecePosition,
  HorizontalWallCoordinate,
  IncrementableHorizontalPiecePosition,
  IncrementableHorizontalWallCoordinate,
  IncrementableVerticalPiecePosition,
  IncrementableVerticalWallCoordinate,
  Move,
  PawnMove,
  PawnPosition,
  Player,
  VerticallyDecrementablePawnPosition,
  VerticallyDecrementableWallPosition,
  VerticallyIncrementablePawnPosition,
  VerticallyIncrementableWallPosition,
  VerticalPiecePosition,
  VerticalWallCoordinate,
  WallMove,
  WallOrientation,
  WallPosition,
} from '../types';

type MirrorPositionHorizontally = {
  (position: PawnPosition): PawnPosition;
  (position: WallPosition): WallPosition;
};

export const mirrorPositionHorizontally: MirrorPositionHorizontally = (
  position: PawnPosition | WallPosition,
) => {
  return horizontallyMirroredPositionsMap[position] as any;
};

type GetHorizontalCoordinate = {
  (move: WallPosition): HorizontalWallCoordinate;
  (move: PawnPosition): HorizontalPiecePosition;
};

export const getHorizontalCoordinate: GetHorizontalCoordinate = (
  move: WallPosition | PawnPosition,
) => {
  return move.charAt(0) as any;
};

type GetVerticalCoordinate = {
  (move: WallPosition): VerticalWallCoordinate;
  (move: PawnPosition): VerticalPiecePosition;
};

export const getVerticalCoordinate: GetVerticalCoordinate = (
  move: WallPosition | PawnPosition,
) => {
  return parseInt(move.charAt(1), 10) as any;
};

export const getWallOrientation = (move: WallMove) => {
  return move.charAt(2) as WallOrientation;
};

const letterToNumber = (letter: HorizontalPiecePosition) => {
  return (letter.charCodeAt(0) - 96) as VerticalPiecePosition;
};

export const decrementHorizontalWallCoordinate = (
  HorizontalWallCoordinate: DecrementableHorizontalWallCoordinate,
) => {
  return decrementedHorizontalWallCoordinates[HorizontalWallCoordinate];
};

const decrementHorizontalPiecePosition = (
  horizontalPiecePosition: DecrementableHorizontalPiecePosition,
) => {
  return decrementedHorizontalPiecePositions[horizontalPiecePosition];
};

const incrementHorizontalWallCoordinate = (
  HorizontalWallCoordinate: IncrementableHorizontalWallCoordinate,
): HorizontalWallCoordinate => {
  return incrementedHorizontalWallCoordinates[HorizontalWallCoordinate];
};

const incrementHorizontalPiecePosition = (
  horizontalPiecePosition: IncrementableHorizontalPiecePosition,
) => {
  return incrementedHorizontalPiecePositions[horizontalPiecePosition];
};

export const decrementVerticalWallCoordinate = (
  verticalWallPosition: DecrementableVerticalWallCoordinate,
) => {
  return decrementedVerticalWallCoordinates[verticalWallPosition];
};

const decrementVerticalPiecePosition = (
  verticalPiecePosition: DecrementableVerticalPiecePosition,
) => {
  return decrementedVerticalPiecePositions[verticalPiecePosition];
};

const incrementVerticalWallCoordinate = (
  verticalWallPosition: IncrementableVerticalWallCoordinate,
): VerticalWallCoordinate => {
  return incrementedVerticalWallCoordinates[verticalWallPosition];
};

const incrementVerticalPiecePosition = (
  verticalPiecePosition: IncrementableVerticalPiecePosition,
) => {
  return incrementedVerticalPiecePositions[verticalPiecePosition];
};

export const isHorizontalWallMove = (
  move: PawnMove | WallMove,
): move is WallMove => {
  return move.charAt(2) === 'h';
};

const isVerticalWallMove = (move: PawnMove | WallMove): move is WallMove => {
  return move.charAt(2) === 'v';
};

export const isPawnMove = (move: PawnMove | WallMove): move is PawnMove => {
  return move.length === 2;
};

export const doesWallMoveOverlapExistingWall = (
  game: Game,
  wallMove: WallMove,
) => {
  if (isHorizontalWallMove(wallMove)) {
    if (
      game.board[wallMove] ||
      game.board[rotateWall(wallMove)] ||
      (isHorizontallyDecrementableWallPosition(wallMove) &&
        game.board[moveWallLeft(wallMove)]) ||
      (isHorizontallyIncrementableWallPosition(wallMove) &&
        game.board[moveWallRight(wallMove)])
    ) {
      return true;
    }
  }
  if (isVerticalWallMove(wallMove)) {
    if (
      game.board[wallMove] ||
      game.board[rotateWall(wallMove)] ||
      (isVerticallyDecrementableWallPosition(wallMove) &&
        game.board[moveWallDown(wallMove)]) ||
      (isVerticallyIncrementableWallPosition(wallMove) &&
        game.board[moveWallUp(wallMove)])
    ) {
      return true;
    }
  }
  return false;
};

export const isWallPosition = (move: string): move is WallMove => {
  return Boolean(isWallPositionMap[move]);
};

export const getOppositePlayer = (player: Player) => {
  return player === 1 ? 2 : 1;
};

const isSingleUpMove = (currentPosition: PawnPosition, move: PawnMove) => {
  return (
    isVerticallyIncrementablePawnPosition(currentPosition) &&
    verticallyIncrementPawnPosition(currentPosition) === move
  );
};

const hasWallAbove = (game: Game, move: PawnMove) => {
  const horizontalCoordinate = getHorizontalCoordinate(move);
  const verticalCoordinate = getVerticalCoordinate(move);
  if (
    (isHorizontalWallCoordinate(horizontalCoordinate) &&
      isVerticalWallCoordinate(verticalCoordinate) &&
      game.board[
        `${horizontalCoordinate}${verticalCoordinate}h` as WallMove
      ]) ||
    (isHorizontallyDecrementablePawnPosition(move) &&
      game.board[`${horizontallyDecrementPawnPosition(move)}h` as WallMove])
  ) {
    return true;
  }
  return false;
};

const isDoubleUpMove = (currentPosition: PawnPosition, move: PawnMove) => {
  return (
    [currentPosition]
      .filter(isVerticallyIncrementablePawnPosition)
      .map(verticallyIncrementPawnPosition)
      .filter(isVerticallyIncrementablePawnPosition)
      .map(verticallyIncrementPawnPosition)[0] === move
  );
};

const hasOpponentAbove = (game: Game, position: PawnMove) => {
  return (
    isVerticallyIncrementablePawnPosition(position) &&
    game.board[verticallyIncrementPawnPosition(position)] ===
      getOppositePlayer(getTurn(game))
  );
};

const isUpLeftMove = (currentPosition: PawnPosition, move: PawnMove) => {
  return (
    [currentPosition]
      .filter(isVerticallyIncrementablePawnPosition)
      .map(verticallyIncrementPawnPosition)
      .filter(isHorizontallyDecrementablePawnPosition)
      .map(horizontallyDecrementPawnPosition)[0] === move
  );
};

export const hasWallToTheRight = (game: Game, move: PawnMove) => {
  const maybeWallPosition = `${move}v`;
  if (
    (isWallPosition(maybeWallPosition) && game.board[maybeWallPosition]) ||
    (isVerticallyDecrementablePawnPosition(move) &&
      game.board[`${verticallyDecrementPawnPosition(move)}v` as WallMove])
  ) {
    return true;
  }
};

const isUpRightMove = (currentPosition: PawnPosition, move: PawnMove) => {
  if (
    getVerticalCoordinate(currentPosition) - getVerticalCoordinate(move) ===
      -1 &&
    letterToNumber(getHorizontalCoordinate(currentPosition)) -
      letterToNumber(getHorizontalCoordinate(move)) ===
      -1
  ) {
    return true;
  }
  return false;
};

// Why do I have this one that is almost identical to the previous one? I don't know.
const isRightUpMove = (currentPosition: PawnPosition, move: PawnMove) => {
  if (
    getVerticalCoordinate(currentPosition) - getVerticalCoordinate(move) ===
      -1 &&
    letterToNumber(getHorizontalCoordinate(currentPosition)) -
      letterToNumber(getHorizontalCoordinate(move)) ===
      -1
  ) {
    return true;
  }
  return false;
};

const hasWallToTheLeft = (game: Game, move: PawnMove) => {
  const horizontalCoordinate = getHorizontalCoordinate(move);
  const verticalCoordinate = getVerticalCoordinate(move);
  if (
    (getVerticalCoordinate(move) < 9 &&
      isDecrementableHorizontalPiecePosition(horizontalCoordinate) &&
      isVerticalWallCoordinate(verticalCoordinate) &&
      game.board[
        `${decrementHorizontalPiecePosition(
          horizontalCoordinate,
        )}${verticalCoordinate}v` as WallMove
      ]) ||
    (getVerticalCoordinate(move) > 1 &&
      isDecrementableHorizontalPiecePosition(horizontalCoordinate) &&
      isDecrementableVerticalPiecePosition(verticalCoordinate) &&
      game.board[
        `${decrementHorizontalPiecePosition(
          horizontalCoordinate,
        )}${decrementVerticalPiecePosition(
          verticalCoordinate,
        )}v` as WallPosition
      ])
  ) {
    return true;
  }
  return false;
};

const isSingleRightMove = (currentPosition: PawnPosition, move: PawnMove) => {
  if (
    letterToNumber(getHorizontalCoordinate(currentPosition)) -
      letterToNumber(getHorizontalCoordinate(move)) ===
      -1 &&
    getVerticalCoordinate(currentPosition) === getVerticalCoordinate(move)
  ) {
    return true;
  }
  return false;
};

const isDoubleRightMove = (currentPosition: PawnPosition, move: PawnMove) => {
  if (
    letterToNumber(getHorizontalCoordinate(currentPosition)) -
      letterToNumber(getHorizontalCoordinate(move)) ===
      -2 &&
    getVerticalCoordinate(currentPosition) === getVerticalCoordinate(move)
  ) {
    return true;
  }
  return false;
};

const hasOpponentToTheRight = (game: Game, position: PawnPosition) => {
  if (
    isHorizontallyIncrementablePawnPosition(position) &&
    game.board[horizontallyIncrementPawnPosition(position)] ===
      getOppositePlayer(getTurn(game))
  ) {
    return true;
  }
  return false;
};

const isRightDownMove = (currentPosition: PawnPosition, move: PawnMove) => {
  if (
    getVerticalCoordinate(currentPosition) - getVerticalCoordinate(move) ===
      1 &&
    letterToNumber(getHorizontalCoordinate(currentPosition)) -
      letterToNumber(getHorizontalCoordinate(move)) ===
      -1
  ) {
    return true;
  }
  return false;
};

export const hasWallBelow = (game: Game, move: PawnMove) => {
  const horizontalCoordinate = getHorizontalCoordinate(move);
  const verticalCoordinate = getVerticalCoordinate(move);
  if (
    (isHorizontalWallCoordinate(horizontalCoordinate) &&
      isDecrementableVerticalPiecePosition(verticalCoordinate) &&
      game.board[
        `${horizontalCoordinate}${decrementVerticalPiecePosition(
          verticalCoordinate,
        )}h` as WallMove
      ]) ||
    (letterToNumber(getHorizontalCoordinate(move)) > 1 &&
      isDecrementableHorizontalPiecePosition(horizontalCoordinate) &&
      isDecrementableVerticalPiecePosition(verticalCoordinate) &&
      game.board[
        `${decrementHorizontalPiecePosition(
          horizontalCoordinate,
        )}${decrementVerticalPiecePosition(verticalCoordinate)}h` as WallMove
      ])
  ) {
    return true;
  }
  return false;
};

const isSingleDownMove = (
  currentPosition: PawnPosition,
  move: PawnPosition,
) => {
  if (
    getVerticalCoordinate(currentPosition) - getVerticalCoordinate(move) ===
      1 &&
    getHorizontalCoordinate(currentPosition) === getHorizontalCoordinate(move)
  ) {
    return true;
  }
  return false;
};

const isDoubleDownMove = (currentPosition: PawnPosition, move: PawnMove) => {
  if (
    getVerticalCoordinate(currentPosition) - getVerticalCoordinate(move) ===
      2 &&
    getHorizontalCoordinate(currentPosition) === getHorizontalCoordinate(move)
  ) {
    return true;
  }
  return false;
};

const hasOpponentBelow = (game: Game, position: PawnPosition) => {
  if (
    isVerticallyDecrementablePawnPosition(position) &&
    game.board[verticallyDecrementPawnPosition(position)] ===
      getOppositePlayer(getTurn(game))
  ) {
    return true;
  }
  return false;
};

const isDownRightMove = (currentPosition: PawnPosition, move: PawnMove) => {
  if (
    getVerticalCoordinate(currentPosition) - getVerticalCoordinate(move) ===
      1 &&
    letterToNumber(getHorizontalCoordinate(currentPosition)) -
      letterToNumber(getHorizontalCoordinate(move)) ===
      -1
  ) {
    return true;
  }
  return false;
};

const isDownLeftMove = (currentPosition: PawnPosition, move: PawnMove) => {
  if (
    getVerticalCoordinate(currentPosition) - getVerticalCoordinate(move) ===
      1 &&
    letterToNumber(getHorizontalCoordinate(currentPosition)) -
      letterToNumber(getHorizontalCoordinate(move)) ===
      1
  ) {
    return true;
  }
  return false;
};

const isSingleLeftMove = (currentPosition: PawnPosition, move: PawnMove) => {
  if (
    letterToNumber(getHorizontalCoordinate(currentPosition)) -
      letterToNumber(getHorizontalCoordinate(move)) ===
      1 &&
    getVerticalCoordinate(currentPosition) === getVerticalCoordinate(move)
  ) {
    return true;
  }
  return false;
};

const isDoubleLeftMove = (currentPosition: PawnPosition, move: PawnMove) => {
  if (
    letterToNumber(getHorizontalCoordinate(currentPosition)) -
      letterToNumber(getHorizontalCoordinate(move)) ===
      2 &&
    getVerticalCoordinate(currentPosition) === getVerticalCoordinate(move)
  ) {
    return true;
  }
  return false;
};

const hasOpponentToTheLeft = (game: Game, position: PawnPosition) => {
  if (
    isHorizontallyDecrementablePawnPosition(position) &&
    game.board[horizontallyDecrementPawnPosition(position)] ===
      getOppositePlayer(getTurn(game))
  ) {
    return true;
  }
  return false;
};

const isLeftDownMove = (currentPosition: PawnPosition, move: PawnMove) => {
  if (
    getVerticalCoordinate(currentPosition) - getVerticalCoordinate(move) ===
      1 &&
    letterToNumber(getHorizontalCoordinate(currentPosition)) -
      letterToNumber(getHorizontalCoordinate(move)) ===
      1
  ) {
    return true;
  }
  return false;
};

// Why do I have isLeftUpMove when I already have isUpLeftMove? I don't know.
const isLeftUpMove = (currentPosition: PawnPosition, move: PawnMove) => {
  if (
    getVerticalCoordinate(currentPosition) - getVerticalCoordinate(move) ===
      -1 &&
    letterToNumber(getHorizontalCoordinate(currentPosition)) -
      letterToNumber(getHorizontalCoordinate(move)) ===
      1
  ) {
    return true;
  }
  return false;
};

const isOnRightmostRow = (move: PawnPosition) => {
  return getHorizontalCoordinate(move) === 'i';
};

const isOnLeftmostRow = (move: PawnPosition) => {
  return getHorizontalCoordinate(move) === 'a';
};

const isOnTopRow = (move: PawnPosition) => {
  return getVerticalCoordinate(move) === 9;
};

const isOnBottomRow = (move: PawnPosition) => {
  return getVerticalCoordinate(move) === 1;
};

export const isValidAStarMove = (
  game: Game,
  currentPosition: PawnPosition,
  move: PawnMove,
) => {
  // If up move
  if (isSingleUpMove(currentPosition, move)) {
    return !hasWallAbove(game, currentPosition);
  }

  // If right move
  if (isSingleRightMove(currentPosition, move)) {
    return !hasWallToTheRight(game, currentPosition);
  }

  // If down move
  if (isSingleDownMove(currentPosition, move)) {
    return !hasWallBelow(game, currentPosition);
  }

  // If left move
  if (isSingleLeftMove(currentPosition, move)) {
    return !hasWallToTheLeft(game, currentPosition);
  }

  return false;
};

export const isValidNormalMove = (
  game: Game,
  currentPosition: PawnPosition,
  move: PawnMove,
) => {
  // If the move lands on top of the opponent
  if (game.board[move] === getOppositePlayer(getTurn(game))) {
    return false;
  }

  // If up move
  if (isSingleUpMove(currentPosition, move)) {
    if (hasWallAbove(game, currentPosition)) return false;
    return true;
  }
  if (
    isDoubleUpMove(currentPosition, move) &&
    hasOpponentAbove(game, currentPosition)
  ) {
    if (hasWallAbove(game, currentPosition)) return false;
    if (
      isVerticallyIncrementablePawnPosition(currentPosition) &&
      hasWallAbove(game, verticallyIncrementPawnPosition(currentPosition))
    ) {
      return false;
    }
    return true;
  }
  if (
    isUpLeftMove(currentPosition, move) &&
    hasOpponentAbove(game, currentPosition)
  ) {
    if (
      isVerticallyIncrementablePawnPosition(currentPosition) &&
      !hasWallAbove(game, verticallyIncrementPawnPosition(currentPosition)) &&
      !isOnTopRow(verticallyIncrementPawnPosition(currentPosition))
    ) {
      return false;
    }
    if (hasWallAbove(game, currentPosition)) return false;
    if (
      isVerticallyIncrementablePawnPosition(currentPosition) &&
      hasWallToTheRight(game, verticallyIncrementPawnPosition(currentPosition))
    ) {
      return false;
    }
    return true;
  }
  if (
    isUpRightMove(currentPosition, move) &&
    hasOpponentAbove(game, currentPosition)
  ) {
    if (
      isVerticallyIncrementablePawnPosition(currentPosition) &&
      !hasWallAbove(game, verticallyIncrementPawnPosition(currentPosition)) &&
      !isOnTopRow(verticallyIncrementPawnPosition(currentPosition))
    ) {
      return false;
    }
    if (hasWallAbove(game, currentPosition)) return false;
    if (
      isHorizontallyDecrementablePawnPosition(currentPosition) &&
      hasWallToTheLeft(game, horizontallyDecrementPawnPosition(currentPosition))
    ) {
      return false;
    }
    return true;
  }

  // If right move
  if (isSingleRightMove(currentPosition, move)) {
    if (hasWallToTheRight(game, currentPosition)) return false;
    return true;
  }
  if (
    isDoubleRightMove(currentPosition, move) &&
    hasOpponentToTheRight(game, currentPosition)
  ) {
    if (hasWallToTheRight(game, currentPosition)) return false;
    if (
      isHorizontallyIncrementablePawnPosition(currentPosition) &&
      hasWallToTheRight(
        game,
        horizontallyIncrementPawnPosition(currentPosition),
      )
    ) {
      return false;
    }
    return true;
  }
  if (
    isRightUpMove(currentPosition, move) &&
    hasOpponentToTheRight(game, currentPosition)
  ) {
    if (
      isHorizontallyIncrementablePawnPosition(currentPosition) &&
      !hasWallToTheRight(
        game,
        horizontallyIncrementPawnPosition(currentPosition),
      ) &&
      !isOnRightmostRow(horizontallyIncrementPawnPosition(currentPosition))
    ) {
      return false;
    }
    if (hasWallToTheRight(game, currentPosition)) return false;
    if (
      isHorizontallyIncrementablePawnPosition(currentPosition) &&
      hasWallAbove(game, horizontallyIncrementPawnPosition(currentPosition))
    ) {
      return false;
    }
    return true;
  }
  if (
    isRightDownMove(currentPosition, move) &&
    hasOpponentToTheRight(game, currentPosition)
  ) {
    if (
      isHorizontallyIncrementablePawnPosition(currentPosition) &&
      !hasWallToTheRight(
        game,
        horizontallyIncrementPawnPosition(currentPosition),
      ) &&
      !isOnRightmostRow(horizontallyIncrementPawnPosition(currentPosition))
    ) {
      return false;
    }
    if (hasWallToTheRight(game, currentPosition)) return false;
    if (
      isHorizontallyIncrementablePawnPosition(currentPosition) &&
      hasWallBelow(game, horizontallyIncrementPawnPosition(currentPosition))
    ) {
      return false;
    }
    return true;
  }

  // If down move
  if (isSingleDownMove(currentPosition, move)) {
    if (hasWallBelow(game, currentPosition)) {
      return false;
    }
    return true;
  }
  if (
    isDoubleDownMove(currentPosition, move) &&
    hasOpponentBelow(game, currentPosition)
  ) {
    if (hasWallBelow(game, currentPosition)) return false;
    if (
      isVerticallyDecrementablePawnPosition(currentPosition) &&
      hasWallBelow(game, verticallyDecrementPawnPosition(currentPosition))
    ) {
      return false;
    }
    return true;
  }
  if (
    isDownRightMove(currentPosition, move) &&
    hasOpponentBelow(game, currentPosition)
  ) {
    if (
      isVerticallyDecrementablePawnPosition(currentPosition) &&
      !hasWallBelow(game, verticallyDecrementPawnPosition(currentPosition)) &&
      !isOnBottomRow(verticallyDecrementPawnPosition(currentPosition))
    ) {
      return false;
    }
    if (hasWallBelow(game, currentPosition)) return false;
    if (
      isVerticallyDecrementablePawnPosition(currentPosition) &&
      hasWallToTheRight(
        game,
        verticallyDecrementPawnPosition(currentPosition),
      ) &&
      !isOnBottomRow(verticallyDecrementPawnPosition(currentPosition))
    ) {
      return false;
    }
    return true;
  }
  if (
    isDownLeftMove(currentPosition, move) &&
    hasOpponentBelow(game, currentPosition)
  ) {
    if (
      isVerticallyDecrementablePawnPosition(currentPosition) &&
      !hasWallBelow(game, verticallyDecrementPawnPosition(currentPosition)) &&
      !isOnBottomRow(verticallyDecrementPawnPosition(currentPosition))
    ) {
      return false;
    }
    if (hasWallBelow(game, currentPosition)) return false;
    if (
      isVerticallyDecrementablePawnPosition(currentPosition) &&
      hasWallToTheLeft(game, verticallyDecrementPawnPosition(currentPosition))
    ) {
      return false;
    }
    return true;
  }

  // If left move
  if (isSingleLeftMove(currentPosition, move)) {
    if (hasWallToTheLeft(game, currentPosition)) return false;
    return true;
  }
  if (
    isDoubleLeftMove(currentPosition, move) &&
    hasOpponentToTheLeft(game, currentPosition)
  ) {
    if (hasWallToTheLeft(game, currentPosition)) return false;
    if (
      isHorizontallyDecrementablePawnPosition(currentPosition) &&
      hasWallToTheLeft(game, horizontallyDecrementPawnPosition(currentPosition))
    ) {
      return false;
    }
    return true;
  }
  if (
    isLeftDownMove(currentPosition, move) &&
    hasOpponentToTheLeft(game, currentPosition)
  ) {
    if (
      isHorizontallyDecrementablePawnPosition(currentPosition) &&
      !hasWallToTheLeft(
        game,
        horizontallyDecrementPawnPosition(currentPosition),
      ) &&
      !isOnLeftmostRow(horizontallyDecrementPawnPosition(currentPosition))
    ) {
      return false;
    }
    if (hasWallToTheLeft(game, currentPosition)) return false;
    if (
      isHorizontallyDecrementablePawnPosition(currentPosition) &&
      hasWallBelow(game, horizontallyDecrementPawnPosition(currentPosition))
    ) {
      return false;
    }
    return true;
  }
  if (
    isLeftUpMove(currentPosition, move) &&
    hasOpponentToTheLeft(game, currentPosition)
  ) {
    if (
      isHorizontallyDecrementablePawnPosition(currentPosition) &&
      !hasWallToTheLeft(
        game,
        horizontallyDecrementPawnPosition(currentPosition),
      ) &&
      !isOnLeftmostRow(horizontallyDecrementPawnPosition(currentPosition))
    ) {
      return false;
    }
    if (hasWallToTheLeft(game, currentPosition)) return false;
    if (
      isHorizontallyDecrementablePawnPosition(currentPosition) &&
      hasWallAbove(game, horizontallyDecrementPawnPosition(currentPosition))
    ) {
      return false;
    }
    return true;
  }

  return false;
};

export const getShortestPathWithNoObstacles = (
  game: Game,
  player: Player,
): PawnPosition[] => {
  const playerPosition = game.playerPositions[player].position;
  const shortestPathVerticalCoordinates =
    player === 1
      ? verticalPiecePositions.slice(getVerticalCoordinate(playerPosition) - 1)
      : verticalPiecePositions
          .slice(0, getVerticalCoordinate(playerPosition))
          .reverse();
  return shortestPathVerticalCoordinates.map(
    (y) => `${getHorizontalCoordinate(playerPosition)}${y}` as PawnPosition,
  );
};

export const doesHorizontalWallBlockPlayer = (
  game: Game,
  player: Player,
  horizontalWall: WallPosition,
) => {
  const playerX = getHorizontalCoordinate(
    game.playerPositions[player].position,
  );
  const playerY = getVerticalCoordinate(game.playerPositions[player].position);
  const wallX = getHorizontalCoordinate(horizontalWall);
  const wallY = getVerticalCoordinate(horizontalWall);
  const wallOverlapsWithPlayerColumn =
    playerX === wallX ||
    (isIncrementableHorizontalWallCoordinate(wallX) &&
      playerX === incrementHorizontalWallCoordinate(wallX));
  if (!wallOverlapsWithPlayerColumn) return false;
  if (player === 1) {
    return wallY >= playerY;
  }
  return wallY < playerY;
};

export const verticallyIncrementPawnPosition = (
  position: VerticallyIncrementablePawnPosition,
): PawnPosition => {
  return verticallyIncrementedPawnPositions[position];
};

export const isVerticallyIncrementablePawnPosition = (
  position: PawnPosition,
): position is VerticallyIncrementablePawnPosition => {
  return verticallyIncrementablePositions.has(position);
};

export const verticallyDecrementPawnPosition = (
  position: VerticallyDecrementablePawnPosition,
): PawnPosition => {
  return verticallyDecrementedPawnPositions[position];
};

export const isVerticallyDecrementablePawnPosition = (
  position: PawnPosition,
): position is VerticallyDecrementablePawnPosition => {
  return verticallyDecrementablePositions.has(position);
};

export const horizontallyIncrementPawnPosition = (
  position: HorizontallyIncrementablePawnPosition,
): PawnPosition => {
  return horizontallyIncrementedPawnPositions[position];
};

export const isHorizontallyIncrementablePawnPosition = (
  position: PawnPosition,
): position is HorizontallyIncrementablePawnPosition => {
  return horizontallyIncrementablePositions.has(position);
};

export const horizontallyDecrementPawnPosition = (
  position: HorizontallyDecrementablePawnPosition,
): PawnPosition => {
  return horizontallyDecrementedPawnPositions[position];
};

export const isHorizontallyDecrementablePawnPosition = (
  position: PawnPosition,
): position is HorizontallyDecrementablePawnPosition => {
  return horizontallyDecrementablePositions.has(position);
};

export const getPositionFromNorthMove = (currentPosition: PawnPosition) => {
  return moveUpMap[currentPosition] ?? null;
};

export const getPositionFromNorthNorthMove = (
  currentPosition: PawnPosition,
) => {
  return moveUpUpMap[currentPosition] ?? null;
};

export const getPositionFromNorthEastMove = (currentPosition: PawnPosition) => {
  return moveUpRightMap[currentPosition] ?? null;
};

export const getPositionFromEastMove = (currentPosition: PawnPosition) => {
  return moveRightMap[currentPosition] ?? null;
};

export const getPositionFromEastEastMove = (currentPosition: PawnPosition) => {
  return moveRightRightMap[currentPosition] ?? null;
};

export const getPositionFromSouthEastMove = (currentPosition: PawnPosition) => {
  return moveDownRightMap[currentPosition] ?? null;
};

export const getPositionFromSouthMove = (currentPosition: PawnPosition) => {
  return moveDownMap[currentPosition] ?? null;
};

export const getPositionFromSouthSouthMove = (
  currentPosition: PawnPosition,
) => {
  return moveDownDownMap[currentPosition] ?? null;
};

export const getPositionFromSouthWestMove = (currentPosition: PawnPosition) => {
  return [currentPosition]
    .filter(isVerticallyDecrementablePawnPosition)
    .map(verticallyDecrementPawnPosition)
    .filter(isHorizontallyDecrementablePawnPosition)
    .map(horizontallyDecrementPawnPosition)[0];
};

export const getPositionFromWestWestMove = (currentPosition: PawnPosition) => {
  return moveLeftLeftMap[currentPosition] ?? null;
};

export const getPositionFromWestMove = (currentPosition: PawnPosition) => {
  return moveLeftMap[currentPosition] ?? null;
};

export const getPositionFromNorthWestMove = (currentPosition: PawnPosition) => {
  return [currentPosition]
    .filter(isHorizontallyIncrementablePawnPosition)
    .map(horizontallyIncrementPawnPosition)
    .filter(isHorizontallyDecrementablePawnPosition)
    .map(horizontallyDecrementPawnPosition)[0];
};

export const getValidPawnMoveArray = (game: Game) => {
  const currentPosition = game.playerPositions[getTurn(game)].position;
  const unvalidatedPawnMoveArray = [
    getPositionFromNorthMove(currentPosition),
    getPositionFromEastMove(currentPosition),
    getPositionFromWestMove(currentPosition),
    getPositionFromSouthMove(currentPosition),
  ];
  // This can be extended to also check if the players are next to each other
  const includeMovesOverOpponent = game.pastMoves.length >= 7;
  if (includeMovesOverOpponent) {
    unvalidatedPawnMoveArray.concat([
      getPositionFromNorthNorthMove(currentPosition),
      getPositionFromNorthEastMove(currentPosition),
      getPositionFromNorthWestMove(currentPosition),
      getPositionFromEastEastMove(currentPosition),
      getPositionFromWestWestMove(currentPosition),
      getPositionFromSouthEastMove(currentPosition),
      getPositionFromSouthWestMove(currentPosition),
      getPositionFromSouthSouthMove(currentPosition),
    ]);
  }
  const validPawnMoveArray = unvalidatedPawnMoveArray.filter(
    (newPosition) =>
      newPosition && isValidNormalMove(game, currentPosition, newPosition),
  ) as PawnPosition[];
  return validPawnMoveArray;
};

const overlapsWall = (game: Game, wallMove: WallMove) => {
  const numberOfPlacedWalls = getNumberOfPlacedWalls(game);
  if (numberOfPlacedWalls === 0) return false;
  const x = getHorizontalCoordinate(wallMove) as HorizontalWallCoordinate;
  const y = getVerticalCoordinate(wallMove) as VerticalWallCoordinate;
  if (isHorizontalWallMove(wallMove)) {
    // A horizontal wall
    if (
      game.board[wallMove] ||
      game.board[rotateWall(wallMove)] ||
      (isHorizontallyDecrementableWallPosition(wallMove) &&
        game.board[moveWallLeft(wallMove)]) ||
      (isHorizontallyIncrementableWallPosition(wallMove) &&
        game.board[moveWallRight(wallMove)])
    ) {
      return true;
    }
  }
  if (isVerticalWallMove(wallMove)) {
    if (
      game.board[rotateWall(wallMove)] ||
      game.board[wallMove] ||
      (isVerticallyDecrementableWallPosition(wallMove) &&
        game.board[moveWallDown(wallMove)]) ||
      (isVerticallyIncrementableWallPosition(wallMove) &&
        game.board[moveWallUp(wallMove)])
    ) {
      return true;
    }
  }
  return false;
};

const moveWallRight = (
  wall: HorizontallyIncrementableWallPosition,
): WallPosition => {
  const x = wall.charAt(0) as IncrementableHorizontalWallCoordinate;
  const newX = incrementHorizontalWallCoordinate(x);
  return `${newX}${wall.substring(1)}` as WallPosition;
};

export const moveWallLeft = (
  wall: HorizontallyDecrementableWallPosition,
): WallPosition => {
  const x = wall.charAt(0) as DecrementableHorizontalWallCoordinate;
  const newX = decrementHorizontalWallCoordinate(x);
  return `${newX}${wall.substring(1)}` as WallPosition;
};

const moveWallUp = (
  wall: VerticallyIncrementableWallPosition,
): WallPosition => {
  const y = Number(wall.charAt(1)) as IncrementableVerticalWallCoordinate;
  const newY = incrementVerticalWallCoordinate(y);
  return `${wall.charAt(0)}${newY}${wall.charAt(2)}` as WallPosition;
};

export const moveWallDown = (
  wall: VerticallyDecrementableWallPosition,
): WallPosition => {
  const y = Number(wall.charAt(1)) as DecrementableVerticalWallCoordinate;
  const newY = decrementVerticalWallCoordinate(y);
  return `${wall.charAt(0)}${newY}${wall.charAt(2)}` as WallPosition;
};

const rotateWall = (wall: WallPosition): WallPosition => {
  return `${wall.substring(0, 2)}${
    wall.charAt(2) === 'v' ? 'h' : 'v'
  }` as WallPosition;
};

const doesHorizontalWallHaveVerticalWallAboveRight = (
  game: Game,
  wallMove: WallMove,
) => {
  const verticalWallAboveRight = [wallMove]
    .filter(isHorizontallyIncrementableWallPosition)
    .map(moveWallRight)
    .map(rotateWall)
    .filter(isVerticallyIncrementableWallPosition)
    .map(moveWallUp)[0];
  if (!verticalWallAboveRight) return false;
  return game.board[
    `${getHorizontalCoordinate(verticalWallAboveRight)}${getVerticalCoordinate(
      verticalWallAboveRight,
    )}${getWallOrientation(verticalWallAboveRight)}` as WallPosition
  ];
};

const doesHorizontalWallHaveVerticalWallAboveLeft = (
  game: Game,
  wallMove: WallMove,
) => {
  const verticalWallAboveLeft = [wallMove]
    .filter(isHorizontallyDecrementableWallPosition)
    .map(moveWallLeft)
    .map(rotateWall)
    .filter(isVerticallyIncrementableWallPosition)
    .map(moveWallUp)[0];
  if (!verticalWallAboveLeft) return false;
  return game.board[
    `${getHorizontalCoordinate(verticalWallAboveLeft)}${getVerticalCoordinate(
      verticalWallAboveLeft,
    )}${getWallOrientation(verticalWallAboveLeft)}` as WallPosition
  ];
};

const doesHorizontalWallHaveVerticalWallBelowRight = (
  game: Game,
  wallMove: WallMove,
) => {
  const verticalWallBelowRight = [wallMove]
    .filter(isHorizontallyIncrementableWallPosition)
    .map(moveWallRight)
    .map(rotateWall)
    .filter(isVerticallyDecrementableWallPosition)
    .map(moveWallDown)[0];
  if (!verticalWallBelowRight) return false;
  return game.board[
    `${getHorizontalCoordinate(verticalWallBelowRight)}${getVerticalCoordinate(
      verticalWallBelowRight,
    )}${getWallOrientation(verticalWallBelowRight)}` as WallPosition
  ];
};

const doesHorizontalWallHaveVerticalWallBelowLeft = (
  game: Game,
  wallMove: WallMove,
) => {
  const verticalWallBelowLeft = [wallMove]
    .filter(isHorizontallyDecrementableWallPosition)
    .map(moveWallLeft)
    .map(rotateWall)
    .filter(isVerticallyDecrementableWallPosition)
    .map(moveWallDown)[0];
  if (!verticalWallBelowLeft) return false;
  return game.board[
    `${getHorizontalCoordinate(verticalWallBelowLeft)}${getVerticalCoordinate(
      verticalWallBelowLeft,
    )}${getWallOrientation(verticalWallBelowLeft)}` as WallPosition
  ];
};

const doesHorizontalWallHaveHorizontalWallRight = (
  game: Game,
  wallMove: WallMove,
) => {
  const horizontalWallRight = [wallMove]
    .filter(isHorizontallyIncrementableWallPosition)
    .map(moveWallRight)
    .filter(isHorizontallyIncrementableWallPosition)
    .map(moveWallRight)[0];
  if (!horizontalWallRight) return false;
  return game.board[
    `${getHorizontalCoordinate(horizontalWallRight)}${getVerticalCoordinate(
      horizontalWallRight,
    )}${getWallOrientation(horizontalWallRight)}` as WallPosition
  ];
};

const doesHorizontalWallHaveHorizontalWallLeft = (
  game: Game,
  wallMove: WallMove,
) => {
  const horizontalWallLeft = [wallMove]
    .filter(isHorizontallyDecrementableWallPosition)
    .map(moveWallLeft)
    .filter(isHorizontallyDecrementableWallPosition)
    .map(moveWallLeft)[0];
  if (!horizontalWallLeft) return false;
  return game.board[
    `${getHorizontalCoordinate(horizontalWallLeft)}${getVerticalCoordinate(
      horizontalWallLeft,
    )}${getWallOrientation(horizontalWallLeft)}` as WallPosition
  ];
};

const doesHorizontalWallHaveVerticalWallAbove = (
  game: Game,
  wallMove: WallMove,
) => {
  const verticalWallAbove = [wallMove]
    .filter(isVerticallyIncrementableWallPosition)
    .map(moveWallUp)
    .map(rotateWall)[0];
  if (!verticalWallAbove) return false;
  return game.board[
    `${getHorizontalCoordinate(verticalWallAbove)}${getVerticalCoordinate(
      verticalWallAbove,
    )}${getWallOrientation(verticalWallAbove)}` as WallPosition
  ];
};

const doesHorizontalWallHaveVerticalWallBelow = (
  game: Game,
  wallMove: WallMove,
) => {
  const verticalWallBelow = [wallMove]
    .filter(isVerticallyDecrementableWallPosition)
    .map(moveWallDown)
    .map(rotateWall)[0];
  if (!verticalWallBelow) return false;
  return game.board[
    `${getHorizontalCoordinate(verticalWallBelow)}${getVerticalCoordinate(
      verticalWallBelow,
    )}${getWallOrientation(verticalWallBelow)}` as WallPosition
  ];
};

const doesVerticalWallHaveHorizontalWallAboveRight = (
  game: Game,
  wallMove: WallMove,
) => {
  const horizontalWallAboveRight = [wallMove]
    .filter(isHorizontallyIncrementableWallPosition)
    .map(moveWallRight)
    .map(rotateWall)
    .filter(isVerticallyIncrementableWallPosition)
    .map(moveWallUp)[0];
  if (!horizontalWallAboveRight) return false;
  return game.board[
    `${getHorizontalCoordinate(
      horizontalWallAboveRight,
    )}${getVerticalCoordinate(horizontalWallAboveRight)}${getWallOrientation(
      horizontalWallAboveRight,
    )}` as WallPosition
  ];
};

const doesVerticalWallHaveHorizontalWallAboveLeft = (
  game: Game,
  wallMove: WallMove,
) => {
  const horizontalWallAboveLeft = [wallMove]
    .filter(isHorizontallyDecrementableWallPosition)
    .map(moveWallLeft)
    .map(rotateWall)
    .filter(isVerticallyIncrementableWallPosition)
    .map(moveWallUp)[0];
  if (!horizontalWallAboveLeft) return false;
  return game.board[
    `${getHorizontalCoordinate(horizontalWallAboveLeft)}${getVerticalCoordinate(
      horizontalWallAboveLeft,
    )}${getWallOrientation(horizontalWallAboveLeft)}` as WallPosition
  ];
};

const doesVerticalWallHaveHorizontalWallBelowRight = (
  game: Game,
  wallMove: WallMove,
) => {
  const horizontalWallBelowRight = [wallMove]
    .filter(isHorizontallyIncrementableWallPosition)
    .map(moveWallRight)
    .map(rotateWall)
    .filter(isVerticallyDecrementableWallPosition)
    .map(moveWallDown)[0];
  if (!horizontalWallBelowRight) return false;
  return game.board[
    `${getHorizontalCoordinate(
      horizontalWallBelowRight,
    )}${getVerticalCoordinate(horizontalWallBelowRight)}${getWallOrientation(
      horizontalWallBelowRight,
    )}` as WallPosition
  ];
};

const doesVerticalWallHaveHorizontalWallBelowLeft = (
  game: Game,
  wallMove: WallMove,
) => {
  const horizontalWallBelowLeft = [wallMove]
    .filter(isHorizontallyDecrementableWallPosition)
    .map(moveWallLeft)
    .map(rotateWall)
    .filter(isVerticallyDecrementableWallPosition)
    .map(moveWallDown)[0];
  if (!horizontalWallBelowLeft) return false;
  return game.board[
    `${getHorizontalCoordinate(horizontalWallBelowLeft)}${getVerticalCoordinate(
      horizontalWallBelowLeft,
    )}${getWallOrientation(horizontalWallBelowLeft)}` as WallPosition
  ];
};

const doesVerticalWallHaveVerticalWallAbove = (
  game: Game,
  wallMove: WallMove,
) => {
  const verticalWallAbove = [wallMove]
    .filter(isVerticallyIncrementableWallPosition)
    .map(moveWallUp)
    .filter(isVerticallyIncrementableWallPosition)
    .map(moveWallUp)[0];
  if (!verticalWallAbove) return false;
  return game.board[
    `${getHorizontalCoordinate(verticalWallAbove)}${getVerticalCoordinate(
      verticalWallAbove,
    )}${getWallOrientation(verticalWallAbove)}` as WallPosition
  ];
};

const doesVerticalWallHaveVerticalWallBelow = (
  game: Game,
  wallMove: WallMove,
) => {
  const verticalWallBelow = [wallMove]
    .filter(isVerticallyDecrementableWallPosition)
    .map(moveWallDown)
    .filter(isVerticallyDecrementableWallPosition)
    .map(moveWallDown)[0];
  if (!verticalWallBelow) return false;
  return game.board[
    `${getHorizontalCoordinate(verticalWallBelow)}${getVerticalCoordinate(
      verticalWallBelow,
    )}${getWallOrientation(verticalWallBelow)}` as WallPosition
  ];
};

const doesVerticalWallHaveHorizontalWallAbove = (
  game: Game,
  wallMove: WallMove,
) => {
  const horizontalWallAbove = [wallMove]
    .filter(isVerticallyIncrementableWallPosition)
    .map(moveWallUp)
    .map(rotateWall)[0];
  if (!horizontalWallAbove) return false;
  return game.board[
    `${getHorizontalCoordinate(horizontalWallAbove)}${getVerticalCoordinate(
      horizontalWallAbove,
    )}${getWallOrientation(horizontalWallAbove)}` as WallPosition
  ];
};

const doesVerticalWallHaveHorizontalWallBelow = (
  game: Game,
  wallMove: WallMove,
) => {
  const horizontalWallBelow = [wallMove]
    .filter(isVerticallyDecrementableWallPosition)
    .map(moveWallDown)
    .map(rotateWall)[0];
  if (!horizontalWallBelow) return false;
  return game.board[
    `${getHorizontalCoordinate(horizontalWallBelow)}${getVerticalCoordinate(
      horizontalWallBelow,
    )}${getWallOrientation(horizontalWallBelow)}` as WallPosition
  ];
};

const doesHorizontalWallHaveBoardEdgeRight = (wallMove: WallMove) => {
  return getHorizontalCoordinate(wallMove) === 'h';
};

const doesHorizontalWallHaveBoardEdgeLeft = (wallMove: WallMove) => {
  return getHorizontalCoordinate(wallMove) === 'a';
};

const doesVerticalWallHaveBoardEdgeAbove = (wallMove: WallMove) => {
  return getVerticalCoordinate(wallMove) === 8;
};

const doesVerticalWallHaveBoardEdgeBelow = (wallMove: WallMove) => {
  return getVerticalCoordinate(wallMove) === 1;
};

export const getNumberOfNeighborWalls = (game: Game, wallMove: WallMove) => {
  if (isHorizontalWallMove(wallMove)) {
    return [
      doesHorizontalWallHaveVerticalWallAboveRight(game, wallMove),
      doesHorizontalWallHaveVerticalWallAboveLeft(game, wallMove),
      doesHorizontalWallHaveVerticalWallBelowRight(game, wallMove),
      doesHorizontalWallHaveVerticalWallBelowLeft(game, wallMove),
      doesHorizontalWallHaveHorizontalWallRight(game, wallMove),
      doesHorizontalWallHaveHorizontalWallLeft(game, wallMove),
      doesHorizontalWallHaveVerticalWallAbove(game, wallMove),
      doesHorizontalWallHaveVerticalWallBelow(game, wallMove),
      doesHorizontalWallHaveBoardEdgeRight(wallMove),
      doesHorizontalWallHaveBoardEdgeLeft(wallMove),
    ].filter(Boolean).length;
  }
  // isVerticalWallMove
  return [
    doesVerticalWallHaveHorizontalWallAboveRight(game, wallMove),
    doesVerticalWallHaveHorizontalWallAboveLeft(game, wallMove),
    doesVerticalWallHaveHorizontalWallBelowRight(game, wallMove),
    doesVerticalWallHaveHorizontalWallBelowLeft(game, wallMove),
    doesVerticalWallHaveVerticalWallAbove(game, wallMove),
    doesVerticalWallHaveVerticalWallBelow(game, wallMove),
    doesVerticalWallHaveHorizontalWallAbove(game, wallMove),
    doesVerticalWallHaveHorizontalWallBelow(game, wallMove),
    doesVerticalWallHaveBoardEdgeAbove(wallMove),
    doesVerticalWallHaveBoardEdgeBelow(wallMove),
  ].filter(Boolean).length;
};

const isWallAdjacentToPosition = (wall: WallPosition, pawn: PawnPosition) => {
  const wallX = getHorizontalCoordinate(wall);
  const wallY = getVerticalCoordinate(wall);
  const wallOrientation = getWallOrientation(wall);
  const pawnX = getHorizontalCoordinate(pawn);
  const pawnY = getVerticalCoordinate(pawn);

  // ––
  //   x
  if (
    wallOrientation === 'h' &&
    [wallX]
      .filter(isIncrementableHorizontalWallCoordinate)
      .map(incrementHorizontalWallCoordinate)
      .filter(isIncrementableHorizontalWallCoordinate)
      .map(incrementHorizontalWallCoordinate)[0] === pawnX &&
    wallY === pawnY
  ) {
    return true;
  }

  //  ––
  //   x
  if (
    wallOrientation === 'h' &&
    [wallX]
      .filter(isIncrementableHorizontalWallCoordinate)
      .map(incrementHorizontalWallCoordinate)[0] === pawnX &&
    wallY === pawnY
  ) {
    return true;
  }

  //   ––
  //   x
  if (wallOrientation === 'h' && wallX === pawnX && wallY === pawnY)
    if (
      wallOrientation === 'h' &&
      [wallX]
        .filter(isDecrementableHorizontalWallCoordinate)
        .map(decrementHorizontalWallCoordinate)[0] === pawnX &&
      wallY === pawnY
    ) {
      //    ––
      //   x
      return true;
    }

  //  |
  //  |
  //   x
  if (
    wallOrientation === 'v' &&
    [wallX]
      .filter(isIncrementableHorizontalWallCoordinate)
      .map(incrementHorizontalWallCoordinate)[0] === pawnX &&
    [wallY]
      .filter(isDecrementableVerticalWallCoordinate)
      .map(decrementVerticalWallCoordinate)[0] === pawnY
  ) {
    return true;
  }

  //  |
  //  |x
  if (
    wallOrientation === 'v' &&
    [wallX]
      .filter(isIncrementableHorizontalWallCoordinate)
      .map(incrementHorizontalWallCoordinate)[0] === pawnX &&
    wallY === pawnY
  ) {
    return true;
  }

  //  |x
  //  |
  if (
    wallOrientation === 'v' &&
    [wallX]
      .filter(isIncrementableHorizontalWallCoordinate)
      .map(incrementHorizontalWallCoordinate)[0] === pawnX &&
    [wallY]
      .filter(isIncrementableVerticalWallCoordinate)
      .map(incrementVerticalWallCoordinate)[0] === pawnY
  ) {
    return true;
  }

  //   x
  //  |
  //  |
  if (
    wallOrientation === 'v' &&
    [wallX]
      .filter(isIncrementableHorizontalWallCoordinate)
      .map(incrementHorizontalWallCoordinate)[0] === pawnX &&
    [wallY]
      .filter(isIncrementableVerticalWallCoordinate)
      .map(incrementVerticalWallCoordinate)
      .filter(isIncrementableVerticalWallCoordinate)
      .map(incrementVerticalWallCoordinate)[0] === pawnY
  ) {
    return true;
  }

  //    |
  //    |
  //   x
  if (
    wallOrientation === 'v' &&
    wallX === pawnX &&
    [wallY]
      .filter(isDecrementableVerticalWallCoordinate)
      .map(decrementVerticalWallCoordinate)[0] === pawnY
  ) {
    return true;
  }

  //    |
  //   x|
  if (wallOrientation === 'v' && wallX === pawnX && wallY === pawnY) {
    return true;
  }

  //   x|
  //    |
  if (
    wallOrientation === 'v' &&
    wallX === pawnX &&
    [wallY]
      .filter(isIncrementableVerticalWallCoordinate)
      .map(incrementVerticalWallCoordinate)[0] === pawnY
  ) {
    return true;
  }

  //   x
  //    |
  //    |
  if (
    wallOrientation === 'v' &&
    wallX === pawnX &&
    [wallY]
      .filter(isIncrementableVerticalWallCoordinate)
      .map(incrementVerticalWallCoordinate)
      .filter(isIncrementableVerticalWallCoordinate)
      .map(incrementVerticalWallCoordinate)[0] === pawnY
  ) {
    return true;
  }

  //   x
  // ––
  if (
    wallOrientation === 'h' &&
    [wallX]
      .filter(isIncrementableHorizontalWallCoordinate)
      .map(incrementHorizontalWallCoordinate)
      .filter(isIncrementableHorizontalWallCoordinate)
      .map(incrementHorizontalWallCoordinate)[0] === pawnX &&
    [wallY]
      .filter(isIncrementableVerticalWallCoordinate)
      .map(incrementVerticalWallCoordinate)[0] === pawnY
  ) {
    return true;
  }

  //   x
  //  ––
  if (
    wallOrientation === 'h' &&
    [wallX]
      .filter(isIncrementableHorizontalWallCoordinate)
      .map(incrementHorizontalWallCoordinate)[0] === pawnX &&
    [wallY]
      .filter(isIncrementableVerticalWallCoordinate)
      .map(incrementVerticalWallCoordinate)[0] === pawnY
  ) {
    return true;
  }

  //   x
  //   ––
  if (
    wallOrientation === 'h' &&
    wallX === pawnX &&
    [wallY]
      .filter(isIncrementableVerticalWallCoordinate)
      .map(incrementVerticalWallCoordinate)[0] === pawnY
  ) {
    return true;
  }

  //   x
  //    ––
  if (
    wallOrientation === 'h' &&
    [wallX]
      .filter(isDecrementableHorizontalWallCoordinate)
      .map(decrementHorizontalWallCoordinate)[0] === pawnX &&
    [wallY]
      .filter(isIncrementableVerticalWallCoordinate)
      .map(incrementVerticalWallCoordinate)[0] === pawnY
  ) {
    return true;
  }
  return false;
};

export const isWallAdjacentToAtLeastOnePawn = (
  game: Game,
  wall: WallPosition,
) => {
  const player1Position = game.playerPositions[1].position;
  const player2Position = game.playerPositions[2].position;
  return (
    isWallAdjacentToPosition(wall, player1Position) ||
    isWallAdjacentToPosition(wall, player2Position)
  );
};

const doesWallMoveHaveSameDirectionAsAllPreviousWallMoves = (
  game: Game,
  wallMove: WallMove,
) => {
  const pastWallMoves = game.pastMoves.filter(isWallPosition);
  const orientation = getWallOrientation(wallMove);
  return orientation === 'h'
    ? pastWallMoves.every(isHorizontalWallMove)
    : pastWallMoves.every(isVerticalWallMove);
};

export const isHorizontalWallCoordinate = (
  horizontalPosition: HorizontalPiecePosition | HorizontalWallCoordinate,
): horizontalPosition is HorizontalWallCoordinate => {
  return isHorizontalWallCoordinateMap[horizontalPosition];
};

export const isVerticalWallCoordinate = (
  verticalPosition: VerticalPiecePosition | VerticalWallCoordinate,
): verticalPosition is VerticalWallCoordinate => {
  return isVerticalWallCoordinateMap[verticalPosition];
};

const isIncrementableHorizontalWallCoordinate = (
  horizontalPosition: HorizontalPiecePosition | HorizontalWallCoordinate,
): horizontalPosition is IncrementableHorizontalWallCoordinate => {
  return isIncrementableHorizontalWallCoordinateMap[horizontalPosition];
};

export const isDecrementableHorizontalWallCoordinate = (
  horizontalPosition: HorizontalPiecePosition | HorizontalWallCoordinate,
): horizontalPosition is DecrementableHorizontalWallCoordinate => {
  return isDecrementableHorizontalWallCoordinateMap[horizontalPosition];
};

const isIncrementableVerticalWallCoordinate = (
  horizontalPosition: VerticalPiecePosition | VerticalWallCoordinate,
): horizontalPosition is IncrementableVerticalWallCoordinate => {
  return isIncrementableVerticalWallCoordinateMap[horizontalPosition];
};

export const isDecrementableVerticalWallCoordinate = (
  horizontalPosition: VerticalPiecePosition | VerticalWallCoordinate,
): horizontalPosition is DecrementableVerticalWallCoordinate => {
  return isDecrementableVerticalWallCoordinateMap[horizontalPosition];
};

const isHorizontallyIncrementableWallPosition = (
  wallPosition: WallPosition,
): wallPosition is HorizontallyIncrementableWallPosition => {
  return horizontallyIncrementablePositions.has(wallPosition);
};

export const isHorizontallyDecrementableWallPosition = (
  wallPosition: WallPosition,
): wallPosition is HorizontallyDecrementableWallPosition => {
  return horizontallyDecrementablePositions.has(wallPosition);
};

const isVerticallyIncrementableWallPosition = (
  wallPosition: WallPosition,
): wallPosition is VerticallyIncrementableWallPosition => {
  return verticallyIncrementablePositions.has(wallPosition);
};

export const isVerticallyDecrementableWallPosition = (
  wallPosition: WallPosition,
): wallPosition is VerticallyDecrementableWallPosition => {
  return verticallyDecrementablePositions.has(wallPosition);
};

// Piece
const isIncrementableHorizontalPiecePosition = (
  horizontalPiecePosition: HorizontalPiecePosition,
): horizontalPiecePosition is IncrementableHorizontalPiecePosition => {
  return isIncrementableHorizontalPiecePositionMap[horizontalPiecePosition];
};

const isDecrementableHorizontalPiecePosition = (
  horizontalPiecePosition: HorizontalPiecePosition,
): horizontalPiecePosition is DecrementableHorizontalPiecePosition => {
  return isDecrementableHorizontalPiecePositionMap[horizontalPiecePosition];
};

const isIncrementableVerticalPiecePosition = (
  verticalPiecePosition: VerticalPiecePosition,
): verticalPiecePosition is IncrementableVerticalPiecePosition => {
  return isIncrementableVerticalPiecePositionMap[verticalPiecePosition];
};

const isDecrementableVerticalPiecePosition = (
  verticalPiecePosition: VerticalPiecePosition,
): verticalPiecePosition is DecrementableVerticalPiecePosition => {
  return isDecrementableVerticalPiecePositionMap[verticalPiecePosition];
};

export const overlapsPath = (path: PawnPosition[], wallMove: WallPosition) => {
  const wallMoveX = getHorizontalCoordinate(wallMove);
  const wallMoveY = getVerticalCoordinate(wallMove);

  // If is horizontal wall
  if (isHorizontalWallMove(wallMove)) {
    return path.some((currentPosition, index) => {
      const previousPosition = path[index - 1] as PawnMove | undefined;
      if (!previousPosition) return false;

      const currentPositionX = getHorizontalCoordinate(currentPosition);
      const currentPositionY = getVerticalCoordinate(currentPosition);
      //   If there is a path position where the position is above the wall and the previous position is below the wall
      if (
        isSingleUpMove(previousPosition, currentPosition) &&
        // Pawh is right above wall
        currentPositionY === wallMoveY + 1 &&
        // Is wall below or below left
        (currentPositionX === wallMoveX ||
          (isDecrementableHorizontalPiecePosition(currentPositionX) &&
            decrementHorizontalPiecePosition(currentPositionX) === wallMoveX))
      ) {
        return true;
      }

      //   If there is a path position where the position is below the wall and the previous position is above the wall
      if (
        isSingleDownMove(previousPosition, currentPosition) &&
        // Pawn is right below wall
        currentPositionY === wallMoveY &&
        // Is wall above or above left
        (currentPositionX === wallMoveX ||
          (isDecrementableHorizontalPiecePosition(currentPositionX) &&
            decrementHorizontalPiecePosition(currentPositionX) === wallMoveX))
      ) {
        return true;
      }
      return false;
    });
  }

  // If is vertical wall
  return path.some((currentPosition, index) => {
    const previousPosition = path[index - 1] as PawnPosition | undefined;
    if (!previousPosition) return false;

    const currentPositionX = getHorizontalCoordinate(currentPosition);
    const currentPositionY = getVerticalCoordinate(currentPosition);
    //   If there is a path position where the position is right of the wall and the previous position is left of the wall
    if (
      isSingleRightMove(previousPosition, currentPosition) &&
      // Pawn is right right to wall
      currentPositionX === incrementHorizontalPiecePosition(wallMoveX) &&
      (currentPositionY === wallMoveY || currentPositionY - 1 === wallMoveY)
    ) {
      return true;
    }

    //   If there is a path position where the position is left of the wall and the previous position is right of the wall
    if (
      isSingleLeftMove(previousPosition, currentPosition) &&
      currentPositionX === wallMoveX &&
      (currentPositionY === wallMoveY || currentPositionY - 1 === wallMoveY)
    ) {
      return true;
    }
    return false;
  });
};

const getNumberOfPlacedWalls = (game: Game) => {
  return 20 - game.playerWallCounts[1] - game.playerWallCounts[2];
};

export const getValidWallMoveArray = (game: Game) => {
  const thisTurn = getTurn(game);
  if (game.playerWallCounts[thisTurn] < 1) {
    return [];
  }
  const thatTurn = getOppositePlayer(thisTurn);

  const numberOfPlacedWalls = getNumberOfPlacedWalls(game);
  if (numberOfPlacedWalls <= 2) {
    if (
      !possiblyTrappedPositions[(numberOfPlacedWalls + 1) as 1 | 2].has(
        game.playerPositions[1].position,
      ) &&
      !possiblyTrappedPositions[(numberOfPlacedWalls + 1) as 1 | 2].has(
        game.playerPositions[2].position,
      )
    ) {
      return wallPositions.filter((wallMove) => !overlapsWall(game, wallMove));
    }
    // TODO: We could have a similar lookup map to see if a wall position is
    // possibly trapping given a number of already placed walls.

    // TODO: Even if the players are in a possibly trapped position we should
    // check if the walls are placed so that they are actually trapped to
    // possibly avoid having to run A*.
  }

  const thisPlayersShortestPath = getShortestPath(game, thisTurn);
  const thatPlayersShortestPath = getShortestPath(game, thatTurn);
  if (thisPlayersShortestPath === null || thatPlayersShortestPath === null) {
    return [];
  }
  return wallPositions.filter((wallMove) => {
    if (overlapsWall(game, wallMove)) return false;
    if (
      !overlapsPath(thisPlayersShortestPath, wallMove) &&
      !overlapsPath(thatPlayersShortestPath, wallMove)
    ) {
      return true;
    }
    if (doesWallMoveHaveSameDirectionAsAllPreviousWallMoves(game, wallMove)) {
      return true;
    }
    if (getNumberOfNeighborWalls(game, wallMove) < 2) {
      return true;
    }
    const gameWithUnvalidatedMove = makeUnvalidatedMove(game, wallMove);
    const thisTurnAfterMove = getTurn(game);
    const thatTurnAfterMove = getOppositePlayer(getTurn(game));
    const thisShortestPath = getShortestPath(
      gameWithUnvalidatedMove,
      thisTurnAfterMove,
    );
    const thatShortestPath = getShortestPath(
      gameWithUnvalidatedMove,
      thatTurnAfterMove,
    );
    return Boolean(thisShortestPath && thatShortestPath);
  });
};

export const butlast = <T>(array: T[]) => array.slice(0, -1);

export const first = <T>(array: T[]) => array[0];

export const last = <T>(array: T[]) => array[array.length - 1];

export const rest = <T>(array: T[]) => array.slice(1);
