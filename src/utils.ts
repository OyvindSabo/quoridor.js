import { aStar, QuoridorNode } from './aStar';
import { getTurn } from './getTurn';
import {
  Board,
  Game,
  HorizontalPiecePosition,
  HorizontalWallPosition,
  Move,
  MoveObject,
  PawnMove,
  PawnPosition,
  Player,
  PlayerMatrix,
  VerticalPiecePosition,
  VerticalWallPosition,
  WallMove,
  WallMoveObject,
  WallOrientation,
} from './types';

export const getHorizontalCoordinate = (move: Move) => {
  return move.charAt(0) as HorizontalPiecePosition | HorizontalWallPosition;
};

export const getVerticalCoordinate = (move: Move) => {
  return parseInt(move.charAt(1), 10) as
    | VerticalPiecePosition
    | VerticalWallPosition;
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
  horizontalWallPosition: HorizontalWallPosition,
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
  throw Error(`${horizontalWallPosition} cannot be decremented.`);
};

const decrementHorizontalPiecePosition = (
  horizontalPiecePosition: HorizontalPiecePosition,
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
  throw Error(`${horizontalPiecePosition} cannot be decremented.`);
};

const incrementHorizontalWallPosition = (
  horizontalWallPosition: HorizontalWallPosition,
) => {
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
  throw Error(`${horizontalWallPosition} cannot be incremented.`);
};

const incrementHorizontalPiecePosition = (
  horizontalPiecePosition: HorizontalPiecePosition,
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
  throw Error(`${horizontalPiecePosition} cannot be incremented.`);
};

const decrementVerticalWallPosition = (
  verticalWallPosition: VerticalWallPosition,
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
  throw Error(`${verticalWallPosition} cannot be decremented.`);
};

const decrementVerticalPiecePosition = (
  verticalPiecePosition: VerticalPiecePosition,
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
  throw Error(`${verticalPiecePosition} cannot be decremented.`);
};

const incrementVerticalWallPosition = (
  verticalWallPosition: VerticalWallPosition,
) => {
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
  throw Error(`${verticalWallPosition} cannot be incremented.`);
};

const incrementVerticalPiecePosition = (
  verticalPiecePosition: VerticalPiecePosition,
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
  throw Error(`${verticalPiecePosition} cannot be incremented.`);
};

const isHorizontalWallMove = (wallMove: WallMove) => {
  return wallMove.charAt(2) === 'h';
};

const isVerticalWallMove = (wallMove: WallMove) => {
  return wallMove.charAt(2) === 'v';
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
        game.wallMatrix[decrementHorizontalWallPosition(x)][y].h) ||
      (letterToNumber(x) < 8 &&
        game.wallMatrix[incrementHorizontalWallPosition(x)][y].h)
    ) {
      return true;
    }
  }
  if (isVerticalWallMove(wallMove)) {
    if (
      game.wallMatrix[x][y].h ||
      game.wallMatrix[x][y].v ||
      (y > 1 && game.wallMatrix[x][decrementVerticalWallPosition(y)].v) ||
      (y < 8 && game.wallMatrix[x][incrementVerticalWallPosition(y)].v)
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

export const unvalidatedMove = (game: Game, move: Move): Game => {
  const currentPosition = game.playerPositions[getTurn(game)];
  if (isWallPosition(move)) {
    // If wall move
    return {
      ...game,
      board: { ...game.board, [move]: true },
      wallMatrix: {
        ...game.wallMatrix,
        [getHorizontalCoordinate(move)]: {
          ...game.wallMatrix[
            getHorizontalCoordinate(move) as HorizontalWallPosition
          ],
          [getVerticalCoordinate(move)]: {
            ...game.wallMatrix[
              getHorizontalCoordinate(move) as HorizontalWallPosition
            ][getVerticalCoordinate(move) as VerticalWallPosition],
            [getWallOrientation(move)]: true,
          },
        },
      },
      playerWallCounts: {
        ...game.playerWallCounts,
        [getTurn(game)]: game.playerWallCounts[getTurn(game)] - 1,
      },
      playerPositions: {
        ...game.playerPositions,
        [getTurn(game)]: {
          ...game.playerPositions[getTurn(game)],
          previousPosition: game.playerPositions[getTurn(game)],
        },
      },
      history: [...game.history, move],
    };
  } else {
    const pieceMatrixWithRemovedPiece = {
      ...game.pieceMatrix,
      [currentPosition.x]: {
        ...game.pieceMatrix[currentPosition.x],
        [currentPosition.y]: 0, // Remove piece from previous position
      },
    } as PlayerMatrix;
    return {
      ...game,
      board: Object.fromEntries(
        Object.entries(game.board).map(([pos, val]) => [
          pos,
          pos === move ? getTurn(game) : val === getTurn(game) ? null : val,
        ]),
      ) as Board,
      playerPositions: {
        ...game.playerPositions,
        [getTurn(game)]: {
          x: getHorizontalCoordinate(move),
          y: getVerticalCoordinate(move),
          previousPosition: game.playerPositions[getTurn(game)],
        },
      },
      history: [...game.history, move],
      pieceMatrix: {
        ...pieceMatrixWithRemovedPiece,
        [getHorizontalCoordinate(move)]: {
          ...pieceMatrixWithRemovedPiece[getHorizontalCoordinate(move)],
          [getVerticalCoordinate(move)]: getTurn(game), // Add piece to new position
        },
      },
    };
  }
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
  if (
    game.wallMatrix[getHorizontalCoordinate(move) as HorizontalWallPosition][
      getVerticalCoordinate(move) as VerticalWallPosition
    ].h ||
    (letterToNumber(getHorizontalCoordinate(move) as HorizontalPiecePosition) >
      1 &&
      game.wallMatrix[
        decrementHorizontalPiecePosition(
          getHorizontalCoordinate(move),
        ) as HorizontalWallPosition
      ][getVerticalCoordinate(move) as VerticalWallPosition].h)
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
  if (
    game.pieceMatrix[getHorizontalCoordinate(position)][
      incrementVerticalPiecePosition(getVerticalCoordinate(position))
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
  if (
    (getVerticalCoordinate(move) < 9 &&
      game.wallMatrix[getHorizontalCoordinate(move) as HorizontalWallPosition][
        getVerticalCoordinate(move) as VerticalWallPosition
      ].v) ||
    (getVerticalCoordinate(move) > 1 &&
      game.wallMatrix[getHorizontalCoordinate(move) as HorizontalWallPosition][
        (getVerticalCoordinate(move) - 1) as VerticalWallPosition
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
  if (
    (getVerticalCoordinate(move) < 9 &&
      game.wallMatrix[
        decrementHorizontalPiecePosition(
          getHorizontalCoordinate(move),
        ) as HorizontalWallPosition
      ][getVerticalCoordinate(move) as VerticalWallPosition].v) ||
    (getVerticalCoordinate(move) > 1 &&
      game.wallMatrix[
        decrementHorizontalPiecePosition(getHorizontalCoordinate(move))
      ][(getVerticalCoordinate(move) - 1) as VerticalWallPosition].v)
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
    game.pieceMatrix[
      incrementHorizontalPiecePosition(getHorizontalCoordinate(position))
    ][getVerticalCoordinate(position)] === getOppositePlayer(getTurn(game))
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
  if (
    game.wallMatrix[getHorizontalCoordinate(move) as HorizontalWallPosition][
      (getVerticalCoordinate(move) - 1) as VerticalWallPosition
    ].h ||
    (letterToNumber(getHorizontalCoordinate(move)) > 1 &&
      game.wallMatrix[
        decrementHorizontalPiecePosition(getHorizontalCoordinate(move))
      ][(getVerticalCoordinate(move) - 1) as VerticalWallPosition].h)
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
    game.pieceMatrix[getHorizontalCoordinate(position)][
      decrementVerticalPiecePosition(getVerticalCoordinate(position))
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
  if (
    game.pieceMatrix[
      decrementHorizontalPiecePosition(getHorizontalCoordinate(position))
    ][getVerticalCoordinate(position)] === getOppositePlayer(getTurn(game))
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
      !hasWallAbove(
        game,
        moveObjectToMove({
          x,
          y: incrementVerticalPiecePosition(y),
        }) as PawnPosition,
      )
    )
      return false;
    if (hasWallAbove(game, currentPosition)) return false;
    if (
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
      !hasWallAbove(
        game,
        moveObjectToMove({
          x,
          y: incrementVerticalPiecePosition(y),
        }) as PawnMove,
      )
    )
      return false;
    if (hasWallAbove(game, currentPosition)) return false;
    if (
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
      !hasWallToTheRight(
        game,
        moveObjectToMove({
          x: incrementHorizontalPiecePosition(x),
          y,
        }) as PawnMove,
      )
    )
      return false;
    if (hasWallToTheRight(game, currentPosition)) return false;
    if (
      hasWallAbove(
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
    isRightDownMove(currentPosition, move) &&
    hasOpponentToTheRight(game, currentPosition)
  ) {
    if (
      !hasWallToTheRight(
        game,
        moveObjectToMove({
          x: incrementHorizontalPiecePosition(x),
          y,
        }) as PawnMove,
      )
    )
      return false;
    if (hasWallToTheRight(game, currentPosition)) return false;
    if (
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
      !hasWallBelow(
        game,
        moveObjectToMove({
          x,
          y: decrementVerticalPiecePosition(y),
        }) as PawnMove,
      )
    )
      return false;
    if (hasWallBelow(game, currentPosition)) return false;
    if (
      hasWallToTheRight(
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
    isDownLeftMove(currentPosition, move) &&
    hasOpponentBelow(game, currentPosition)
  ) {
    if (
      !hasWallBelow(
        game,
        moveObjectToMove({
          x,
          y: decrementVerticalPiecePosition(y),
        }) as PawnMove,
      )
    )
      return false;
    if (hasWallBelow(game, currentPosition)) return false;
    if (
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
      !hasWallToTheLeft(
        game,
        moveObjectToMove({
          x: decrementHorizontalPiecePosition(x),
          y,
        }) as PawnMove,
      )
    )
      return false;
    if (hasWallToTheLeft(game, currentPosition)) return false;
    if (
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
      !hasWallToTheLeft(
        game,
        moveObjectToMove({
          x: decrementHorizontalPiecePosition(x),
          y,
        }) as PawnMove,
      )
    )
      return false;
    if (hasWallToTheLeft(game, currentPosition)) return false;
    if (
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

export const shortestPath = (game: Game, player: Player) => {
  return aStar(game.pieceMatrix, game.wallMatrix, player);
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
      (y > 1 && game.wallMatrix[x][decrementVerticalWallPosition(y)].v) ||
      (y < 8 && game.wallMatrix[x][incrementVerticalWallPosition(y)].v)
    ) {
      return true;
    }
  }
  return false;
};

export const getValidWallMoveArray = (game: Game) => {
  if (game.playerWallCounts[getTurn(game)] < 1) {
    return [];
  }
  return getAllWallMoves()
    .map((moveObject) => moveObjectToMove(moveObject) as WallMove)
    .filter((wallMove) => {
      if (overlapsWall(game, wallMove)) return false;
      const gameWithUnvalidatedMove = unvalidatedMove(game, wallMove);
      const thisTurn = getTurn(game);
      const thatTurn = getOppositePlayer(getTurn(game));
      const thisShortestPath = shortestPath(gameWithUnvalidatedMove, thisTurn);
      const thatShortestPath = shortestPath(gameWithUnvalidatedMove, thatTurn);
      return Boolean(thisShortestPath && thatShortestPath);
    });
};
