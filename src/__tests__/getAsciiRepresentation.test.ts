import { createGameFromMoves } from '../createGameFromMoves';
import { getAsciiRepresentation } from '../getAsciiRepresentation';

test('Test that initial game position is correctly visualized', () => {
  expect(getAsciiRepresentation(createGameFromMoves([]))).toBe(
    `┌───╫───╫───╫───╫───╫───╫───╫───╫───╫───╫───┐
│   ║   ║   ║   ║   ║   ║   ║   ║   ║   ║   │
│   ┌───┬───┬───┬───┬───┬───┬───┬───┬───┐   │
│ 9 │   │   │   │   │ 2 │   │   │   │   │   │
│   ├───┼───┼───┼───┼───┼───┼───┼───┼───┤   │
│ 8 │   │   │   │   │   │   │   │   │   │   │
│   ├───┼───┼───┼───┼───┼───┼───┼───┼───┤   │
│ 7 │   │   │   │   │   │   │   │   │   │   │
│   ├───┼───┼───┼───┼───┼───┼───┼───┼───┤   │
│ 6 │   │   │   │   │   │   │   │   │   │   │
│   ├───┼───┼───┼───┼───┼───┼───┼───┼───┤   │
│ 5 │   │   │   │   │   │   │   │   │   │   │
│   ├───┼───┼───┼───┼───┼───┼───┼───┼───┤   │
│ 4 │   │   │   │   │   │   │   │   │   │   │
│   ├───┼───┼───┼───┼───┼───┼───┼───┼───┤   │
│ 3 │   │   │   │   │   │   │   │   │   │   │
│   ├───┼───┼───┼───┼───┼───┼───┼───┼───┤   │
│ 2 │   │   │   │   │   │   │   │   │   │   │
│   ├───┼───┼───┼───┼───┼───┼───┼───┼───┤   │
│ 1 │   │   │   │   │ 1 │   │   │   │   │   │
│   └───┴───┴───┴───┴───┴───┴───┴───┴───┘   │
│   ║ A ║ B ║ C ║ D ║ E ║ F ║ G ║ H ║ I ║   │
└───╫───╫───╫───╫───╫───╫───╫───╫───╫───╫───┘`,
  );
});

test('Test that a horizontal wall placed by player 1 is correctly visualized', () => {
  expect(getAsciiRepresentation(createGameFromMoves(['a1h']))).toBe(
    `┌───╫───╫───╫───╫───╫───╫───╫───╫───╫───╫───┐
│   ║   ║   ║   ║   ║   ║   ║   ║   ║   ║   │
│   ┌───┬───┬───┬───┬───┬───┬───┬───┬───┐   │
│ 9 │   │   │   │   │ 2 │   │   │   │   │   │
│   ├───┼───┼───┼───┼───┼───┼───┼───┼───┤   │
│ 8 │   │   │   │   │   │   │   │   │   │   │
│   ├───┼───┼───┼───┼───┼───┼───┼───┼───┤   │
│ 7 │   │   │   │   │   │   │   │   │   │   │
│   ├───┼───┼───┼───┼───┼───┼───┼───┼───┤   │
│ 6 │   │   │   │   │   │   │   │   │   │   │
│   ├───┼───┼───┼───┼───┼───┼───┼───┼───┤   │
│ 5 │   │   │   │   │   │   │   │   │   │   │
│   ├───┼───┼───┼───┼───┼───┼───┼───┼───┤   │
│ 4 │   │   │   │   │   │   │   │   │   │   │
│   ├───┼───┼───┼───┼───┼───┼───┼───┼───┤   │
│ 3 │   │   │   │   │   │   │   │   │   │   │
│   ├───┼───┼───┼───┼───┼───┼───┼───┼───┤   │
│ 2 │   │   │   │   │   │   │   │   │   │   │
│   ├═══╪═══┼───┼───┼───┼───┼───┼───┼───┤   │
│ 1 │   │   │   │   │ 1 │   │   │   │   │   │
│   └───┴───┴───┴───┴───┴───┴───┴───┴───┘   │
│   ║ A ║ B ║ C ║ D ║ E ║ F ║ G ║ H ║ I     │
└───╫───╫───╫───╫───╫───╫───╫───╫───╫───────┘`,
  );
});
