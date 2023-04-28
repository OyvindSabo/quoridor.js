import { createGameFromMoves } from '..';
import { createNewGame } from '..';
import { getHash } from '..';
import { mirrorHashHorizontally } from '..';

test('Test that hash from new game is identical to its mirrored version', () => {
  expect(getHash(createNewGame())).toStrictEqual(
    mirrorHashHorizontally(getHash(createNewGame())),
  );
});

test('Test that hash from game is correctly mirrored', () => {
  expect(
    mirrorHashHorizontally(
      getHash(createGameFromMoves(['d1', 'f9', 'e8h', 'a1v'])),
    ),
  ).toStrictEqual('f1d90909d8hh1v');
});

test('Test that wall moves end up in correct order when mirroring hash', () => {
  expect(
    mirrorHashHorizontally(
      getHash(createGameFromMoves(['a1h', 'a8v', 'h8h', 'h1v'])),
    ),
  ).toStrictEqual('e1e90808a1va8hh1hh8v');
});
