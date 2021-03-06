export { createNewGame } from './createNewGame';
export { createGameFromMoves } from './createGameFromMoves';
export { isMoveValid } from './isMoveValid';
export { getUnicodeRepresentation } from './getUnicodeRepresentation';
export { makeMove } from './makeMove';
export { isGameOver } from './isGameOver';
export { getWinner } from './getWinner';
export { getValidMoveArray } from './getValidMoveArray';
export { getTurn } from './getTurn';
export { undo } from './undo';
export { redo } from './redo';
export { isMove } from './isMove';
export { makeUnvalidatedMove } from './makeUnvalidatedMove';
export { isMoveInteresting } from './isMoveInteresting';
export { getShortestPath } from './getShortestPath';
export { getHash } from './getHash';
export { mirrorHashHorizontally } from './mirrorHashHorizontally';
import { getUnicodeRepresentation } from './getUnicodeRepresentation';
import { isMoveValid } from './isMoveValid';
import { undo } from './undo';

/**
 * Deprecated. This function has been renamed to getUnicodeRepresentation.
 */
export const getAsciiRepresentation = getUnicodeRepresentation;

/**
 * Deprecated. This function has been renamed to isMoveValid.
 */
export const isValidMove = isMoveValid;

/**
 * Deprecated. This function has been renamed to undo.
 */
export const undoLastMove = undo;
