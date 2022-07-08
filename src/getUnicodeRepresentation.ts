import { horizontalPawnCoordinates } from './consts';
import { Game, PawnPosition, VerticalPiecePosition } from './types';
import {
  hasWallBelow,
  hasWallToTheRight,
  isHorizontallyDecrementableWallPosition,
  isHorizontalWallCoordinate,
  isVerticallyDecrementableWallPosition,
  isWallPosition,
  moveWallDown,
  moveWallLeft,
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
    for (const x of horizontalPawnCoordinates) {
      const pawnPosition = `${x}${y}` as PawnPosition;
      const verticalWallPosition = `${x}${y}v`;
      if (game.board[pawnPosition] === null) {
        row += '   ';
      } else {
        row += ` ${game.board[pawnPosition]} `;
      }
      if (
        isWallPosition(verticalWallPosition) &&
        hasWallToTheRight(game, pawnPosition)
      ) {
        row += '║';
      } else {
        row += '│';
      }
    }
    board += `${row}   │\n`;
    if (y > 1) {
      row = '│   ├';
      for (const x of horizontalPawnCoordinates) {
        const horizontalWallPosition = `${x}${y}h`;
        const pawnPosition = `${x}${y}` as PawnPosition;
        if (hasWallBelow(game, pawnPosition)) {
          row += '═══';
        } else {
          row += '───';
        }
        if (isHorizontalWallCoordinate(x)) {
          if (
            isWallPosition(horizontalWallPosition) &&
            isVerticallyDecrementableWallPosition(horizontalWallPosition) &&
            game.board[moveWallDown(horizontalWallPosition)]
          ) {
            row += '╪';
          } else if (hasWallToTheRight(game, pawnPosition)) {
            row += '╫';
            // Here we don't need to check for horizontal specifically. The x
            // coordinate is all that matters.
          } else {
            row += '┼';
          }
        }
      }
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
