import { overlapsPath } from '../utils';

test('Test that vertical walls next to the path are not considered to overlap the path', () => {
  expect(
    overlapsPath(['e1', 'e2', 'e3', 'e4', 'e5', 'e6', 'e7', 'e8', 'e9'], 'e8v'),
  ).toBe(false);
});
