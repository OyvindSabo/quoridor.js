export { createGameFromMoves } from './createGameFromMoves';
export { isValidMove } from './isValidMove';
export { getUnicodeRepresentation } from './getUnicodeRepresentation';
export { makeMove } from './makeMove';
export { isGameOver } from './isGameOver';
export { getWinner } from './getWinner';
export { getValidMoveArray } from './getValidMoveArray';
export { getTurn } from './getTurn';

import { getUnicodeRepresentation } from './getUnicodeRepresentation';

/**
 * Deprecated. This function has been renamed to getUnicodeRepresentation.
 */
const getAsciiRepresentation = getUnicodeRepresentation;

export { getAsciiRepresentation };
