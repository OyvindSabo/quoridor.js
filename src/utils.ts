import {
  decrementedHorizontalPiecePositions,
  decrementedHorizontalWallPositions,
  decrementedVerticalPiecePositions,
  decrementedVerticalWallPositions,
  horizontallyDecrementableWallPositions,
  horizontallyDecrementedPawnPositions,
  horizontallyIncrementableWallPositions,
  horizontallyIncrementedPawnPositions,
  incrementedHorizontalPiecePositions,
  incrementedHorizontalWallPositions,
  incrementedVerticalPiecePositions,
  incrementedVerticalWallPositions,
  isDecrementableHorizontalPiecePositionMap,
  isDecrementableHorizontalWallPositionMap,
  isDecrementableVerticalPiecePositionMap,
  isDecrementableVerticalWallPositionMap,
  isHorizontallyDecrementablePawnPositionMap,
  isHorizontallyIncrementablePawnPositionMap,
  isHorizontalWallCoordinateMap,
  isIncrementableHorizontalPiecePositionMap,
  isIncrementableHorizontalWallPositionMap,
  isIncrementableVerticalPiecePositionMap,
  isIncrementableVerticalWallPositionMap,
  isVerticallyDecrementablePawnPositionMap,
  isVerticallyIncrementablePawnPositionMap,
  isVerticalWallCoordinateMap,
  possiblyTrappedPositions,
  verticallyDecrementableWallPositions,
  verticallyDecrementedPawnPositions,
  verticallyIncrementableWallPositions,
  verticallyIncrementedPawnPositions,
  verticalPiecePositions,
  wallPositions,
} from './consts';
import { getShortestPath } from './getShortestPath';
import { getTurn } from './getTurn';
import { makeUnvalidatedMove } from './makeUnvalidatedMove';
import {
  Board,
  DecrementableHorizontalPiecePosition,
  DecrementableHorizontalWallPosition,
  DecrementableVerticalPiecePosition,
  DecrementableVerticalWallPosition,
  Game,
  HorizontallyDecrementablePawnPosition,
  HorizontallyDecrementableWallPosition,
  HorizontallyIncrementablePawnPosition,
  HorizontallyIncrementableWallPosition,
  HorizontalPiecePosition,
  HorizontalWallPosition,
  IncrementableHorizontalPiecePosition,
  IncrementableHorizontalWallPosition,
  IncrementableVerticalPiecePosition,
  IncrementableVerticalWallPosition,
  Move,
  MoveObject,
  PawnMove,
  PawnPosition,
  Player,
  VerticallyDecrementablePawnPosition,
  VerticallyDecrementableWallPosition,
  VerticallyIncrementablePawnPosition,
  VerticallyIncrementableWallPosition,
  VerticalPiecePosition,
  VerticalWallPosition,
  WallMove,
  WallMoveObject,
  WallOrientation,
  WallPosition,
} from './types';

type GetHorizontalCoordinate = {
  (move: WallPosition): HorizontalWallPosition;
  (move: PawnPosition): HorizontalPiecePosition;
};

export const getHorizontalCoordinate: GetHorizontalCoordinate = (
  move: WallPosition | PawnPosition,
) => {
  return move.charAt(0) as any;
};

type GetVerticalCoordinate = {
  (move: WallPosition): VerticalWallPosition;
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

export const moveObjectToMove = (moveObject: MoveObject) => {
  if ((moveObject as WallMoveObject).w) {
    return `${moveObject.x}${moveObject.y}${
      (moveObject as WallMoveObject).w
    }` as WallMove;
  }
  return `${moveObject.x}${moveObject.y}` as PawnMove;
};

const letterToNumber = (letter: HorizontalPiecePosition) => {
  return (letter.charCodeAt(0) - 96) as VerticalPiecePosition;
};

const decrementHorizontalWallPosition = (
  horizontalWallPosition: DecrementableHorizontalWallPosition,
) => {
  return decrementedHorizontalWallPositions[horizontalWallPosition];
};

const decrementHorizontalPiecePosition = (
  horizontalPiecePosition: DecrementableHorizontalPiecePosition,
) => {
  return decrementedHorizontalPiecePositions[horizontalPiecePosition];
};

const incrementHorizontalWallPosition = (
  horizontalWallPosition: IncrementableHorizontalWallPosition,
): HorizontalWallPosition => {
  return incrementedHorizontalWallPositions[horizontalWallPosition];
};

const incrementHorizontalPiecePosition = (
  horizontalPiecePosition: IncrementableHorizontalPiecePosition,
) => {
  return incrementedHorizontalPiecePositions[horizontalPiecePosition];
};

const decrementVerticalWallPosition = (
  verticalWallPosition: DecrementableVerticalWallPosition,
) => {
  return decrementedVerticalWallPositions[verticalWallPosition];
};

const decrementVerticalPiecePosition = (
  verticalPiecePosition: DecrementableVerticalPiecePosition,
) => {
  return decrementedVerticalPiecePositions[verticalPiecePosition];
};

const incrementVerticalWallPosition = (
  verticalWallPosition: IncrementableVerticalWallPosition,
): VerticalWallPosition => {
  return incrementedVerticalWallPositions[verticalWallPosition];
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
  const x = getHorizontalCoordinate(wallMove) as HorizontalWallPosition;
  const y = getVerticalCoordinate(wallMove) as VerticalWallPosition;
  if (isHorizontalWallMove(wallMove)) {
    if (
      game.wallMatrix[x][y].h ||
      game.wallMatrix[x][y].v ||
      (letterToNumber(x) > 1 &&
        isDecrementableHorizontalWallPosition(x) &&
        game.wallMatrix[decrementHorizontalWallPosition(x)][y].h) ||
      (letterToNumber(x) < 8 &&
        isIncrementableHorizontalWallPosition(x) &&
        game.wallMatrix[incrementHorizontalWallPosition(x)][y].h)
    ) {
      return true;
    }
  }
  if (isVerticalWallMove(wallMove)) {
    if (
      game.wallMatrix[x][y].h ||
      game.wallMatrix[x][y].v ||
      (y > 1 &&
        isDecrementableVerticalWallPosition(y) &&
        game.wallMatrix[x][decrementVerticalWallPosition(y)].v) ||
      (y < 8 &&
        isIncrementableVerticalWallPosition(y) &&
        game.wallMatrix[x][incrementVerticalWallPosition(y)].v)
    ) {
      return true;
    }
  }
  return false;
};

export const isWallPosition = (move: Move): move is WallMove => {
  return move.length === 3;
};

export const getOppositePlayer = (player: Player) => {
  return player === 1 ? 2 : 1;
};

const isSingleUpMove = (currentPosition: PawnPosition, move: PawnMove) => {
  if (
    getVerticalCoordinate(currentPosition) - getVerticalCoordinate(move) ===
      -1 &&
    getHorizontalCoordinate(currentPosition) === getHorizontalCoordinate(move)
  ) {
    return true;
  }
  return false;
};

const hasWallAbove = (game: Game, move: PawnMove) => {
  const horizontalCoordinate = getHorizontalCoordinate(move);
  const verticalCoordinate = getVerticalCoordinate(move);
  if (
    (isHorizontalWallPosition(horizontalCoordinate) &&
      isVerticalWallPosition(verticalCoordinate) &&
      game.wallMatrix[horizontalCoordinate][verticalCoordinate].h) ||
    (letterToNumber(getHorizontalCoordinate(move)) > 1 &&
      isDecrementableHorizontalPiecePosition(horizontalCoordinate) &&
      isVerticalWallPosition(verticalCoordinate) &&
      game.wallMatrix[decrementHorizontalPiecePosition(horizontalCoordinate)][
        verticalCoordinate
      ].h)
  ) {
    return true;
  }
  return false;
};

const isDoubleUpMove = (currentPosition: PawnPosition, move: PawnMove) => {
  // TODO: Surely this must be wrong, or?
  if (
    getVerticalCoordinate(move) - getVerticalCoordinate(currentPosition) ===
      2 &&
    getHorizontalCoordinate(move) === getHorizontalCoordinate(currentPosition)
  ) {
    return true;
  }
  return false;
};

const hasOpponentAbove = (game: Game, position: PawnMove) => {
  const verticalCoordinate = getVerticalCoordinate(position);
  if (
    isIncrementableVerticalPiecePosition(verticalCoordinate) &&
    game.pieceMatrix[getHorizontalCoordinate(position)][
      incrementVerticalPiecePosition(verticalCoordinate)
    ] === getOppositePlayer(getTurn(game))
  ) {
    return true;
  }
  return false;
};

const isUpLeftMove = (currentPosition: PawnPosition, move: PawnMove) => {
  if (
    getVerticalCoordinate(move) - getVerticalCoordinate(currentPosition) ===
      1 &&
    letterToNumber(getHorizontalCoordinate(move)) -
      letterToNumber(getHorizontalCoordinate(currentPosition)) ===
      -1
  ) {
    return true;
  }
  return false;
};

const hasWallToTheRight = (game: Game, move: PawnMove) => {
  const horizontalCoordinate = getHorizontalCoordinate(move);
  const verticalCoordinate = getVerticalCoordinate(move);
  if (
    (getVerticalCoordinate(move) < 9 &&
      isHorizontalWallPosition(horizontalCoordinate) &&
      isVerticalWallPosition(verticalCoordinate) &&
      game.wallMatrix[horizontalCoordinate][verticalCoordinate].v) ||
    (getVerticalCoordinate(move) > 1 &&
      isHorizontalWallPosition(horizontalCoordinate) &&
      isDecrementableVerticalPiecePosition(verticalCoordinate) &&
      game.wallMatrix[horizontalCoordinate][
        decrementVerticalPiecePosition(verticalCoordinate)
      ].v)
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
      isVerticalWallPosition(verticalCoordinate) &&
      game.wallMatrix[decrementHorizontalPiecePosition(horizontalCoordinate)][
        verticalCoordinate
      ].v) ||
    (getVerticalCoordinate(move) > 1 &&
      isDecrementableHorizontalPiecePosition(horizontalCoordinate) &&
      isDecrementableVerticalPiecePosition(verticalCoordinate) &&
      game.wallMatrix[decrementHorizontalPiecePosition(horizontalCoordinate)][
        decrementVerticalPiecePosition(verticalCoordinate)
      ].v)
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
  const horizontalCoordinate = getHorizontalCoordinate(position);
  if (
    isIncrementableHorizontalPiecePosition(horizontalCoordinate) &&
    game.pieceMatrix[incrementHorizontalPiecePosition(horizontalCoordinate)][
      getVerticalCoordinate(position)
    ] === getOppositePlayer(getTurn(game))
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

const hasWallBelow = (game: Game, move: PawnMove) => {
  const horizontalCoordinate = getHorizontalCoordinate(move);
  const verticalCoordinate = getVerticalCoordinate(move);
  if (
    (isHorizontalWallPosition(horizontalCoordinate) &&
      isDecrementableVerticalPiecePosition(verticalCoordinate) &&
      game.wallMatrix[horizontalCoordinate][
        decrementVerticalPiecePosition(verticalCoordinate)
      ].h) ||
    (letterToNumber(getHorizontalCoordinate(move)) > 1 &&
      isDecrementableHorizontalPiecePosition(horizontalCoordinate) &&
      isDecrementableVerticalPiecePosition(verticalCoordinate) &&
      game.wallMatrix[decrementHorizontalPiecePosition(horizontalCoordinate)][
        decrementVerticalPiecePosition(verticalCoordinate)
      ].h)
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
  const verticalCoordinate = getVerticalCoordinate(position);
  if (
    isDecrementableVerticalPiecePosition(verticalCoordinate) &&
    game.pieceMatrix[getHorizontalCoordinate(position)][
      decrementVerticalPiecePosition(verticalCoordinate)
    ] === getOppositePlayer(getTurn(game))
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
  const horizontalCoordinate = getHorizontalCoordinate(position);
  if (
    isDecrementableHorizontalPiecePosition(horizontalCoordinate) &&
    game.pieceMatrix[decrementHorizontalPiecePosition(horizontalCoordinate)][
      getVerticalCoordinate(position)
    ] === getOppositePlayer(getTurn(game))
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
  // TODO: I might no longer need this now that this is properly typed
  // If move is outside board, but it seems like the getNorthWestMove etc. are a
  // bit incorrectly typed.
  if (
    letterToNumber(getHorizontalCoordinate(move)) < 1 ||
    letterToNumber(getHorizontalCoordinate(move)) > 9
  ) {
    return false;
  }
  if (getVerticalCoordinate(move) < 1 || getVerticalCoordinate(move) > 9) {
    return false;
  }

  // If the move lands on top of the opponent
  if (
    game.pieceMatrix[getHorizontalCoordinate(move)][
      getVerticalCoordinate(move)
    ] === getOppositePlayer(getTurn(game))
  ) {
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
  const playerPosition = game.playerPositions[player];
  const shortestPathVerticalCoordinates =
    player === 1
      ? verticalPiecePositions.slice(playerPosition.y - 1)
      : [...verticalPiecePositions].reverse().slice(9 - playerPosition.y);
  return shortestPathVerticalCoordinates.map(
    (y) => `${playerPosition.x}${y}` as PawnPosition,
  );
};

export const doesHorizontalWallBlockPlayer = (
  game: Game,
  player: Player,
  horizontalWall: WallPosition,
) => {
  const { x: playerX, y: playerY } = game.playerPositions[player];
  const wallX = getHorizontalCoordinate(horizontalWall);
  const wallY = getVerticalCoordinate(horizontalWall);
  const wallOverlapsWithPlayerColumn =
    playerX === wallX ||
    (isIncrementableHorizontalWallPosition(wallX) &&
      playerX === incrementHorizontalWallPosition(wallX));
  if (!wallOverlapsWithPlayerColumn) return false;
  if (player === 1) {
    return wallY >= playerY;
  }
  return wallY < playerY;
};

const numberToLetter = (num: number) => {
  return String.fromCharCode(96 + num);
};

const decrementLetter = (letter: HorizontalPiecePosition) => {
  return numberToLetter(letterToNumber(letter) - 1);
};

const incrementLetter = (letter: HorizontalPiecePosition) => {
  return numberToLetter(letterToNumber(letter) + 1);
};

export const verticallyIncrementPawnPosition = (
  position: VerticallyIncrementablePawnPosition,
): PawnPosition => {
  return verticallyIncrementedPawnPositions[position];
};

export const isVerticallyIncrementablePawnPosition = (
  position: PawnPosition,
): position is VerticallyIncrementablePawnPosition => {
  return isVerticallyIncrementablePawnPositionMap[position];
};

export const verticallyDecrementPawnPosition = (
  position: VerticallyDecrementablePawnPosition,
): PawnPosition => {
  return verticallyDecrementedPawnPositions[position];
};

export const isVerticallyDecrementablePawnPosition = (
  position: PawnPosition,
): position is VerticallyDecrementablePawnPosition => {
  return isVerticallyDecrementablePawnPositionMap[position];
};

export const horizontallyIncrementPawnPosition = (
  position: HorizontallyIncrementablePawnPosition,
): PawnPosition => {
  return horizontallyIncrementedPawnPositions[position];
};

export const isHorizontallyIncrementablePawnPosition = (
  position: PawnPosition,
): position is HorizontallyIncrementablePawnPosition => {
  return isHorizontallyIncrementablePawnPositionMap[position];
};

export const horizontallyDecrementPawnPosition = (
  position: HorizontallyDecrementablePawnPosition,
): PawnPosition => {
  return horizontallyDecrementedPawnPositions[position];
};

export const isHorizontallyDecrementablePawnPosition = (
  position: PawnPosition,
): position is HorizontallyDecrementablePawnPosition => {
  return isHorizontallyDecrementablePawnPositionMap[position];
};

const getPositionFromNorthNorthMove = (currentPosition: PawnPosition) => {
  return [currentPosition]
    .filter(isVerticallyIncrementablePawnPosition)
    .map(verticallyIncrementPawnPosition)
    .filter(isVerticallyIncrementablePawnPosition)
    .map(verticallyIncrementPawnPosition)[0];
};

const getPositionFromNorthEastMove = (currentPosition: PawnPosition) => {
  return [currentPosition]
    .filter(isVerticallyIncrementablePawnPosition)
    .map(verticallyIncrementPawnPosition)
    .filter(isHorizontallyIncrementablePawnPosition)
    .map(horizontallyIncrementPawnPosition)[0];
};

const getPositionFromEastEastMove = (currentPosition: PawnPosition) => {
  return [currentPosition]
    .filter(isHorizontallyIncrementablePawnPosition)
    .map(horizontallyIncrementPawnPosition)
    .filter(isHorizontallyIncrementablePawnPosition)
    .map(horizontallyIncrementPawnPosition)[0];
};

const getPositionFromSouthEastMove = (currentPosition: PawnPosition) => {
  return [currentPosition]
    .filter(isVerticallyDecrementablePawnPosition)
    .map(verticallyDecrementPawnPosition)
    .filter(isHorizontallyIncrementablePawnPosition)
    .map(horizontallyIncrementPawnPosition)[0];
};

const getPositionFromSouthSouthMove = (currentPosition: PawnPosition) => {
  return [currentPosition]
    .filter(isVerticallyDecrementablePawnPosition)
    .map(verticallyDecrementPawnPosition)
    .filter(isVerticallyDecrementablePawnPosition)
    .map(verticallyDecrementPawnPosition)[0];
};

const getPositionFromSouthWestMove = (currentPosition: PawnPosition) => {
  return [currentPosition]
    .filter(isVerticallyDecrementablePawnPosition)
    .map(verticallyDecrementPawnPosition)
    .filter(isHorizontallyDecrementablePawnPosition)
    .map(horizontallyDecrementPawnPosition)[0];
};

const getPositionFromWestWestMove = (currentPosition: PawnPosition) => {
  return [currentPosition]
    .filter(isHorizontallyDecrementablePawnPosition)
    .map(horizontallyDecrementPawnPosition)
    .filter(isHorizontallyDecrementablePawnPosition)
    .map(horizontallyDecrementPawnPosition)[0];
};

const getPositionFromNorthWestMove = (currentPosition: PawnPosition) => {
  return [currentPosition]
    .filter(isHorizontallyIncrementablePawnPosition)
    .map(horizontallyIncrementPawnPosition)
    .filter(isHorizontallyDecrementablePawnPosition)
    .map(horizontallyDecrementPawnPosition)[0];
};

export const getValidPawnMoveArray = (game: Game) => {
  const currentPosition = moveObjectToMove(
    game.playerPositions[getTurn(game)],
  ) as PawnPosition;
  const validPawnMoveArray = [
    isVerticallyIncrementablePawnPosition(currentPosition) &&
      verticallyIncrementPawnPosition(currentPosition),
    getPositionFromNorthNorthMove(currentPosition),
    getPositionFromNorthEastMove(currentPosition),
    isHorizontallyIncrementablePawnPosition(currentPosition) &&
      horizontallyIncrementPawnPosition(currentPosition),
    getPositionFromEastEastMove(currentPosition),
    getPositionFromSouthEastMove(currentPosition),
    isVerticallyDecrementablePawnPosition(currentPosition) &&
      verticallyDecrementPawnPosition(currentPosition),
    getPositionFromSouthSouthMove(currentPosition),
    getPositionFromSouthWestMove(currentPosition),
    isHorizontallyDecrementablePawnPosition(currentPosition) &&
      horizontallyDecrementPawnPosition(currentPosition),
    getPositionFromWestWestMove(currentPosition),
    getPositionFromNorthWestMove(currentPosition),
  ].filter(
    (newPosition) =>
      newPosition && isValidNormalMove(game, currentPosition, newPosition),
  ) as PawnPosition[];
  return validPawnMoveArray;
};

const overlapsWall = (game: Game, wallMove: WallMove) => {
  const numberOfPlacedWalls = getNumberOfPlacedWalls(game);
  if (numberOfPlacedWalls === 0) return false;
  const x = getHorizontalCoordinate(wallMove) as HorizontalWallPosition;
  const y = getVerticalCoordinate(wallMove) as VerticalWallPosition;
  if (isHorizontalWallMove(wallMove)) {
    // A horizontal wall
    if (
      game.wallMatrix[x][y].h ||
      game.wallMatrix[x][y].v ||
      (letterToNumber(x) > 1 &&
        game.wallMatrix[
          numberToLetter(letterToNumber(x) - 1) as HorizontalWallPosition
        ][y].h) ||
      (letterToNumber(x) < 8 &&
        game.wallMatrix[
          numberToLetter(letterToNumber(x) + 1) as HorizontalWallPosition
        ][y].h)
    ) {
      return true;
    }
  }
  if (isVerticalWallMove(wallMove)) {
    if (
      game.wallMatrix[x][y].h ||
      game.wallMatrix[x][y].v ||
      (y > 1 &&
        isDecrementableVerticalWallPosition(y) &&
        game.wallMatrix[x][decrementVerticalWallPosition(y)].v) ||
      (y < 8 &&
        isIncrementableVerticalWallPosition(y) &&
        game.wallMatrix[x][incrementVerticalWallPosition(y)].v)
    ) {
      return true;
    }
  }
  return false;
};

const moveWallRight = (
  wall: HorizontallyIncrementableWallPosition,
): WallPosition => {
  const x = wall.charAt(0) as IncrementableHorizontalWallPosition;
  const newX = incrementHorizontalWallPosition(x);
  return `${newX}${wall.substring(1)}` as WallPosition;
};

const moveWallLeft = (
  wall: HorizontallyDecrementableWallPosition,
): WallPosition => {
  const x = wall.charAt(0) as DecrementableHorizontalWallPosition;
  const newX = decrementHorizontalWallPosition(x);
  return `${newX}${wall.substring(1)}` as WallPosition;
};

const moveWallUp = (
  wall: VerticallyIncrementableWallPosition,
): WallPosition => {
  const y = Number(wall.charAt(1)) as IncrementableVerticalWallPosition;
  const newY = incrementVerticalWallPosition(y);
  return `${wall.charAt(0)}${newY}${wall.charAt(2)}` as WallPosition;
};

const moveWallDown = (
  wall: VerticallyDecrementableWallPosition,
): WallPosition => {
  const y = Number(wall.charAt(1)) as DecrementableVerticalWallPosition;
  const newY = decrementVerticalWallPosition(y);
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
  return game.wallMatrix[getHorizontalCoordinate(verticalWallAboveRight)][
    getVerticalCoordinate(verticalWallAboveRight)
  ][getWallOrientation(verticalWallAboveRight)];
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
  return game.wallMatrix[getHorizontalCoordinate(verticalWallAboveLeft)][
    getVerticalCoordinate(verticalWallAboveLeft)
  ][getWallOrientation(verticalWallAboveLeft)];
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
  return game.wallMatrix[getHorizontalCoordinate(verticalWallBelowRight)][
    getVerticalCoordinate(verticalWallBelowRight)
  ][getWallOrientation(verticalWallBelowRight)];
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
  return game.wallMatrix[getHorizontalCoordinate(verticalWallBelowLeft)][
    getVerticalCoordinate(verticalWallBelowLeft)
  ][getWallOrientation(verticalWallBelowLeft)];
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
  return game.wallMatrix[getHorizontalCoordinate(horizontalWallRight)][
    getVerticalCoordinate(horizontalWallRight)
  ][getWallOrientation(horizontalWallRight)];
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
  return game.wallMatrix[getHorizontalCoordinate(horizontalWallLeft)][
    getVerticalCoordinate(horizontalWallLeft)
  ][getWallOrientation(horizontalWallLeft)];
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
  return game.wallMatrix[getHorizontalCoordinate(verticalWallAbove)][
    getVerticalCoordinate(verticalWallAbove)
  ][getWallOrientation(verticalWallAbove)];
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
  return game.wallMatrix[getHorizontalCoordinate(verticalWallBelow)][
    getVerticalCoordinate(verticalWallBelow)
  ][getWallOrientation(verticalWallBelow)];
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
  return game.wallMatrix[getHorizontalCoordinate(horizontalWallAboveRight)][
    getVerticalCoordinate(horizontalWallAboveRight)
  ][getWallOrientation(horizontalWallAboveRight)];
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
  return game.wallMatrix[getHorizontalCoordinate(horizontalWallAboveLeft)][
    getVerticalCoordinate(horizontalWallAboveLeft)
  ][getWallOrientation(horizontalWallAboveLeft)];
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
  return game.wallMatrix[getHorizontalCoordinate(horizontalWallBelowRight)][
    getVerticalCoordinate(horizontalWallBelowRight)
  ][getWallOrientation(horizontalWallBelowRight)];
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
  return game.wallMatrix[getHorizontalCoordinate(horizontalWallBelowLeft)][
    getVerticalCoordinate(horizontalWallBelowLeft)
  ][getWallOrientation(horizontalWallBelowLeft)];
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
  return game.wallMatrix[getHorizontalCoordinate(verticalWallAbove)][
    getVerticalCoordinate(verticalWallAbove)
  ][getWallOrientation(verticalWallAbove)];
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
  return game.wallMatrix[getHorizontalCoordinate(verticalWallBelow)][
    getVerticalCoordinate(verticalWallBelow)
  ][getWallOrientation(verticalWallBelow)];
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
  return game.wallMatrix[getHorizontalCoordinate(horizontalWallAbove)][
    getVerticalCoordinate(horizontalWallAbove)
  ][getWallOrientation(horizontalWallAbove)];
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
  return game.wallMatrix[getHorizontalCoordinate(horizontalWallBelow)][
    getVerticalCoordinate(horizontalWallBelow)
  ][getWallOrientation(horizontalWallBelow)];
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
      .filter(isIncrementableHorizontalWallPosition)
      .map(incrementHorizontalWallPosition)
      .filter(isIncrementableHorizontalWallPosition)
      .map(incrementHorizontalWallPosition)[0] === pawnX &&
    wallY === pawnY
  ) {
    return true;
  }

  //  ––
  //   x
  if (
    wallOrientation === 'h' &&
    [wallX]
      .filter(isIncrementableHorizontalWallPosition)
      .map(incrementHorizontalWallPosition)[0] === pawnX &&
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
        .filter(isDecrementableHorizontalWallPosition)
        .map(decrementHorizontalWallPosition)[0] === pawnX &&
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
      .filter(isIncrementableHorizontalWallPosition)
      .map(incrementHorizontalWallPosition)[0] === pawnX &&
    [wallY]
      .filter(isDecrementableVerticalWallPosition)
      .map(decrementVerticalWallPosition)[0] === pawnY
  ) {
    return true;
  }

  //  |
  //  |x
  if (
    wallOrientation === 'v' &&
    [wallX]
      .filter(isIncrementableHorizontalWallPosition)
      .map(incrementHorizontalWallPosition)[0] === pawnX &&
    wallY === pawnY
  ) {
    return true;
  }

  //  |x
  //  |
  if (
    wallOrientation === 'v' &&
    [wallX]
      .filter(isIncrementableHorizontalWallPosition)
      .map(incrementHorizontalWallPosition)[0] === pawnX &&
    [wallY]
      .filter(isIncrementableVerticalWallPosition)
      .map(incrementVerticalWallPosition)[0] === pawnY
  ) {
    return true;
  }

  //   x
  //  |
  //  |
  if (
    wallOrientation === 'v' &&
    [wallX]
      .filter(isIncrementableHorizontalWallPosition)
      .map(incrementHorizontalWallPosition)[0] === pawnX &&
    [wallY]
      .filter(isIncrementableVerticalWallPosition)
      .map(incrementVerticalWallPosition)
      .filter(isIncrementableVerticalWallPosition)
      .map(incrementVerticalWallPosition)[0] === pawnY
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
      .filter(isDecrementableVerticalWallPosition)
      .map(decrementVerticalWallPosition)[0] === pawnY
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
      .filter(isIncrementableVerticalWallPosition)
      .map(incrementVerticalWallPosition)[0] === pawnY
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
      .filter(isIncrementableVerticalWallPosition)
      .map(incrementVerticalWallPosition)
      .filter(isIncrementableVerticalWallPosition)
      .map(incrementVerticalWallPosition)[0] === pawnY
  ) {
    return true;
  }

  //   x
  // ––
  if (
    wallOrientation === 'h' &&
    [wallX]
      .filter(isIncrementableHorizontalWallPosition)
      .map(incrementHorizontalWallPosition)
      .filter(isIncrementableHorizontalWallPosition)
      .map(incrementHorizontalWallPosition)[0] === pawnX &&
    [wallY]
      .filter(isIncrementableVerticalWallPosition)
      .map(incrementVerticalWallPosition)[0] === pawnY
  ) {
    return true;
  }

  //   x
  //  ––
  if (
    wallOrientation === 'h' &&
    [wallX]
      .filter(isIncrementableHorizontalWallPosition)
      .map(incrementHorizontalWallPosition)[0] === pawnX &&
    [wallY]
      .filter(isIncrementableVerticalWallPosition)
      .map(incrementVerticalWallPosition)[0] === pawnY
  ) {
    return true;
  }

  //   x
  //   ––
  if (
    wallOrientation === 'h' &&
    wallX === pawnX &&
    [wallY]
      .filter(isIncrementableVerticalWallPosition)
      .map(incrementVerticalWallPosition)[0] === pawnY
  ) {
    return true;
  }

  //   x
  //    ––
  if (
    wallOrientation === 'h' &&
    [wallX]
      .filter(isDecrementableHorizontalWallPosition)
      .map(decrementHorizontalWallPosition)[0] === pawnX &&
    [wallY]
      .filter(isIncrementableVerticalWallPosition)
      .map(incrementVerticalWallPosition)[0] === pawnY
  ) {
    return true;
  }
  return false;
};

export const isWallAdjacentToAtLeastOnePawn = (
  game: Game,
  wall: WallPosition,
) => {
  const player1Position = moveObjectToMove(
    game.playerPositions[1],
  ) as PawnPosition;
  const player2Position = moveObjectToMove(
    game.playerPositions[2],
  ) as PawnPosition;
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

const isHorizontalWallPosition = (
  horizontalPosition: HorizontalPiecePosition | HorizontalWallPosition,
): horizontalPosition is HorizontalWallPosition => {
  return isHorizontalWallCoordinateMap[horizontalPosition];
};

const isVerticalWallPosition = (
  verticalPosition: VerticalPiecePosition | VerticalWallPosition,
): verticalPosition is VerticalWallPosition => {
  return isVerticalWallCoordinateMap[verticalPosition];
};

const isIncrementableHorizontalWallPosition = (
  horizontalPosition: HorizontalPiecePosition | HorizontalWallPosition,
): horizontalPosition is IncrementableHorizontalWallPosition => {
  return isIncrementableHorizontalWallPositionMap[horizontalPosition];
};

const isDecrementableHorizontalWallPosition = (
  horizontalPosition: HorizontalPiecePosition | HorizontalWallPosition,
): horizontalPosition is DecrementableHorizontalWallPosition => {
  return isDecrementableHorizontalWallPositionMap[horizontalPosition];
};

const isIncrementableVerticalWallPosition = (
  horizontalPosition: VerticalPiecePosition | VerticalWallPosition,
): horizontalPosition is IncrementableVerticalWallPosition => {
  return isIncrementableVerticalWallPositionMap[horizontalPosition];
};

const isDecrementableVerticalWallPosition = (
  horizontalPosition: VerticalPiecePosition | VerticalWallPosition,
): horizontalPosition is DecrementableVerticalWallPosition => {
  return isDecrementableVerticalWallPositionMap[horizontalPosition];
};

const isHorizontallyIncrementableWallPosition = (
  wallPosition: WallPosition,
): wallPosition is HorizontallyIncrementableWallPosition => {
  return horizontallyIncrementableWallPositions.includes(wallPosition);
};

const isHorizontallyDecrementableWallPosition = (
  wallPosition: WallPosition,
): wallPosition is HorizontallyDecrementableWallPosition => {
  return horizontallyDecrementableWallPositions.includes(wallPosition);
};

const isVerticallyIncrementableWallPosition = (
  wallPosition: WallPosition,
): wallPosition is VerticallyIncrementableWallPosition => {
  return verticallyIncrementableWallPositions.includes(wallPosition);
};

const isVerticallyDecrementableWallPosition = (
  wallPosition: WallPosition,
): wallPosition is VerticallyDecrementableWallPosition => {
  return verticallyDecrementableWallPositions.includes(wallPosition);
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
  if (
    path.some(
      (pathStep) =>
        getHorizontalCoordinate(pathStep) ===
          getHorizontalCoordinate(wallMove) &&
        getVerticalCoordinate(pathStep) === getVerticalCoordinate(wallMove),
    ) &&
    path.some(
      (pathStep) =>
        getHorizontalCoordinate(pathStep) ===
          getHorizontalCoordinate(wallMove) &&
        getVerticalCoordinate(pathStep) === getVerticalCoordinate(wallMove) + 1,
    )
  ) {
    return true;
  }
  if (
    path.some((pathStep) => {
      const horizontalWallCoordinate = getHorizontalCoordinate(wallMove);
      return (
        isIncrementableHorizontalWallPosition(horizontalWallCoordinate) &&
        getHorizontalCoordinate(pathStep) ===
          incrementHorizontalWallPosition(horizontalWallCoordinate) &&
        getVerticalCoordinate(pathStep) === getVerticalCoordinate(wallMove)
      );
    }) &&
    path.some((pathStep) => {
      const horizontalWallCoordinate = getHorizontalCoordinate(wallMove);
      return (
        isIncrementableHorizontalWallPosition(horizontalWallCoordinate) &&
        getHorizontalCoordinate(pathStep) ===
          incrementHorizontalWallPosition(horizontalWallCoordinate) &&
        getVerticalCoordinate(pathStep) === getVerticalCoordinate(wallMove) + 1
      );
    })
  ) {
    return true;
  }
  if (
    path.some(
      (pathStep) =>
        getHorizontalCoordinate(pathStep) ===
          getHorizontalCoordinate(wallMove) &&
        getVerticalCoordinate(pathStep) === getVerticalCoordinate(wallMove),
    ) &&
    path.some((pathStep) => {
      const horizontalWallCoordinate = getHorizontalCoordinate(wallMove);
      return (
        isIncrementableHorizontalWallPosition(horizontalWallCoordinate) &&
        getHorizontalCoordinate(pathStep) ===
          incrementHorizontalWallPosition(horizontalWallCoordinate) &&
        getVerticalCoordinate(pathStep) === getVerticalCoordinate(wallMove)
      );
    })
  ) {
    return true;
  }
  if (
    path.some(
      (pathStep) =>
        getHorizontalCoordinate(pathStep) ===
          getHorizontalCoordinate(wallMove) &&
        getVerticalCoordinate(pathStep) === getVerticalCoordinate(wallMove) + 1,
    ) &&
    path.some((pathStep) => {
      const horizontalWallCoordinate = getHorizontalCoordinate(wallMove);
      return (
        isIncrementableHorizontalWallPosition(horizontalWallCoordinate) &&
        getHorizontalCoordinate(pathStep) ===
          incrementHorizontalWallPosition(horizontalWallCoordinate) &&
        getVerticalCoordinate(pathStep) === getVerticalCoordinate(wallMove) + 1
      );
    })
  ) {
    return true;
  }
  return false;
};

const getNumberOfPlacedWalls = (game: Game) => {
  return 20 - game.playerWallCounts[1] - game.playerWallCounts[2];
};

export const getValidWallMoveArray = (game: Game) => {
  if (game.playerWallCounts[getTurn(game)] < 1) {
    return [];
  }
  const thisTurn = getTurn(game);
  const thatTurn = getOppositePlayer(getTurn(game));

  const numberOfPlacedWalls = getNumberOfPlacedWalls(game);
  if (numberOfPlacedWalls <= 2) {
    if (
      !possiblyTrappedPositions[(numberOfPlacedWalls + 1) as 1 | 2].includes(
        moveObjectToMove(game.playerPositions[1]) as PawnPosition,
      ) &&
      !possiblyTrappedPositions[(numberOfPlacedWalls + 1) as 1 | 2].includes(
        moveObjectToMove(game.playerPositions[2]) as PawnPosition,
      )
    ) {
      return wallPositions.filter((wallMove) => !overlapsWall(game, wallMove));
    }
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
