import { Game, Move, PlayerMatrix } from './types';
import { unvalidatedMove } from './utils';

const createNewPieceMatrix = (): PlayerMatrix => ({
  a: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 },
  b: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 },
  c: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 },
  d: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 },
  e: { 1: 1, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 2 },
  f: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 },
  g: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 },
  h: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 },
  i: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 },
});

export const createNewWallMatrix = () => ({
  a: {
    1: { h: false, v: false },
    2: { h: false, v: false },
    3: { h: false, v: false },
    4: { h: false, v: false },
    5: { h: false, v: false },
    6: { h: false, v: false },
    7: { h: false, v: false },
    8: { h: false, v: false },
  },
  b: {
    1: { h: false, v: false },
    2: { h: false, v: false },
    3: { h: false, v: false },
    4: { h: false, v: false },
    5: { h: false, v: false },
    6: { h: false, v: false },
    7: { h: false, v: false },
    8: { h: false, v: false },
  },
  c: {
    1: { h: false, v: false },
    2: { h: false, v: false },
    3: { h: false, v: false },
    4: { h: false, v: false },
    5: { h: false, v: false },
    6: { h: false, v: false },
    7: { h: false, v: false },
    8: { h: false, v: false },
  },
  d: {
    1: { h: false, v: false },
    2: { h: false, v: false },
    3: { h: false, v: false },
    4: { h: false, v: false },
    5: { h: false, v: false },
    6: { h: false, v: false },
    7: { h: false, v: false },
    8: { h: false, v: false },
  },
  e: {
    1: { h: false, v: false },
    2: { h: false, v: false },
    3: { h: false, v: false },
    4: { h: false, v: false },
    5: { h: false, v: false },
    6: { h: false, v: false },
    7: { h: false, v: false },
    8: { h: false, v: false },
  },
  f: {
    1: { h: false, v: false },
    2: { h: false, v: false },
    3: { h: false, v: false },
    4: { h: false, v: false },
    5: { h: false, v: false },
    6: { h: false, v: false },
    7: { h: false, v: false },
    8: { h: false, v: false },
  },
  g: {
    1: { h: false, v: false },
    2: { h: false, v: false },
    3: { h: false, v: false },
    4: { h: false, v: false },
    5: { h: false, v: false },
    6: { h: false, v: false },
    7: { h: false, v: false },
    8: { h: false, v: false },
  },
  h: {
    1: { h: false, v: false },
    2: { h: false, v: false },
    3: { h: false, v: false },
    4: { h: false, v: false },
    5: { h: false, v: false },
    6: { h: false, v: false },
    7: { h: false, v: false },
    8: { h: false, v: false },
  },
});

export const createGameFromMoves = (moves: Move[]) => {
  const game: Game = {
    pieceMatrix: createNewPieceMatrix(),
    wallMatrix: createNewWallMatrix(),
    history: { 1: [], 2: [] },
    turn: 1,
    playerPositions: { 1: { x: 'e', y: 1 }, 2: { x: 'e', y: 9 } },
    playerWallCounts: { 1: 10, 2: 10 },
  };
  return moves.reduce((game, move) => {
    return unvalidatedMove(game, move);
  }, game);
};
