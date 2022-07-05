import { aStar } from './aStar';
import {
  horizontallyDecrementableWallPositions,
  horizontallyIncrementableWallPositions,
  possiblyTrappedPositions,
  verticallyDecrementableWallPositions,
  verticallyIncrementableWallPositions,
  verticalPiecePositions,
} from './consts';
import { getTurn } from './getTurn';
import { makeUnvalidatedMove } from './makeUnvalidatedMove';
import {
  Board,
  DecrementableHorizontalPiecePosition,
  DecrementableHorizontalWallPosition,
  DecrementableVerticalPiecePosition,
  DecrementableVerticalWallPosition,
  Game,
  HorizontallyDecrementableWallPosition,
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
  VerticallyDecrementableWallPosition,
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
  switch (horizontalWallPosition) {
    case 'b':
      return 'a';
    case 'c':
      return 'b';
    case 'd':
      return 'c';
    case 'e':
      return 'd';
    case 'f':
      return 'e';
    case 'g':
      return 'f';
    case 'h':
      return 'g';
  }
};

const decrementHorizontalPiecePosition = (
  horizontalPiecePosition: DecrementableHorizontalPiecePosition,
) => {
  switch (horizontalPiecePosition) {
    case 'b':
      return 'a';
    case 'c':
      return 'b';
    case 'd':
      return 'c';
    case 'e':
      return 'd';
    case 'f':
      return 'e';
    case 'g':
      return 'f';
    case 'h':
      return 'g';
    case 'i':
      return 'h';
  }
};

const incrementHorizontalWallPosition = (
  horizontalWallPosition: IncrementableHorizontalWallPosition,
): HorizontalWallPosition => {
  switch (horizontalWallPosition) {
    case 'a':
      return 'b';
    case 'b':
      return 'c';
    case 'c':
      return 'd';
    case 'd':
      return 'e';
    case 'e':
      return 'f';
    case 'f':
      return 'g';
    case 'g':
      return 'h';
  }
};

const incrementHorizontalPiecePosition = (
  horizontalPiecePosition: IncrementableHorizontalPiecePosition,
) => {
  switch (horizontalPiecePosition) {
    case 'a':
      return 'b';
    case 'b':
      return 'c';
    case 'c':
      return 'd';
    case 'd':
      return 'e';
    case 'e':
      return 'f';
    case 'f':
      return 'g';
    case 'g':
      return 'h';
    case 'h':
      return 'i';
  }
};

const decrementVerticalWallPosition = (
  verticalWallPosition: DecrementableVerticalWallPosition,
) => {
  switch (verticalWallPosition) {
    case 2:
      return 1;
    case 3:
      return 2;
    case 4:
      return 3;
    case 5:
      return 4;
    case 6:
      return 5;
    case 7:
      return 6;
    case 8:
      return 7;
  }
};

const decrementVerticalPiecePosition = (
  verticalPiecePosition: DecrementableVerticalPiecePosition,
) => {
  switch (verticalPiecePosition) {
    case 2:
      return 1;
    case 3:
      return 2;
    case 4:
      return 3;
    case 5:
      return 4;
    case 6:
      return 5;
    case 7:
      return 6;
    case 8:
      return 7;
    case 9:
      return 8;
  }
};

const incrementVerticalWallPosition = (
  verticalWallPosition: IncrementableVerticalWallPosition,
): VerticalWallPosition => {
  switch (verticalWallPosition) {
    case 1:
      return 2;
    case 2:
      return 3;
    case 3:
      return 4;
    case 4:
      return 5;
    case 5:
      return 6;
    case 6:
      return 7;
    case 7:
      return 8;
  }
};

const incrementVerticalPiecePosition = (
  verticalPiecePosition: IncrementableVerticalPiecePosition,
) => {
  switch (verticalPiecePosition) {
    case 1:
      return 2;
    case 2:
      return 3;
    case 3:
      return 4;
    case 4:
      return 5;
    case 5:
      return 6;
    case 6:
      return 7;
    case 7:
      return 8;
    case 8:
      return 9;
  }
};

const isHorizontalWallMove = (move: PawnMove | WallMove): move is WallMove => {
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

export const isValidNormalMove = (
  game: Game,
  currentPosition: PawnPosition,
  move: PawnMove,
) => {
  const x = getHorizontalCoordinate(currentPosition);
  const y = getVerticalCoordinate(currentPosition);

  // If move is outside board
  if (
    letterToNumber(getHorizontalCoordinate(move)) < 1 ||
    letterToNumber(getHorizontalCoordinate(move)) > 9
  )
    return false;
  if (getVerticalCoordinate(move) < 1 || getVerticalCoordinate(move) > 9)
    return false;

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
      isIncrementableVerticalPiecePosition(y) &&
      hasWallAbove(
        game,
        moveObjectToMove({
          x,
          y: incrementVerticalPiecePosition(y),
        }) as PawnPosition,
      )
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
      isIncrementableVerticalPiecePosition(y) &&
      !hasWallAbove(
        game,
        moveObjectToMove({
          x,
          y: incrementVerticalPiecePosition(y),
        }) as PawnPosition,
      ) &&
      !isOnTopRow(
        moveObjectToMove({
          x,
          y: incrementVerticalPiecePosition(y),
        }) as PawnPosition,
      )
    ) {
      return false;
    }
    if (hasWallAbove(game, currentPosition)) return false;
    if (
      isIncrementableVerticalPiecePosition(y) &&
      hasWallToTheRight(
        game,
        moveObjectToMove({
          x,
          y: incrementVerticalPiecePosition(y),
        }) as PawnPosition,
      )
    )
      return false;
    return true;
  }
  if (
    isUpRightMove(currentPosition, move) &&
    hasOpponentAbove(game, currentPosition)
  ) {
    if (
      isIncrementableVerticalPiecePosition(y) &&
      !hasWallAbove(
        game,
        moveObjectToMove({
          x,
          y: incrementVerticalPiecePosition(y),
        }) as PawnMove,
      ) &&
      !isOnTopRow(
        moveObjectToMove({
          x,
          y: incrementVerticalPiecePosition(y),
        }) as PawnMove,
      )
    )
      return false;
    if (hasWallAbove(game, currentPosition)) return false;
    if (
      isIncrementableVerticalPiecePosition(y) &&
      hasWallToTheLeft(
        game,
        moveObjectToMove({
          x,
          y: incrementVerticalPiecePosition(y),
        }) as PawnMove,
      )
    )
      return false;
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
      isIncrementableHorizontalPiecePosition(x) &&
      hasWallToTheRight(
        game,
        moveObjectToMove({
          x: incrementHorizontalPiecePosition(x),
          y,
        }) as PawnMove,
      )
    )
      return false;
    return true;
  }
  if (
    isRightUpMove(currentPosition, move) &&
    hasOpponentToTheRight(game, currentPosition)
  ) {
    if (
      isIncrementableHorizontalPiecePosition(x) &&
      !hasWallToTheRight(
        game,
        moveObjectToMove({
          x: incrementHorizontalPiecePosition(x),
          y,
        }) as PawnMove,
      ) &&
      !isOnRightmostRow(
        moveObjectToMove({
          x: incrementHorizontalPiecePosition(x),
          y,
        }) as PawnMove,
      )
    ) {
      return false;
    }
    if (hasWallToTheRight(game, currentPosition)) return false;
    if (
      isIncrementableHorizontalPiecePosition(x) &&
      hasWallAbove(
        game,
        moveObjectToMove({
          x: incrementHorizontalPiecePosition(x),
          y,
        }) as PawnMove,
      )
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
      isIncrementableHorizontalPiecePosition(x) &&
      !hasWallToTheRight(
        game,
        moveObjectToMove({
          x: incrementHorizontalPiecePosition(x),
          y,
        }) as PawnMove,
      ) &&
      !isOnRightmostRow(
        moveObjectToMove({
          x: incrementHorizontalPiecePosition(x),
          y,
        }) as PawnMove,
      )
    )
      return false;
    if (hasWallToTheRight(game, currentPosition)) return false;
    if (
      isIncrementableHorizontalPiecePosition(x) &&
      hasWallBelow(
        game,
        moveObjectToMove({
          x: incrementHorizontalPiecePosition(x),
          y,
        }) as PawnMove,
      )
    )
      return false;
    return true;
  }

  // If down move
  if (isSingleDownMove(currentPosition, move)) {
    if (hasWallBelow(game, moveObjectToMove({ x, y }) as PawnMove)) {
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
      isDecrementableVerticalPiecePosition(y) &&
      hasWallBelow(
        game,
        moveObjectToMove({
          x,
          y: decrementVerticalPiecePosition(y),
        }) as PawnMove,
      )
    )
      return false;
    return true;
  }
  if (
    isDownRightMove(currentPosition, move) &&
    hasOpponentBelow(game, currentPosition)
  ) {
    if (
      isDecrementableVerticalPiecePosition(y) &&
      !hasWallBelow(
        game,
        moveObjectToMove({
          x,
          y: decrementVerticalPiecePosition(y),
        }) as PawnMove,
      ) &&
      !isOnBottomRow(
        moveObjectToMove({
          x,
          y: decrementVerticalPiecePosition(y),
        }) as PawnPosition,
      )
    ) {
      return false;
    }
    if (hasWallBelow(game, currentPosition)) return false;
    if (
      isDecrementableVerticalPiecePosition(y) &&
      hasWallToTheRight(
        game,
        moveObjectToMove({
          x,
          y: decrementVerticalPiecePosition(y),
        }) as PawnMove,
      ) &&
      !isOnBottomRow(
        moveObjectToMove({
          x,
          y: decrementVerticalPiecePosition(y),
        }) as PawnMove,
      )
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
      isDecrementableVerticalPiecePosition(y) &&
      !hasWallBelow(
        game,
        moveObjectToMove({
          x,
          y: decrementVerticalPiecePosition(y),
        }) as PawnMove,
      ) &&
      !isOnBottomRow(
        moveObjectToMove({
          x,
          y: decrementVerticalPiecePosition(y),
        }) as PawnPosition,
      )
    )
      return false;
    if (hasWallBelow(game, currentPosition)) return false;
    if (
      isDecrementableVerticalPiecePosition(y) &&
      hasWallToTheLeft(
        game,
        moveObjectToMove({
          x,
          y: decrementVerticalPiecePosition(y),
        }) as PawnMove,
      )
    )
      return false;
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
      isDecrementableHorizontalPiecePosition(x) &&
      hasWallToTheLeft(
        game,
        moveObjectToMove({
          x: decrementHorizontalPiecePosition(x),
          y,
        }) as PawnMove,
      )
    )
      return false;
    return true;
  }
  if (
    isLeftDownMove(currentPosition, move) &&
    hasOpponentToTheLeft(game, currentPosition)
  ) {
    if (
      isDecrementableHorizontalPiecePosition(x) &&
      !hasWallToTheLeft(
        game,
        moveObjectToMove({
          x: decrementHorizontalPiecePosition(x),
          y,
        }) as PawnMove,
      ) &&
      !isOnLeftmostRow(
        moveObjectToMove({
          x: decrementHorizontalPiecePosition(x),
          y,
        }) as PawnMove,
      )
    ) {
      return false;
    }
    if (hasWallToTheLeft(game, currentPosition)) return false;
    if (
      isDecrementableHorizontalPiecePosition(x) &&
      hasWallBelow(
        game,
        moveObjectToMove({
          x: decrementHorizontalPiecePosition(x),
          y,
        }) as PawnMove,
      )
    )
      return false;
    return true;
  }
  if (
    isLeftUpMove(currentPosition, move) &&
    hasOpponentToTheLeft(game, currentPosition)
  ) {
    if (
      isDecrementableHorizontalPiecePosition(x) &&
      !hasWallToTheLeft(
        game,
        moveObjectToMove({
          x: decrementHorizontalPiecePosition(x),
          y,
        }) as PawnMove,
      ) &&
      !isOnLeftmostRow(
        moveObjectToMove({
          x: decrementHorizontalPiecePosition(x),
          y,
        }) as PawnMove,
      )
    ) {
      return false;
    }
    if (hasWallToTheLeft(game, currentPosition)) return false;
    if (
      isDecrementableHorizontalPiecePosition(x) &&
      hasWallAbove(
        game,
        moveObjectToMove({
          x: decrementHorizontalPiecePosition(x),
          y,
        }) as PawnMove,
      )
    )
      return false;
    return true;
  }

  return false;
};

const getShortestPathWithNoObstacles = (game: Game, player: Player) => {
  const playerPosition = game.playerPositions[player];
  const shortestPathVerticalCoordinates =
    player === 1
      ? verticalPiecePositions.slice(playerPosition.y)
      : [...verticalPiecePositions].reverse().slice(10 - playerPosition.y);
  return shortestPathVerticalCoordinates.map((y) => ({
    x: playerPosition.x,
    y,
  }));
};

const doesHorizontalWallBlockPlayer = (
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

export const shortestPath = (game: Game, player: Player) => {
  const placedHorizontalWalls = game.pastMoves.filter(isHorizontalWallMove);
  if (
    placedHorizontalWalls.some((wall) =>
      doesHorizontalWallBlockPlayer(game, player, wall),
    )
  ) {
    return aStar(game.pieceMatrix, game.wallMatrix, player);
  }
  // The shortest path has no obstacles if no horizontal walls have been placed
  // between the player and the goal
  return getShortestPathWithNoObstacles(game, player);
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

const getPositionFromNorthMove = (currentPosition: PawnPosition) => {
  return moveObjectToMove({
    x: getHorizontalCoordinate(currentPosition),
    y: (getVerticalCoordinate(currentPosition) + 1) as VerticalPiecePosition,
  }) as PawnMove;
};

const getPositionFromNorthNorthMove = (currentPosition: PawnPosition) => {
  return getPositionFromNorthMove(getPositionFromNorthMove(currentPosition));
};

const getPositionFromEastMove = (currentPosition: PawnPosition) => {
  return moveObjectToMove({
    x: incrementLetter(
      getHorizontalCoordinate(currentPosition),
    ) as HorizontalPiecePosition,
    y: getVerticalCoordinate(currentPosition),
  }) as PawnMove;
};

const getPositionFromNorthEastMove = (currentPosition: PawnPosition) => {
  return getPositionFromNorthMove(getPositionFromEastMove(currentPosition));
};

const getPositionFromEastEastMove = (currentPosition: PawnPosition) => {
  return getPositionFromEastMove(getPositionFromEastMove(currentPosition));
};

const getPositionFromSouthMove = (currentPosition: PawnPosition) => {
  return moveObjectToMove({
    x: getHorizontalCoordinate(currentPosition),
    y: (getVerticalCoordinate(currentPosition) - 1) as VerticalPiecePosition,
  }) as PawnMove;
};

const getPositionFromSouthEastMove = (currentPosition: PawnPosition) => {
  return getPositionFromSouthMove(getPositionFromEastMove(currentPosition));
};

const getPositionFromSouthSouthMove = (currentPosition: PawnPosition) => {
  return getPositionFromSouthMove(getPositionFromSouthMove(currentPosition));
};

const getPositionFromWestMove = (currentPosition: PawnPosition) => {
  return moveObjectToMove({
    x: decrementLetter(
      getHorizontalCoordinate(currentPosition),
    ) as HorizontalPiecePosition,
    y: getVerticalCoordinate(currentPosition),
  }) as PawnMove;
};

const getPositionFromSouthWestMove = (currentPosition: PawnPosition) => {
  return getPositionFromSouthMove(getPositionFromWestMove(currentPosition));
};

const getPositionFromWestWestMove = (currentPosition: PawnPosition) => {
  return getPositionFromWestMove(getPositionFromWestMove(currentPosition));
};

const getPositionFromNorthWestMove = (currentPosition: PawnPosition) => {
  return getPositionFromNorthMove(getPositionFromWestMove(currentPosition));
};

export const getValidPawnMoveArray = (game: Game) => {
  const currentPosition = moveObjectToMove(
    game.playerPositions[getTurn(game)],
  ) as PawnPosition;
  const validPawnMoveArray = [
    getPositionFromNorthMove(currentPosition),
    getPositionFromNorthNorthMove(currentPosition),
    getPositionFromNorthEastMove(currentPosition),
    getPositionFromEastMove(currentPosition),
    getPositionFromEastEastMove(currentPosition),
    getPositionFromSouthEastMove(currentPosition),
    getPositionFromSouthMove(currentPosition),
    getPositionFromSouthSouthMove(currentPosition),
    getPositionFromSouthWestMove(currentPosition),
    getPositionFromWestMove(currentPosition),
    getPositionFromWestWestMove(currentPosition),
    getPositionFromNorthWestMove(currentPosition),
  ].filter((newPosition) =>
    isValidNormalMove(game, currentPosition, newPosition),
  );
  return validPawnMoveArray;
};

const getAllWallMoves = () => {
  const allWallMoves = [
    { x: 'a', y: 1, w: 'h' },
    { x: 'a', y: 1, w: 'v' },
    { x: 'a', y: 2, w: 'h' },
    { x: 'a', y: 2, w: 'v' },
    { x: 'a', y: 3, w: 'h' },
    { x: 'a', y: 3, w: 'v' },
    { x: 'a', y: 4, w: 'h' },
    { x: 'a', y: 4, w: 'v' },
    { x: 'a', y: 5, w: 'h' },
    { x: 'a', y: 5, w: 'v' },
    { x: 'a', y: 6, w: 'h' },
    { x: 'a', y: 6, w: 'v' },
    { x: 'a', y: 7, w: 'h' },
    { x: 'a', y: 7, w: 'v' },
    { x: 'a', y: 8, w: 'h' },
    { x: 'a', y: 8, w: 'v' },

    { x: 'b', y: 1, w: 'h' },
    { x: 'b', y: 1, w: 'v' },
    { x: 'b', y: 2, w: 'h' },
    { x: 'b', y: 2, w: 'v' },
    { x: 'b', y: 3, w: 'h' },
    { x: 'b', y: 3, w: 'v' },
    { x: 'b', y: 4, w: 'h' },
    { x: 'b', y: 4, w: 'v' },
    { x: 'b', y: 5, w: 'h' },
    { x: 'b', y: 5, w: 'v' },
    { x: 'b', y: 6, w: 'h' },
    { x: 'b', y: 6, w: 'v' },
    { x: 'b', y: 7, w: 'h' },
    { x: 'b', y: 7, w: 'v' },
    { x: 'b', y: 8, w: 'h' },
    { x: 'b', y: 8, w: 'v' },

    { x: 'c', y: 1, w: 'h' },
    { x: 'c', y: 1, w: 'v' },
    { x: 'c', y: 2, w: 'h' },
    { x: 'c', y: 2, w: 'v' },
    { x: 'c', y: 3, w: 'h' },
    { x: 'c', y: 3, w: 'v' },
    { x: 'c', y: 4, w: 'h' },
    { x: 'c', y: 4, w: 'v' },
    { x: 'c', y: 5, w: 'h' },
    { x: 'c', y: 5, w: 'v' },
    { x: 'c', y: 6, w: 'h' },
    { x: 'c', y: 6, w: 'v' },
    { x: 'c', y: 7, w: 'h' },
    { x: 'c', y: 7, w: 'v' },
    { x: 'c', y: 8, w: 'h' },
    { x: 'c', y: 8, w: 'v' },

    { x: 'd', y: 1, w: 'h' },
    { x: 'd', y: 1, w: 'v' },
    { x: 'd', y: 2, w: 'h' },
    { x: 'd', y: 2, w: 'v' },
    { x: 'd', y: 3, w: 'h' },
    { x: 'd', y: 3, w: 'v' },
    { x: 'd', y: 4, w: 'h' },
    { x: 'd', y: 4, w: 'v' },
    { x: 'd', y: 5, w: 'h' },
    { x: 'd', y: 5, w: 'v' },
    { x: 'd', y: 6, w: 'h' },
    { x: 'd', y: 6, w: 'v' },
    { x: 'd', y: 7, w: 'h' },
    { x: 'd', y: 7, w: 'v' },
    { x: 'd', y: 8, w: 'h' },
    { x: 'd', y: 8, w: 'v' },

    { x: 'e', y: 1, w: 'h' },
    { x: 'e', y: 1, w: 'v' },
    { x: 'e', y: 2, w: 'h' },
    { x: 'e', y: 2, w: 'v' },
    { x: 'e', y: 3, w: 'h' },
    { x: 'e', y: 3, w: 'v' },
    { x: 'e', y: 4, w: 'h' },
    { x: 'e', y: 4, w: 'v' },
    { x: 'e', y: 5, w: 'h' },
    { x: 'e', y: 5, w: 'v' },
    { x: 'e', y: 6, w: 'h' },
    { x: 'e', y: 6, w: 'v' },
    { x: 'e', y: 7, w: 'h' },
    { x: 'e', y: 7, w: 'v' },
    { x: 'e', y: 8, w: 'h' },
    { x: 'e', y: 8, w: 'v' },

    { x: 'f', y: 1, w: 'h' },
    { x: 'f', y: 1, w: 'v' },
    { x: 'f', y: 2, w: 'h' },
    { x: 'f', y: 2, w: 'v' },
    { x: 'f', y: 3, w: 'h' },
    { x: 'f', y: 3, w: 'v' },
    { x: 'f', y: 4, w: 'h' },
    { x: 'f', y: 4, w: 'v' },
    { x: 'f', y: 5, w: 'h' },
    { x: 'f', y: 5, w: 'v' },
    { x: 'f', y: 6, w: 'h' },
    { x: 'f', y: 6, w: 'v' },
    { x: 'f', y: 7, w: 'h' },
    { x: 'f', y: 7, w: 'v' },
    { x: 'f', y: 8, w: 'h' },
    { x: 'f', y: 8, w: 'v' },

    { x: 'g', y: 1, w: 'h' },
    { x: 'g', y: 1, w: 'v' },
    { x: 'g', y: 2, w: 'h' },
    { x: 'g', y: 2, w: 'v' },
    { x: 'g', y: 3, w: 'h' },
    { x: 'g', y: 3, w: 'v' },
    { x: 'g', y: 4, w: 'h' },
    { x: 'g', y: 4, w: 'v' },
    { x: 'g', y: 5, w: 'h' },
    { x: 'g', y: 5, w: 'v' },
    { x: 'g', y: 6, w: 'h' },
    { x: 'g', y: 6, w: 'v' },
    { x: 'g', y: 7, w: 'h' },
    { x: 'g', y: 7, w: 'v' },
    { x: 'g', y: 8, w: 'h' },
    { x: 'g', y: 8, w: 'v' },

    { x: 'h', y: 1, w: 'h' },
    { x: 'h', y: 1, w: 'v' },
    { x: 'h', y: 2, w: 'h' },
    { x: 'h', y: 2, w: 'v' },
    { x: 'h', y: 3, w: 'h' },
    { x: 'h', y: 3, w: 'v' },
    { x: 'h', y: 4, w: 'h' },
    { x: 'h', y: 4, w: 'v' },
    { x: 'h', y: 5, w: 'h' },
    { x: 'h', y: 5, w: 'v' },
    { x: 'h', y: 6, w: 'h' },
    { x: 'h', y: 6, w: 'v' },
    { x: 'h', y: 7, w: 'h' },
    { x: 'h', y: 7, w: 'v' },
    { x: 'h', y: 8, w: 'h' },
    { x: 'h', y: 8, w: 'v' },
  ] as WallMoveObject[];
  return allWallMoves;
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
  switch (horizontalPosition) {
    case 'a':
    case 'b':
    case 'c':
    case 'd':
    case 'e':
    case 'f':
    case 'g':
    case 'h':
      return true;
    default:
      return false;
  }
};

const isVerticalWallPosition = (
  verticalPosition: VerticalPiecePosition | VerticalWallPosition,
): verticalPosition is VerticalWallPosition => {
  switch (verticalPosition) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
      return true;
    default:
      return false;
  }
};

const isIncrementableHorizontalWallPosition = (
  horizontalPosition: HorizontalPiecePosition | HorizontalWallPosition,
): horizontalPosition is IncrementableHorizontalWallPosition => {
  switch (horizontalPosition) {
    case 'a':
    case 'b':
    case 'c':
    case 'd':
    case 'e':
    case 'f':
    case 'g':
      return true;
    default:
      return false;
  }
};

const isDecrementableHorizontalWallPosition = (
  horizontalPosition: HorizontalPiecePosition | HorizontalWallPosition,
): horizontalPosition is DecrementableHorizontalWallPosition => {
  switch (horizontalPosition) {
    case 'b':
    case 'c':
    case 'd':
    case 'e':
    case 'f':
    case 'g':
    case 'h':
      return true;
    default:
      return false;
  }
};

const isIncrementableVerticalWallPosition = (
  horizontalPosition: VerticalPiecePosition | VerticalWallPosition,
): horizontalPosition is IncrementableVerticalWallPosition => {
  switch (horizontalPosition) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
      return true;
    default:
      return false;
  }
};

const isDecrementableVerticalWallPosition = (
  horizontalPosition: VerticalPiecePosition | VerticalWallPosition,
): horizontalPosition is DecrementableVerticalWallPosition => {
  switch (horizontalPosition) {
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
      return true;
    default:
      return false;
  }
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
  switch (horizontalPiecePosition) {
    case 'a':
    case 'b':
    case 'c':
    case 'd':
    case 'e':
    case 'f':
    case 'g':
    case 'h':
      return true;
    default:
      return false;
  }
};

const isDecrementableHorizontalPiecePosition = (
  horizontalWallPosition: HorizontalPiecePosition,
): horizontalWallPosition is DecrementableHorizontalPiecePosition => {
  switch (horizontalWallPosition) {
    case 'b':
    case 'c':
    case 'd':
    case 'e':
    case 'f':
    case 'g':
    case 'h':
    case 'i':
      return true;
    default:
      return false;
  }
};

const isIncrementableVerticalPiecePosition = (
  horizontalPiecePosition: VerticalPiecePosition,
): horizontalPiecePosition is IncrementableVerticalPiecePosition => {
  switch (horizontalPiecePosition) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
      return true;
    default:
      return false;
  }
};

const isDecrementableVerticalPiecePosition = (
  horizontalPiecePosition: VerticalPiecePosition,
): horizontalPiecePosition is DecrementableVerticalPiecePosition => {
  switch (horizontalPiecePosition) {
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
      return true;
    default:
      return false;
  }
};

export const overlapsPath = (
  path: {
    x: string;
    y: number;
  }[],
  wallMove: WallPosition,
) => {
  if (
    path.some(
      (pathStep) =>
        pathStep.x === getHorizontalCoordinate(wallMove) &&
        pathStep.y === getVerticalCoordinate(wallMove),
    ) &&
    path.some(
      (pathStep) =>
        pathStep.x === getHorizontalCoordinate(wallMove) &&
        pathStep.y === getVerticalCoordinate(wallMove) + 1,
    )
  ) {
    return true;
  }
  if (
    path.some((pathStep) => {
      const horizontalWallCoordinate = getHorizontalCoordinate(wallMove);
      return (
        isIncrementableHorizontalWallPosition(horizontalWallCoordinate) &&
        pathStep.x ===
          incrementHorizontalWallPosition(horizontalWallCoordinate) &&
        pathStep.y === getVerticalCoordinate(wallMove)
      );
    }) &&
    path.some((pathStep) => {
      const horizontalWallCoordinate = getHorizontalCoordinate(wallMove);
      return (
        isIncrementableHorizontalWallPosition(horizontalWallCoordinate) &&
        pathStep.x ===
          incrementHorizontalWallPosition(horizontalWallCoordinate) &&
        pathStep.y === getVerticalCoordinate(wallMove) + 1
      );
    })
  ) {
    return true;
  }
  if (
    path.some(
      (pathStep) =>
        pathStep.x === getHorizontalCoordinate(wallMove) &&
        pathStep.y === getVerticalCoordinate(wallMove),
    ) &&
    path.some((pathStep) => {
      const horizontalWallCoordinate = getHorizontalCoordinate(wallMove);
      return (
        isIncrementableHorizontalWallPosition(horizontalWallCoordinate) &&
        pathStep.x ===
          incrementHorizontalWallPosition(horizontalWallCoordinate) &&
        pathStep.y === getVerticalCoordinate(wallMove)
      );
    })
  ) {
    return true;
  }
  if (
    path.some(
      (pathStep) =>
        pathStep.x === getHorizontalCoordinate(wallMove) &&
        pathStep.y === getVerticalCoordinate(wallMove) + 1,
    ) &&
    path.some((pathStep) => {
      const horizontalWallCoordinate = getHorizontalCoordinate(wallMove);
      return (
        isIncrementableHorizontalWallPosition(horizontalWallCoordinate) &&
        pathStep.x ===
          incrementHorizontalWallPosition(horizontalWallCoordinate) &&
        pathStep.y === getVerticalCoordinate(wallMove) + 1
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
  const thisPlayersCurrentPosition = game.playerPositions[thisTurn];
  const thatPlayersCurrentPosition = game.playerPositions[thatTurn];

  const allWallMoves = getAllWallMoves().map(
    (moveObject) => moveObjectToMove(moveObject) as WallMove,
  );

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
      return allWallMoves.filter((wallMove) => !overlapsWall(game, wallMove));
    }
  }

  const thisPlayersShortestPath = shortestPath(game, thisTurn);
  const thatPlayersShortestPath = shortestPath(game, thatTurn);
  if (thisPlayersShortestPath === null || thatPlayersShortestPath === null) {
    return [];
  }
  return allWallMoves.filter((wallMove) => {
    if (overlapsWall(game, wallMove)) return false;
    if (
      /**
       * shortestPath returns a list of moves, so it does not include the
       * initial position. We need the initial position here to check if a
       * wall blocks the first step of a path. To simplify this, consider
       * changing shortestPath to include the initial position in the path.
       */
      !overlapsPath(
        [thisPlayersCurrentPosition, ...thisPlayersShortestPath],
        wallMove,
      ) &&
      !overlapsPath(
        [thatPlayersCurrentPosition, ...thatPlayersShortestPath],
        wallMove,
      )
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
    const thisShortestPath = shortestPath(
      gameWithUnvalidatedMove,
      thisTurnAfterMove,
    );
    const thatShortestPath = shortestPath(
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
