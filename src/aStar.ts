import {
  PlayerMatrix,
  Player,
  WallMatrix,
  HorizontalPiecePosition,
} from './types';

/*******************************************************************************
 * Utility functions for the aStar function and the Node
 ******************************************************************************/

export class QuoridorNode {
  _value: Player;
  _coordinates: { x: number; y: number };
  _distanceFromStart: number;
  _distanceToGoal?: number;
  _neighbours: QuoridorNode[]; // A bit unsure if this is the right type
  _reachedFrom?: QuoridorNode;
  constructor(y: number, x: number, value: Player) {
    this._value = value;
    this._coordinates = { y, x };
    this._distanceFromStart = Infinity;
    this._neighbours = [];
  }
  get distanceFromStart() {
    return this._distanceFromStart;
  }
  set distanceFromStart(distance) {
    this._distanceFromStart = distance;
  }
  get distanceToGoal() {
    return this._distanceToGoal;
  }
  set distanceToGoal(distance) {
    this._distanceToGoal = distance;
  }
  get reachedFrom() {
    return this._reachedFrom;
  }
  set reachedFrom(node) {
    this._reachedFrom = node;
  }
  get coordinates() {
    return this._coordinates;
  }
  get neighbours() {
    return this._neighbours;
  }
  addNeighbour(neighbour: QuoridorNode) {
    this._neighbours.push(neighbour);
  }
  get value() {
    return this._value;
  }
  set value(value) {
    this._value = value;
  }
  relax() {
    const cost = { 0: 1, 1: 0, 2: 0 };
    for (const neighbourNode of this._neighbours) {
      if (
        (neighbourNode.distanceFromStart &&
          neighbourNode.distanceFromStart >
            this.distanceFromStart + 1 + cost[this._value]) ||
        !neighbourNode.distanceFromStart
      ) {
        neighbourNode.distanceFromStart =
          this.distanceFromStart + 1 + cost[this._value]; // Assumes distance 1 between each adjacent node
        neighbourNode.reachedFrom = this;
      }
    }
    return this;
  }
}

const quoridorDistance = (
  coordinateA: { x: number; y: number },
  startPiece: Player,
) => {
  const endRowNumber = startPiece === 1 ? 8 : 0;
  return Math.abs(coordinateA.y - endRowNumber);
};

const canGoLeft = (wallIntMatrix: any[][], x: number, y: number) => {
  return (
    x > 0 && // Is not on leftmost row
    !(
      (y < 8 && wallIntMatrix[x - 1][y].v) ||
      (y > 0 && wallIntMatrix[x - 1][y - 1].v)
    ) // Does not have wall to the left
  );
};

const canGoUp = (wallIntMatrix: any[][], x: number, y: number) => {
  return (
    y < 8 && // Is not on top row
    !((x < 8 && wallIntMatrix[x][y].h) || (x > 0 && wallIntMatrix[x - 1][y].h)) // Is not a wall above
  );
};

const canGoRight = (wallIntMatrix: any[][], x: number, y: number) => {
  return (
    x < 8 && // is not rightmost row
    !((y < 8 && wallIntMatrix[x][y].v) || (y > 0 && wallIntMatrix[x][y - 1].v)) // Is not wall to the right
  );
};

const canGoDown = (wallIntMatrix: any[][], x: number, y: number) => {
  return (
    y > 0 && // Is not on bottom row
    !(
      (x < 8 && wallIntMatrix[x][y - 1].h) ||
      (x > 0 && wallIntMatrix[x - 1][y - 1].h)
    ) // Is not wall below
  );
};

/* Create matrix of node objects from board */
const boardToNodeMatrix = (
  board: any, // PlayerMatrix,
  walls: any, // WallMatrix,
  startPiece: any, // Player,
) => {
  const mapIntMatrix = Object.keys(board).map((columnKey: any) =>
    Object.keys(board[columnKey as HorizontalPiecePosition]).map(
      (rowKey: any) => board[columnKey][rowKey],
    ),
  );

  const wallIntMatrix = Object.keys(walls).map((columnKey) =>
    Object.keys(walls[columnKey]).map((rowKey) => walls[columnKey][rowKey]),
  );

  /* Create a matrix of nodes */
  const nodeMatrix = [];
  for (const y of Object.keys(mapIntMatrix).map(Number)) {
    const nodeRow = [];
    for (const x of Object.keys(mapIntMatrix[y]).map(Number)) {
      nodeRow.push(new QuoridorNode(y, x, mapIntMatrix[y][x]));
    }
    nodeMatrix.push(nodeRow);
  }

  /* Add neighbours which are not walls to each node */
  // Coordinates are give according to the board, not how it is visualized.
  // x
  //
  for (const x of Object.keys(nodeMatrix).map(Number)) {
    for (const y of Object.keys(nodeMatrix[x]).map(Number)) {
      if (canGoLeft(wallIntMatrix, x, y)) {
        nodeMatrix[x][y].addNeighbour(nodeMatrix[x - 1][y]); // Add neighbour to the left
      }
      if (canGoUp(wallIntMatrix, x, y)) {
        nodeMatrix[x][y].addNeighbour(nodeMatrix[x][y + 1]); // Add neighbour above
      }
      if (canGoRight(wallIntMatrix, x, y)) {
        nodeMatrix[x][y].addNeighbour(nodeMatrix[x + 1][y]); // Add neighbour to the right
      }
      if (canGoDown(wallIntMatrix, x, y)) {
        nodeMatrix[x][y].addNeighbour(nodeMatrix[x][y - 1]); // Add neghbour below
      }
    }
  }

  /* Add manhattanDistanceToGoal to each node */
  for (const y of Object.keys(nodeMatrix).map(Number)) {
    for (const x of Object.keys(nodeMatrix[y]).map(Number)) {
      nodeMatrix[y][x].distanceToGoal = quoridorDistance({ y, x }, startPiece);
    }
  }

  return nodeMatrix;
};

/* Find start node */
const getStartNode = (nodeMatrix: QuoridorNode[][], startPiece: Player) => {
  for (const y of Object.keys(nodeMatrix).map(Number)) {
    for (const x of Object.keys(nodeMatrix[y]).map(Number)) {
      if (nodeMatrix[y][x].value === startPiece) {
        nodeMatrix[y][x].distanceFromStart = 0;
        return nodeMatrix[y][x];
      }
    }
  }
};

/* Return the node whose distanceFromStart is smallest */
const getMostPromisingNode = (discoveredNodes: QuoridorNode[]) => {
  let lowestDistance = Infinity;
  let mostPromisingNode;
  for (const node of discoveredNodes) {
    if (node.distanceFromStart < lowestDistance) {
      lowestDistance = node.distanceFromStart;
      mostPromisingNode = node;
    }
  }
  return mostPromisingNode;
};

const hasReachedGoal = (node: any, startPiece: any) => {
  const endRowNumber = startPiece === 1 ? 8 : 0;
  return node.coordinates.x === endRowNumber;
};

const visualizeOpenedCells = (openCells: any[]) => {
  for (const cell of openCells) {
    cell.value = 'x';
  }
};

const numberToLetter = (num: number) => {
  return String.fromCharCode(96 + num);
};

/**
 * Return the moves that have to be made from the start node to reach the end
 * node. In other words, do not return the start node, but include the end node,
 * unless the end node is the start node. Then we return an empty list
 */
const getPath = (
  goalNode: QuoridorNode,
  startPiece: Player,
): { x: string; y: number }[] => {
  if (goalNode.distanceFromStart === 0) return [];
  const goalCoordinates = {
    x: numberToLetter(goalNode.coordinates.y + 1),
    y: goalNode.coordinates.x + 1,
  };
  const previousNode = goalNode.reachedFrom!;
  if (previousNode.value === startPiece) {
    return [goalCoordinates];
  }
  return [...getPath(previousNode, startPiece), goalCoordinates];
};

export const aStar = (
  board: PlayerMatrix,
  walls: WallMatrix,
  startPiece: Player,
) => {
  const nodeMatrix = boardToNodeMatrix(board, walls, startPiece); // Create a matrix of nodes from mapString
  const startNode: QuoridorNode = getStartNode(
    nodeMatrix,
    startPiece,
  ) as QuoridorNode; // Find startNode and set its distance to itself to 0
  const discoveredNodes = [startNode]; // Create a list to which discovered nodes can be added
  const relaxedNodes: QuoridorNode[] = []; // Create a list to which keep track of which nodes have already been relaxed
  let reachedGoal = false;
  let goalNode;
  while (!reachedGoal) {
    // While goal is not reached
    const mostPromisingNode = getMostPromisingNode(
      discoveredNodes.filter((node) => !relaxedNodes.includes(node)),
    ); // Choose the nodes whose distance from start is lowest
    if (!mostPromisingNode) {
      return null;
    }
    relaxedNodes.push(mostPromisingNode.relax()); // Relax the most promising node and push it to relaxedNodes
    discoveredNodes.push(
      ...mostPromisingNode.neighbours.filter(
        (node: QuoridorNode) => !discoveredNodes.includes(node),
      ),
    ); // Add all previouly unrelaxed neighbours of the most promising node
    reachedGoal = hasReachedGoal(mostPromisingNode, startPiece);
    if (reachedGoal) {
      goalNode = mostPromisingNode;
    }
  }
  // visualizePath(goalNode); // Give all nodes in path the value 'O'
  const path = getPath(goalNode as QuoridorNode, startPiece);
  visualizeOpenedCells(
    discoveredNodes.filter(
      (node) => node !== undefined && !'12O'.includes(`${node.value}`),
    ),
  );
  return path;
};
