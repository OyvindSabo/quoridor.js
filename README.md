# quoridor.js

## Installation

```bash
npm install quoridor
```

## API

### createGameFromMoves: (moves: Move[]) => Game

Generates a game from an array of moves. Does not validate the moves.

```TypeScript
import { createGameFromMoves, getAsciiRepresentation } from 'quoridor';

const game = createGameFromMoves(['e2', 'e8', 'd7v']);

console.log(getAsciiRepresentation(game));

┌───╫───╫───╫───╫───╫───╫───╫───╫───╫───╫───┐
│   ║   ║   ║   ║   ║   ║   ║   ║   ║   ║   │
│   ┌───┬───┬───┬───┬───┬───┬───┬───┬───┐   │
│ 9 │   │   │   │   │   │   │   │   │   │   │
│   ├───┼───┼───┼───┼───┼───┼───┼───┼───┤   │
│ 8 │   │   │   │   │   │   │   │   │   │   │
│   ├───┼───┼───┼───┼───┼───┼───┼───┼───┤   │
│ 7 │   │   │   │   ║ 2 │   │   │   │   │   │
│   ├───┼───┼───┼───╫───┼───┼───┼───┼───┤   │
│ 6 │   │   │   │   ║   │   │   │   │   │   │
│   ├───┼───┼───┼───┼───┼───┼───┼───┼───┤   │
│ 5 │   │   │   │   │   │   │   │   │   │   │
│   ├───┼───┼───┼───┼───┼───┼───┼───┼───┤   │
│ 4 │   │   │   │   │   │   │   │   │   │   │
│   ├───┼───┼───┼───┼───┼───┼───┼───┼───┤   │
│ 3 │   │   │   │   │ 1 │   │   │   │   │   │
│   ├───┼───┼───┼───┼───┼───┼───┼───┼───┤   │
│ 2 │   │   │   │   │   │   │   │   │   │   │
│   ├───┼───┼───┼───┼───┼───┼───┼───┼───┤   │
│ 1 │   │   │   │   │   │   │   │   │   │   │
│   └───┴───┴───┴───┴───┴───┴───┴───┴───┘   │
│   ║ A ║ B ║ C ║ D ║ E ║ F ║ G ║ H ║ I     │
└───╫───╫───╫───╫───╫───╫───╫───╫───╫───────┘

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
