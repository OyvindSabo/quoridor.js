export { createNewGame } from './createNewGame';
export { createGameFromMoves } from './createGameFromMoves';
export { isMoveValid } from './isMoveValid';
export { getUnicodeRepresentation } from './getUnicodeRepresentation';
export { makeMove } from './makeMove';
export { isGameOver } from './isGameOver';
export { getWinner } from './getWinner';
export { getValidMoveArray } from './getValidMoveArray';
export { getTurn } from './getTurn';

import { getUnicodeRepresentation } from './getUnicodeRepresentation';
import { isMoveValid } from './isMoveValid';

/**
 * Deprecated. This function has been renamed to getUnicodeRepresentation.
 */
export const getAsciiRepresentation = getUnicodeRepresentation;

/**
 * Deprecated. This function has been renamed to isMoveValid.
 */
export const isValidMove = isMoveValid;
