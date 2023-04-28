import { createGameFromMoves } from '..';
import { createNewGame } from '..';
import { getHash } from '..';

test('Test that state of new game is correctly hashed', () => {
  expect(getHash(createNewGame())).toStrictEqual('e1e91010');
});

test('Test that state of new game with wall moves is correctly hashed', () => {
  expect(getHash(createGameFromMoves(['e2', 'e2h']))).toStrictEqual(
    'e2e91009e2h',
  );
});
