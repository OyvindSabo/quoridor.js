import {
  Game,
  HorizontalPosition,
  Move,
  Position,
  VerticalPosition,
  WallMove,
  PlayerMatrix,
  PiecePosition,
  PieceMove,
  HorizontalWallPosition,
  HorizontalPiecePosition,
  VerticalWallPosition,
  VerticalPiecePosition,
} from './types';

const letterToNumber = (letter: HorizontalPosition) => {
  return (letter.charCodeAt(0) - 96) as VerticalPosition;
};

const numberToLetter = (number: VerticalPosition) => {
  return String.fromCharCode(96 + number) as HorizontalPosition;
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

const unvalidatedMove = (game: Game, move: Move) => {
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

const isValidNormalMove = (
  game: Game,
  currentPosition: Position,
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
    if (!hasWallAbove(game, { x, y: y + 1 })) return false;
    if (hasWallAbove(game, currentPosition)) return false;
    if (hasWallToTheRight(game, { x, y: y + 1 })) return false;
    return true;
  }
  if (
    isUpRightMove(currentPosition, move) &&
    hasOpponentAbove(game, currentPosition)
  ) {
    if (!hasWallAbove(game, { x, y: y + 1 })) return false;
    if (hasWallAbove(game, currentPosition)) return false;
    if (hasWallToTheLeft(game, { x, y: y + 1 })) return false;
    return true;
  }

  // If right move
  if (isSingleRightMove(currentPosition, move)) {
    if (hasWallToTheRight(game, currentPosition)) return false;
    return true;
  }
  if (
    isDoubleRightMove(currentPosition, move) &&
    this._hasOpponentToTheRight(currentPosition)
  ) {
    if (this._hasWallToTheRight(currentPosition)) return false;
    if (this._hasWallToTheRight({ x: this._incrementLetter(x), y }))
      return false;
    return true;
  }
  if (
    this._isRightUpMove(currentPosition, move) &&
    this._hasOpponentToTheRight(currentPosition)
  ) {
    if (!this._hasWallToTheRight({ x: this._incrementLetter(x), y }))
      return false;
    if (this._hasWallToTheRight(currentPosition)) return false;
    if (this._hasWallAbove({ x: this._incrementLetter(x), y })) return false;
    return true;
  }
  if (
    this._isRightDownMove(currentPosition, move) &&
    this._hasOpponentToTheRight(currentPosition)
  ) {
    if (!this._hasWallToTheRight({ x: this._incrementLetter(x), y }))
      return false;
    if (this._hasWallToTheRight(currentPosition)) return false;
    if (this._hasWallBelow({ x: this._incrementLetter(x), y })) return false;
    return true;
  }

  // If down move
  if (this._isSingleDownMove(currentPosition, move)) {
    if (this._hasWallBelow({ x, y: y })) return false;
    return true;
  }
  if (
    this._isDoubleDownMove(currentPosition, move) &&
    this._hasOpponentBelow(currentPosition)
  ) {
    if (this._hasWallBelow(currentPosition)) return false;
    if (this._hasWallBelow({ x, y: y - 1 })) return false;
    return true;
  }
  if (
    this._isDownRightMove(currentPosition, move) &&
    this._hasOpponentBelow(currentPosition)
  ) {
    if (!this._hasWallBelow({ x, y: y - 1 })) return false;
    if (this._hasWallBelow(currentPosition)) return false;
    if (this._hasWallToTheRight({ x, y: y - 1 })) return false;
    return true;
  }
  if (
    this._isDownLeftMove(currentPosition, move) &&
    this._hasOpponentBelow(currentPosition)
  ) {
    if (!this._hasWallBelow({ x, y: y - 1 })) return false;
    if (this._hasWallBelow(currentPosition)) return false;
    if (this._hasWallToTheLeft({ x, y: y - 1 })) return false;
    return true;
  }

  // If left move
  if (this._isSingleLeftMove(currentPosition, move)) {
    if (this._hasWallToTheLeft(currentPosition)) return false;
    return true;
  }
  if (
    this._isDoubleLeftMove(currentPosition, move) &&
    this._hasOpponentToTheLeft(currentPosition)
  ) {
    if (this._hasWallToTheLeft(currentPosition)) return false;
    if (this._hasWallToTheLeft({ x: this._decrementLetter(x), y }))
      return false;
    return true;
  }
  if (
    this._isLeftDownMove(currentPosition, move) &&
    this._hasOpponentToTheLeft(currentPosition)
  ) {
    if (!this._hasWallToTheLeft({ x: this._decrementLetter(x), y }))
      return false;
    if (this._hasWallToTheLeft(currentPosition)) return false;
    if (this._hasWallBelow({ x: this._decrementLetter(x), y })) return false;
    return true;
  }
  if (
    this._isLeftUpMove(currentPosition, move) &&
    this._hasOpponentToTheLeft(currentPosition)
  ) {
    if (!this._hasWallToTheLeft({ x: this._decrementLetter(x), y }))
      return false;
    if (this._hasWallToTheLeft(currentPosition)) return false;
    if (this._hasWallAbove({ x: this._decrementLetter(x), y })) return false;
    return true;
  }

  return false;
};

export const isValidMove = (
  game: Game,
  currentPosition: Position,
  move: Move,
) => {
  // Handle wall moves
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
