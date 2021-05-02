# quoridor.js

## Installation

```bash
npm install quoridor
```

## API

### getUnicodeRepresentation: (game: Game) => string

Returns a string representation of the board game state using Unicode box-drawing characters.

### createGameFromMoves: (moves: Move[]) => Game

Generates a game from an array of moves. Does not validate the moves.

```TypeScript
import { createGameFromMoves, getUnicodeRepresentation } from 'quoridor';

const game = createGameFromMoves(['e2', 'e8', 'd7v']);

console.log(getUnicodeRepresentation(game));

// ┌───╫───╫───╫───╫───╫───╫───╫───╫───╫───╫───┐
// │   ║   ║   ║   ║   ║   ║   ║   ║   ║   ║   │
// │   ┌───┬───┬───┬───┬───┬───┬───┬───┬───┐   │
// │ 9 │   │   │   │   │   │   │   │   │   │   │
// │   ├───┼───┼───┼───┼───┼───┼───┼───┼───┤   │
// │ 8 │   │   │   │   │   │   │   │   │   │   │
// │   ├───┼───┼───┼───┼───┼───┼───┼───┼───┤   │
// │ 7 │   │   │   │   ║ 2 │   │   │   │   │   │
// │   ├───┼───┼───┼───╫───┼───┼───┼───┼───┤   │
// │ 6 │   │   │   │   ║   │   │   │   │   │   │
// │   ├───┼───┼───┼───┼───┼───┼───┼───┼───┤   │
// │ 5 │   │   │   │   │   │   │   │   │   │   │
// │   ├───┼───┼───┼───┼───┼───┼───┼───┼───┤   │
// │ 4 │   │   │   │   │   │   │   │   │   │   │
// │   ├───┼───┼───┼───┼───┼───┼───┼───┼───┤   │
// │ 3 │   │   │   │   │ 1 │   │   │   │   │   │
// │   ├───┼───┼───┼───┼───┼───┼───┼───┼───┤   │
// │ 2 │   │   │   │   │   │   │   │   │   │   │
// │   ├───┼───┼───┼───┼───┼───┼───┼───┼───┤   │
// │ 1 │   │   │   │   │   │   │   │   │   │   │
// │   └───┴───┴───┴───┴───┴───┴───┴───┴───┘   │
// │   ║ A ║ B ║ C ║ D ║ E ║ F ║ G ║ H ║ I     │
// └───╫───╫───╫───╫───╫───╫───╫───╫───╫───────┘

```

### isMoveValid: (game: Game, move: Move) => boolean

Checks if a move is valid.

```TypeScript
import { createGameFromMoves, isMoveValid } from 'quoridor';

const game = createGameFromMoves(['e2', 'e8', 'd7v']);

const moveIsValid = isMoveValid(game, 'd7');

console.log(moveIsValid);

// false
```

## Publishing a new version

Check that linting, formatting, build and tests pass

```bash
npm run lint
npm run format
npm run build
npm test
```

Bump version

```bash
npm version [major | minor | patch]
```

Publish to NPM

```bash
npm publish
```
