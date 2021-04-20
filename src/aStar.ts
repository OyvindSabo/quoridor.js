import {
  PlayerMatrix,
  Player,
  WallMatrix,
  HorizontalPiecePosition,
} from './types';

/*******************************************************************************
 * Utility functions for the aStar function and the Node
 ******************************************************************************/

class Node {
  _value: Player;
  _coordinates: { x: number; y: number };
  _distanceFromStart: number;
  _distanceToGoal?: number;
  _neighbours: Node[]; // A bit unsure if this is the right type
  _reachedFrom?: Node;
  constructor(y: number, x: number, value: Player) {
    this._value = value;
    this._coordinates = { y: y, x: x };
    this._distanceFromStart = Infinity;
    this._distanceToGoal;
    this._neighbours = [];
    this._reachedFrom;
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
  addNeighbour(neighbour: Node) {
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
    for (let neighbourNode of this._neighbours) {
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

/* Create matrix of node objects from board */
const boardToNodeMatrix = (
  board: any, //PlayerMatrix,
  walls: any, //WallMatrix,
  startPiece: any, //Player,
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
  for (let y of Object.keys(mapIntMatrix).map(Number)) {
    let nodeRow = [];
    for (let x of Object.keys(mapIntMatrix[y]).map(Number)) {
      nodeRow.push(new Node(y, x, mapIntMatrix[y][x]));
    }
    nodeMatrix.push(nodeRow);
  }

  /* Add neighbours which are not walls to each node */
  // Coordinates are give according to the board, not how it is visualized.
  // x
  //
  for (let x of Object.keys(nodeMatrix).map(Number)) {
    for (let y of Object.keys(nodeMatrix[x]).map(Number)) {
      if (
        x > 0 &&
        !(
          x < 8 &&
          y < 8 &&
          (wallIntMatrix[x - 1][y].v ||
            (y > 0 && wallIntMatrix[x - 1][y - 1].v))
        )
      ) {
        nodeMatrix[x][y].addNeighbour(nodeMatrix[x - 1][y]); // Add neighbour to the left
      }
      if (
        y < nodeMatrix[x].length - 1 &&
        !(
          x < 8 &&
          y < 8 &&
          (wallIntMatrix[x][y].h || (x > 0 && wallIntMatrix[x - 1][y].h))
        )
      ) {
        //new
        nodeMatrix[x][y].addNeighbour(nodeMatrix[x][y + 1]); // Add neighbour above
      }
      console.log('wallIntMatrix: ', wallIntMatrix);
      // TODO: There is something very fishy here
      if (
        x < nodeMatrix.length - 1 &&
        !(
          x > 1 &&
          x < 8 &&
          y < 8 &&
          (wallIntMatrix[y][x].v || (y > 0 && wallIntMatrix[y - 1][x].v))
        )
      ) {
        nodeMatrix[x][y].addNeighbour(nodeMatrix[x + 1][y]); // Add neighbour to the right
      }
      if (
        y > 0 &&
        !(
          x < 8 &&
          y < 8 &&
          (wallIntMatrix[x][y - 1].h || (x > 0 && wallIntMatrix[x - 1][y - 1]))
        )
      ) {
        nodeMatrix[x][y].addNeighbour(nodeMatrix[x][y - 1]); // Add neghbour below
      }
    }
  }

  /* Add manhattanDistanceToGoal to each node */
  for (let y of Object.keys(nodeMatrix).map(Number)) {
    for (let x of Object.keys(nodeMatrix[y]).map(Number)) {
      nodeMatrix[y][x].distanceToGoal = quoridorDistance(
        { y: y, x: x },
        startPiece,
      );
    }
  }

  return nodeMatrix;
};

/* Find start node */
const getStartNode = (nodeMatrix: Node[][], startPiece: Player) => {
  for (let y of Object.keys(nodeMatrix).map(Number)) {
    for (let x of Object.keys(nodeMatrix[y]).map(Number)) {
      if (nodeMatrix[y][x].value === startPiece) {
        nodeMatrix[y][x].distanceFromStart = 0;
        return nodeMatrix[y][x];
      }
    }
  }
};

/* Return the node whose distanceFromStart is smallest */
const getMostPromisingNode = (discoveredNodes: Node[]) => {
  let lowestDistance = Infinity;
  let mostPromisingNode;
  for (let node of discoveredNodes) {
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
  for (let cell of openCells) {
    cell.value = 'x';
  }
};

const numberToLetter = (number: number) => {
  return String.fromCharCode(96 + number);
};

const getPath = (goalNode: Node, startPiece: Player) => {
  if (goalNode.distanceFromStart === 0) return [goalNode];
  const path = [goalNode.coordinates].map(({ x, y }) => ({
    x: numberToLetter(y),
    y: x + 1,
  }));
  const previousNode = goalNode.reachedFrom!;
  if (previousNode.value === startPiece) {
    return path;
  }
  path.unshift(...((getPath(previousNode, startPiece) as unknown) as any));
  return path;
};

export const aStar = (
  board: PlayerMatrix,
  walls: WallMatrix,
  startPiece: Player,
) => {
  let nodeMatrix = boardToNodeMatrix(board, walls, startPiece); // Create a matrix of nodes from mapString
  const startNode: Node = getStartNode(nodeMatrix, startPiece) as Node; // Find startNode and set its distance to itself to 0
  let discoveredNodes = [startNode]; // Create a list to which discovered nodes can be added
  let relaxedNodes: Node[] = []; // Create a list to which keep track of which nodes have already been relaxed
  let reachedGoal = false;
  let goalNode;
  while (!reachedGoal) {
    // While goal is not reached
    let mostPromisingNode = getMostPromisingNode(
      discoveredNodes.filter((node) => relaxedNodes.indexOf(node) === -1),
    ); // Choose the nodes whose distance from start is lowest
    if (!mostPromisingNode) {
      return null;
    }
    relaxedNodes.push(mostPromisingNode.relax()); // Relax the most promising node and push it to relaxedNodes
    discoveredNodes.push(
      ...mostPromisingNode.neighbours.filter(
        (node: Node) => discoveredNodes.indexOf(node) === -1,
      ),
    ); // Add all previouly unrelaxed neighbours of the most promising node
    reachedGoal = hasReachedGoal(mostPromisingNode, startPiece);
    if (reachedGoal) {
      goalNode = mostPromisingNode;
    }
  }
  //visualizePath(goalNode); // Give all nodes in path the value 'O'
  const path = getPath(goalNode as Node, startPiece);
  console.log('path: ', path);
  visualizeOpenedCells(
    discoveredNodes.filter(
      (node) => node !== undefined && '12O'.indexOf(`${node.value}`) === -1,
    ),
  );
  return path;
};
