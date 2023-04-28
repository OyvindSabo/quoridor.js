export { createNewGame } from './immutable/createNewGame';
export { createGameFromMoves } from './mutable/createGameFromMoves';
export { isMoveValid } from './immutable/isMoveValid';
export { getUnicodeRepresentation } from './immutable/getUnicodeRepresentation';
export { makeMove } from './immutable/makeMove';
export { isGameOver } from './immutable/isGameOver';
export { getWinner } from './immutable/getWinner';
export { getValidMoveArray } from './immutable/getValidMoveArray';
export { getTurn } from './immutable/getTurn';
export { undo } from './immutable/undo';
export { redo } from './immutable/redo';
export { isMove } from './immutable/isMove';
export { makeUnvalidatedMove } from './immutable/makeUnvalidatedMove';
export { isMoveInteresting } from './immutable/isMoveInteresting';
export { getShortestPath } from './immutable/getShortestPath';
export { getHash } from './immutable/getHash';
export { mirrorHashHorizontally } from './immutable/mirrorHashHorizontally';
import { getUnicodeRepresentation } from './immutable/getUnicodeRepresentation';
import { isMoveValid } from './immutable/isMoveValid';
import { undo } from './immutable/undo';

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
