import {
  Game,
  HorizontalPiecePosition,
  HorizontalWallPosition,
  VerticalPiecePosition,
  VerticalWallPosition,
} from './types';

const numberToLetter = (num: number) => {
  return String.fromCharCode(96 + num);
};

export const getAsciiRepresentation = (game: Game) => {
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
    Object.keys(game.pieceMatrix)
      .map((x) => x as HorizontalPiecePosition)
      .forEach((x) => {
        if (game.pieceMatrix[x][y] === 0) {
          row += '   ';
        } else {
          row += ` ${game.pieceMatrix[x][y]} `;
        }
        if (
          x !== 'i' &&
          ((y < 9 &&
            game.wallMatrix[x as HorizontalWallPosition][
              y as VerticalWallPosition
            ].v) ||
            (y > 1 &&
              game.wallMatrix[x as HorizontalWallPosition][
                (y - 1) as VerticalWallPosition
              ].v))
        ) {
          row += '║';
        } else {
          row += '│';
        }
      });
    board += `${row}   │\n`;
    if (y > 1) {
      row = '│   ├';
      Object.keys(game.pieceMatrix)
        .map((x) => x as HorizontalPiecePosition)
        .forEach((x, index, array) => {
          if (
            y < 9 &&
            ((x !== 'i' &&
              game.wallMatrix[x][(y - 1) as VerticalWallPosition].h) ||
              (x !== 'a' &&
                game.wallMatrix[array[index - 1] as HorizontalWallPosition][
                  (y - 1) as VerticalWallPosition
                ].h))
          ) {
            row += '═══';
          } else {
            row += '───';
          }
          if (x !== 'i') {
            if (
              y < 9 &&
              game.wallMatrix[x][(y - 1) as VerticalWallPosition].h
            ) {
              row += '╪';
            } else if (
              y > 1 &&
              game.wallMatrix[x][(y - 1) as VerticalWallPosition].v
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
