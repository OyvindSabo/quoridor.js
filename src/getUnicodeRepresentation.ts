import { horizontalPawnCoordinates } from './consts';
import {
  Game,
  HorizontalPiecePosition,
  HorizontalWallPosition,
  PawnPosition,
  VerticalPiecePosition,
  VerticalWallPosition,
  WallPosition,
} from './types';
import {
  decrementHorizontalWallPosition,
  decrementVerticalWallPosition,
  isDecrementableHorizontalWallPosition,
  isDecrementableVerticalWallPosition,
  isHorizontalWallPosition,
  isVerticalWallPosition,
} from './utils';

const numberToLetter = (num: number) => {
  return String.fromCharCode(96 + num);
};

export const getUnicodeRepresentation = (game: Game) => {
  let board = '┌───';
  for (let wallIndex = 1; wallIndex <= 10; wallIndex++) {
    if (game.playerWallCounts[2] >= wallIndex) {
      board += '╫';
    } else {
      board += '─';
    }
    if (wallIndex === 10) {
      board += '───┐';
    } else {
      board += '───';
    }
  }
  board += '\n';
  board += '│   ';
  for (let wallIndex = 1; wallIndex <= 10; wallIndex++) {
    if (game.playerWallCounts[2] >= wallIndex) {
      board += '║';
    } else {
      board += ' ';
    }
    if (wallIndex === 10) {
      board += '   │';
    } else {
      board += '   ';
    }
  }
  board += '\n';
  board += '│   ┌───┬───┬───┬───┬───┬───┬───┬───┬───┐   │\n';
  for (let y: VerticalPiecePosition = 9; y > 0; y--) {
    let row = `│ ${y} │`;
    horizontalPawnCoordinates.forEach((x) => {
      if (game.pieceMatrix[`${x}${y}` as PawnPosition] === 0) {
        row += '   ';
      } else {
        row += ` ${game.pieceMatrix[`${x}${y}` as PawnPosition]} `;
      }
      if (
        isHorizontalWallPosition(x) &&
        ((isVerticalWallPosition(y) &&
          game.wallMatrix[`${x}${y}v` as WallPosition]) ||
          (isDecrementableVerticalWallPosition(y) &&
            game.wallMatrix[
              `${x}${decrementVerticalWallPosition(y)}v` as WallPosition
            ]))
      ) {
        row += '║';
      } else {
        row += '│';
      }
    });
    board += `${row}   │\n`;
    if (y > 1) {
      row = '│   ├';
      horizontalPawnCoordinates.forEach((x, index, array) => {
        if (
          isDecrementableVerticalWallPosition(y) &&
          ((isHorizontalWallPosition(x) &&
            game.wallMatrix[
              `${x}${decrementVerticalWallPosition(y)}h` as WallPosition
            ]) ||
            (isDecrementableHorizontalWallPosition(x) &&
              game.wallMatrix[
                `${decrementHorizontalWallPosition(
                  x,
                )}${decrementVerticalWallPosition(y)}h` as WallPosition
              ]))
        ) {
          row += '═══';
        } else {
          row += '───';
        }
        if (isHorizontalWallPosition(x)) {
          if (
            isDecrementableVerticalWallPosition(y) &&
            game.wallMatrix[
              `${x}${decrementVerticalWallPosition(y)}h` as WallPosition
            ]
          ) {
            row += '╪';
          } else if (
            isDecrementableVerticalWallPosition(y) &&
            game.wallMatrix[
              `${x}${decrementVerticalWallPosition(y)}v` as WallPosition
            ]
          ) {
            row += '╫';
          } else {
            row += '┼';
          }
        }
      });
      row += '┤';
      board += `${row}   │\n`;
    }
  }
  board += `│   └───┴───┴───┴───┴───┴───┴───┴───┴───┘   │\n│   `;
  for (let wallIndex = 1; wallIndex <= 10; wallIndex++) {
    if (game.playerWallCounts[1] >= wallIndex) {
      board += '║';
    } else {
      board += ' ';
    }
    if (wallIndex === 10) {
      board += '   │';
    } else {
      board += ` ${numberToLetter(wallIndex).toUpperCase()} `;
    }
  }
  board += '\n└───';
  for (let wallIndex = 1; wallIndex <= 10; wallIndex++) {
    if (game.playerWallCounts[1] >= wallIndex) {
      board += '╫';
    } else {
      board += `─`;
    }
    if (wallIndex === 10) {
      board += `───┘`;
    } else {
      board += `───`;
    }
  }
  return board;
};
