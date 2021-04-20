import {
  Game,
  Move,
  WallMove,
  PlayerMatrix,
  PiecePosition,
  PieceMove,
  HorizontalWallPosition,
  HorizontalPiecePosition,
  VerticalWallPosition,
  VerticalPiecePosition,
  Player,
} from './types';
import { aStar } from './aStar';

const letterToNumber = (letter: HorizontalPiecePosition) => {
  return (letter.charCodeAt(0) - 96) as VerticalPiecePosition;
};

const numberToLetter = (number: VerticalPiecePosition) => {
  return String.fromCharCode(96 + number) as HorizontalPiecePosition;
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

const doesWallMoveOverlapExistingWall = (game: Game, wallMove: WallMove) => {
  const x = wallMove.x;
  const y = wallMove.y;
  if (wallMove.w === 'h') {
    // A horizontal wall
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
  if (wallMove.w === 'v') {
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

const isWallMove = (move: Move): move is WallMove => {
  return Boolean((move as WallMove).w);
};

const getOppositePlayer = (player: Player) => {
  return player === 1 ? 2 : 1;
};

export const unvalidatedMove = (game: Game, move: Move): Game => {
  const currentPosition = game.playerPositions[game.turn];
  if (isWallMove(move)) {
    // If wall move
    game.wallMatrix[move.x][move.y][move.w] = true;
    game.playerWallCounts[game.turn]--;
    return {
      ...game,
      wallMatrix: {
        ...game.wallMatrix,
        [move.x]: {
          ...game.wallMatrix[move.x],
          [move.y]: {
            ...game.wallMatrix[move.x][move.y],
            [move.w]: true,
          },
        },
      },
      playerWallCounts: {
        ...game.playerWallCounts,
        [game.turn]: game.playerWallCounts[game.turn] - 1,
      },
      history: {
        ...game.history,
        [game.turn]: [...game.history[game.turn], move],
      },
      turn: game.turn === 1 ? 2 : 1,
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
      playerPositions: {
        ...game.playerPositions,
        [game.turn]: {
          ...move,
          previousPosition: game.playerPositions[game.turn],
        },
      },
      history: {
        ...game.history,
        [game.turn]: [...game.history[game.turn], move],
      },
      pieceMatrix: {
        ...pieceMatrixWithRemovedPiece,
        [move.x]: {
          ...pieceMatrixWithRemovedPiece[move.x],
          [move.y]: game.turn, // Add piece to new position
        },
      },
      turn: getOppositePlayer(game.turn),
    };
  }
};

const isSingleUpMove = (currentPosition: PiecePosition, move: PieceMove) => {
  if (currentPosition.y - move.y === -1 && currentPosition.x === move.x) {
    return true;
  }
  return false;
};

const hasWallAbove = (game: Game, { x, y }: PiecePosition) => {
  if (
    game.wallMatrix[x as HorizontalWallPosition][y as VerticalWallPosition].h ||
    (letterToNumber(x) > 1 &&
      game.wallMatrix[
        decrementHorizontalPiecePosition(x) as HorizontalWallPosition
      ][y as VerticalWallPosition].h)
  ) {
    return true;
  }
  return false;
};

const isDoubleUpMove = (currentPosition: PiecePosition, move: PieceMove) => {
  if (
    letterToNumber(currentPosition.x) - letterToNumber(move.x) == -2 &&
    currentPosition.x === move.x
  ) {
    return true;
  }
  return false;
};

const hasOpponentAbove = (game: Game, position: PiecePosition) => {
  if (
    game.pieceMatrix[position.x][incrementVerticalPiecePosition(position.y)] ===
    getOppositePlayer(game.turn)
  ) {
    return true;
  }
  return false;
};

const isUpLeftMove = (currentPosition: PiecePosition, move: PieceMove) => {
  if (
    currentPosition.y - move.y === -1 &&
    letterToNumber(currentPosition.x) - letterToNumber(move.x) === 1
  ) {
    return true;
  }
  return false;
};

const hasWallToTheRight = (game: Game, { x, y }: PiecePosition) => {
  if (
    (y < 9 &&
      game.wallMatrix[x as HorizontalWallPosition][y as VerticalWallPosition]
        .v) ||
    (y > 1 &&
      game.wallMatrix[x as HorizontalWallPosition][
        (y - 1) as VerticalWallPosition
      ].v)
  ) {
    return true;
  }
};

const isUpRightMove = (currentPosition: PiecePosition, move: PieceMove) => {
  if (
    currentPosition.y - move.y === -1 &&
    letterToNumber(currentPosition.x) - letterToNumber(move.x) === -1
  ) {
    return true;
  }
  return false;
};

// Why do I have this one that is almost identical to the previous one? I don't know.
const isRightUpMove = (currentPosition: PiecePosition, move: PieceMove) => {
  if (
    currentPosition.y - move.y === -1 &&
    letterToNumber(currentPosition.x) - letterToNumber(move.x) === -1
  ) {
    return true;
  }
  return false;
};

const hasWallToTheLeft = (game: Game, { x, y }: PieceMove) => {
  if (
    (y < 9 &&
      game.wallMatrix[
        decrementHorizontalPiecePosition(x) as HorizontalWallPosition
      ][y as VerticalWallPosition].v) ||
    (y > 1 &&
      game.wallMatrix[decrementHorizontalPiecePosition(x)][
        (y - 1) as VerticalWallPosition
      ].v)
  ) {
    return true;
  }
  return false;
};

const isSingleRightMove = (currentPosition: PiecePosition, move: PieceMove) => {
  if (
    letterToNumber(currentPosition.x) - letterToNumber(move.x) == -1 &&
    currentPosition.y === move.y
  ) {
    return true;
  }
  return false;
};

const isDoubleRightMove = (currentPosition: PiecePosition, move: PieceMove) => {
  if (
    letterToNumber(currentPosition.x) - letterToNumber(move.x) == -2 &&
    currentPosition.y === move.y
  ) {
    return true;
  }
  return false;
};

const hasOpponentToTheRight = (game: Game, position: PiecePosition) => {
  if (
    game.pieceMatrix[incrementHorizontalPiecePosition(position.x)][
      position.y
    ] === getOppositePlayer(game.turn)
  ) {
    return true;
  }
  return false;
};

const isRightDownMove = (currentPosition: PiecePosition, move: PieceMove) => {
  if (
    currentPosition.y - move.y === 1 &&
    letterToNumber(currentPosition.x) - letterToNumber(move.x) === -1
  ) {
    return true;
  }
  return false;
};

const hasWallBelow = (game: Game, { x, y }: PieceMove) => {
  if (
    game.wallMatrix[x as HorizontalWallPosition][
      (y - 1) as VerticalWallPosition
    ].h ||
    (letterToNumber(x) > 1 &&
      game.wallMatrix[decrementHorizontalPiecePosition(x)][
        (y - 1) as VerticalWallPosition
      ].h)
  ) {
    return true;
  }
  return false;
};

const isSingleDownMove = (currentPosition: PiecePosition, move: PieceMove) => {
  if (currentPosition.y - move.y === 1 && currentPosition.x === move.x) {
    return true;
  }
  return false;
};

const isDoubleDownMove = (currentPosition: PiecePosition, move: PieceMove) => {
  if (currentPosition.y - move.y === 2 && currentPosition.x === move.x) {
    return true;
  }
  return false;
};

const hasOpponentBelow = (game: Game, position: PiecePosition) => {
  if (
    game.pieceMatrix[position.x][decrementVerticalPiecePosition(position.y)] ===
    getOppositePlayer(game.turn)
  ) {
    return true;
  }
  return false;
};

const isDownRightMove = (currentPosition: PiecePosition, move: PieceMove) => {
  if (
    currentPosition.y - move.y === 1 &&
    letterToNumber(currentPosition.x) - letterToNumber(move.x) === -1
  ) {
    return true;
  }
  return false;
};

const isDownLeftMove = (currentPosition: PiecePosition, move: PieceMove) => {
  if (
    currentPosition.y - move.y === 1 &&
    letterToNumber(currentPosition.x) - letterToNumber(move.x) === 1
  ) {
    return true;
  }
  return false;
};

const isSingleLeftMove = (currentPosition: PiecePosition, move: PieceMove) => {
  if (
    letterToNumber(currentPosition.x) - letterToNumber(move.x) == 1 &&
    currentPosition.y === move.y
  ) {
    return true;
  }
  return false;
};

const isDoubleLeftMove = (currentPosition: PiecePosition, move: PieceMove) => {
  if (
    letterToNumber(currentPosition.x) - letterToNumber(move.x) == 2 &&
    currentPosition.y === move.y
  ) {
    return true;
  }
  return false;
};

const hasOpponentToTheLeft = (game: Game, position: PiecePosition) => {
  if (
    game.pieceMatrix[decrementHorizontalPiecePosition(position.x)][
      position.y
    ] === getOppositePlayer(game.turn)
  ) {
    return true;
  }
  return false;
};

const isLeftDownMove = (currentPosition: PiecePosition, move: PieceMove) => {
  if (
    currentPosition.y - move.y === 1 &&
    letterToNumber(currentPosition.x) - letterToNumber(move.x) === 1
  ) {
    return true;
  }
  return false;
};

// Why do I have isLeftUpMove when I already have isUpLeftMove? I don't know.
const isLeftUpMove = (currentPosition: PiecePosition, move: PieceMove) => {
  if (
    currentPosition.y - move.y === -1 &&
    letterToNumber(currentPosition.x) - letterToNumber(move.x) === 1
  ) {
    return true;
  }
  return false;
};

const isValidNormalMove = (
  game: Game,
  currentPosition: PiecePosition,
  move: Move,
) => {
  const x = currentPosition.x;
  const y = currentPosition.y;

  // If move is outside board
  if (letterToNumber(move.x) < 1 || letterToNumber(move.x) > 9) return false;
  if (move.y < 1 || move.y > 9) return false;

  // If the move lands on top of the opponent
  if (game.pieceMatrix[move.x][move.y] === getOppositePlayer(game.turn)) {
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
    if (hasWallAbove(game, { x, y: incrementVerticalPiecePosition(y) }))
      return false;
    return true;
  }
  if (
    isUpLeftMove(currentPosition, move) &&
    hasOpponentAbove(game, currentPosition)
  ) {
    if (!hasWallAbove(game, { x, y: incrementVerticalPiecePosition(y) }))
      return false;
    if (hasWallAbove(game, currentPosition)) return false;
    if (hasWallToTheRight(game, { x, y: incrementVerticalPiecePosition(y) }))
      return false;
    return true;
  }
  if (
    isUpRightMove(currentPosition, move) &&
    hasOpponentAbove(game, currentPosition)
  ) {
    if (!hasWallAbove(game, { x, y: incrementVerticalPiecePosition(y) }))
      return false;
    if (hasWallAbove(game, currentPosition)) return false;
    if (hasWallToTheLeft(game, { x, y: incrementVerticalPiecePosition(y) }))
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
    if (hasWallToTheRight(game, { x: incrementHorizontalPiecePosition(x), y }))
      return false;
    return true;
  }
  if (
    isRightUpMove(currentPosition, move) &&
    hasOpponentToTheRight(game, currentPosition)
  ) {
    if (!hasWallToTheRight(game, { x: incrementHorizontalPiecePosition(x), y }))
      return false;
    if (hasWallToTheRight(game, currentPosition)) return false;
    if (hasWallAbove(game, { x: incrementHorizontalPiecePosition(x), y }))
      return false;
    return true;
  }
  if (
    isRightDownMove(currentPosition, move) &&
    hasOpponentToTheRight(game, currentPosition)
  ) {
    if (!hasWallToTheRight(game, { x: incrementHorizontalPiecePosition(x), y }))
      return false;
    if (hasWallToTheRight(game, currentPosition)) return false;
    if (hasWallBelow(game, { x: incrementHorizontalPiecePosition(x), y }))
      return false;
    return true;
  }

  // If down move
  if (isSingleDownMove(currentPosition, move)) {
    if (hasWallBelow(game, { x, y: y })) return false;
    return true;
  }
  if (
    isDoubleDownMove(currentPosition, move) &&
    hasOpponentBelow(game, currentPosition)
  ) {
    if (hasWallBelow(game, currentPosition)) return false;
    if (hasWallBelow(game, { x, y: decrementVerticalPiecePosition(y) }))
      return false;
    return true;
  }
  if (
    isDownRightMove(currentPosition, move) &&
    hasOpponentBelow(game, currentPosition)
  ) {
    if (!hasWallBelow(game, { x, y: decrementVerticalPiecePosition(y) }))
      return false;
    if (hasWallBelow(game, currentPosition)) return false;
    if (hasWallToTheRight(game, { x, y: decrementVerticalPiecePosition(y) }))
      return false;
    return true;
  }
  if (
    isDownLeftMove(currentPosition, move) &&
    hasOpponentBelow(game, currentPosition)
  ) {
    if (!hasWallBelow(game, { x, y: decrementVerticalPiecePosition(y) }))
      return false;
    if (hasWallBelow(game, currentPosition)) return false;
    if (hasWallToTheLeft(game, { x, y: decrementVerticalPiecePosition(y) }))
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
    if (hasWallToTheLeft(game, { x: decrementHorizontalPiecePosition(x), y }))
      return false;
    return true;
  }
  if (
    isLeftDownMove(currentPosition, move) &&
    hasOpponentToTheLeft(game, currentPosition)
  ) {
    if (!hasWallToTheLeft(game, { x: decrementHorizontalPiecePosition(x), y }))
      return false;
    if (hasWallToTheLeft(game, currentPosition)) return false;
    if (hasWallBelow(game, { x: decrementHorizontalPiecePosition(x), y }))
      return false;
    return true;
  }
  if (
    isLeftUpMove(currentPosition, move) &&
    hasOpponentToTheLeft(game, currentPosition)
  ) {
    if (!hasWallToTheLeft(game, { x: decrementHorizontalPiecePosition(x), y }))
      return false;
    if (hasWallToTheLeft(game, currentPosition)) return false;
    if (hasWallAbove(game, { x: decrementHorizontalPiecePosition(x), y }))
      return false;
    return true;
  }

  return false;
};

const shortestPath = (game: Game, player: Player) => {
  return aStar(game.pieceMatrix, game.wallMatrix, player);
};

export const isValidMove = (game: Game, move: Move) => {
  // Handle wall moves
  const currentPosition = game.playerPositions[game.turn];
  if (isWallMove(move)) {
    if (game.playerWallCounts[game.turn] < 1) return false; // Check that player has enough walls
    if (doesWallMoveOverlapExistingWall(game, move)) return false; // Check that wall does not overlap other walls
    const gameWithUnvalidatedMove = unvalidatedMove(game, move);
    if (
      shortestPath(gameWithUnvalidatedMove, game.turn) &&
      shortestPath(gameWithUnvalidatedMove, getOppositePlayer(game.turn))
    ) {
      return true;
    }
    return false;
  }
  return isValidNormalMove(game, currentPosition, move);
};
