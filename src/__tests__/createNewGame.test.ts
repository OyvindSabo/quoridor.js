import { createNewGame } from '../createNewGame';

test('Test that game is correctly initialized', () => {
  expect(createNewGame()).toStrictEqual({
    board: {
      a1: null,
      a2: null,
      a3: null,
      a4: null,
      a5: null,
      a6: null,
      a7: null,
      a8: null,
      a9: null,
      b1: null,
      b2: null,
      b3: null,
      b4: null,
      b5: null,
      b6: null,
      b7: null,
      b8: null,
      b9: null,
      c1: null,
      c2: null,
      c3: null,
      c4: null,
      c5: null,
      c6: null,
      c7: null,
      c8: null,
      c9: null,
      d1: null,
      d2: null,
      d3: null,
      d4: null,
      d5: null,
      d6: null,
      d7: null,
      d8: null,
      d9: null,
      e1: 1,
      e2: null,
      e3: null,
      e4: null,
      e5: null,
      e6: null,
      e7: null,
      e8: null,
      e9: 2,
      f1: null,
      f2: null,
      f3: null,
      f4: null,
      f5: null,
      f6: null,
      f7: null,
      f8: null,
      f9: null,
      g1: null,
      g2: null,
      g3: null,
      g4: null,
      g5: null,
      g6: null,
      g7: null,
      g8: null,
      g9: null,
      h1: null,
      h2: null,
      h3: null,
      h4: null,
      h5: null,
      h6: null,
      h7: null,
      h8: null,
      h9: null,
      i1: null,
      i2: null,
      i3: null,
      i4: null,
      i5: null,
      i6: null,
      i7: null,
      i8: null,
      i9: null,
      a1h: false,
      a1v: false,
      a2h: false,
      a2v: false,
      a3h: false,
      a3v: false,
      a4h: false,
      a4v: false,
      a5h: false,
      a5v: false,
      a6h: false,
      a6v: false,
      a7h: false,
      a7v: false,
      a8h: false,
      a8v: false,
      b1h: false,
      b1v: false,
      b2h: false,
      b2v: false,
      b3h: false,
      b3v: false,
      b4h: false,
      b4v: false,
      b5h: false,
      b5v: false,
      b6h: false,
      b6v: false,
      b7h: false,
      b7v: false,
      b8h: false,
      b8v: false,
      c1h: false,
      c1v: false,
      c2h: false,
      c2v: false,
      c3h: false,
      c3v: false,
      c4h: false,
      c4v: false,
      c5h: false,
      c5v: false,
      c6h: false,
      c6v: false,
      c7h: false,
      c7v: false,
      c8h: false,
      c8v: false,
      d1h: false,
      d1v: false,
      d2h: false,
      d2v: false,
      d3h: false,
      d3v: false,
      d4h: false,
      d4v: false,
      d5h: false,
      d5v: false,
      d6h: false,
      d6v: false,
      d7h: false,
      d7v: false,
      d8h: false,
      d8v: false,
      e1h: false,
      e1v: false,
      e2h: false,
      e2v: false,
      e3h: false,
      e3v: false,
      e4h: false,
      e4v: false,
      e5h: false,
      e5v: false,
      e6h: false,
      e6v: false,
      e7h: false,
      e7v: false,
      e8h: false,
      e8v: false,
      f1h: false,
      f1v: false,
      f2h: false,
      f2v: false,
      f3h: false,
      f3v: false,
      f4h: false,
      f4v: false,
      f5h: false,
      f5v: false,
      f6h: false,
      f6v: false,
      f7h: false,
      f7v: false,
      f8h: false,
      f8v: false,
      g1h: false,
      g1v: false,
      g2h: false,
      g2v: false,
      g3h: false,
      g3v: false,
      g4h: false,
      g4v: false,
      g5h: false,
      g5v: false,
      g6h: false,
      g6v: false,
      g7h: false,
      g7v: false,
      g8h: false,
      g8v: false,
      h1h: false,
      h1v: false,
      h2h: false,
      h2v: false,
      h3h: false,
      h3v: false,
      h4h: false,
      h4v: false,
      h5h: false,
      h5v: false,
      h6h: false,
      h6v: false,
      h7h: false,
      h7v: false,
      h8h: false,
      h8v: false,
    },
    pieceMatrix: {
      a1: 0,
      a2: 0,
      a3: 0,
      a4: 0,
      a5: 0,
      a6: 0,
      a7: 0,
      a8: 0,
      a9: 0,
      b1: 0,
      b2: 0,
      b3: 0,
      b4: 0,
      b5: 0,
      b6: 0,
      b7: 0,
      b8: 0,
      b9: 0,
      c1: 0,
      c2: 0,
      c3: 0,
      c4: 0,
      c5: 0,
      c6: 0,
      c7: 0,
      c8: 0,
      c9: 0,
      d1: 0,
      d2: 0,
      d3: 0,
      d4: 0,
      d5: 0,
      d6: 0,
      d7: 0,
      d8: 0,
      d9: 0,
      e1: 1,
      e2: 0,
      e3: 0,
      e4: 0,
      e5: 0,
      e6: 0,
      e7: 0,
      e8: 0,
      e9: 2,
      f1: 0,
      f2: 0,
      f3: 0,
      f4: 0,
      f5: 0,
      f6: 0,
      f7: 0,
      f8: 0,
      f9: 0,
      g1: 0,
      g2: 0,
      g3: 0,
      g4: 0,
      g5: 0,
      g6: 0,
      g7: 0,
      g8: 0,
      g9: 0,
      h1: 0,
      h2: 0,
      h3: 0,
      h4: 0,
      h5: 0,
      h6: 0,
      h7: 0,
      h8: 0,
      h9: 0,
      i1: 0,
      i2: 0,
      i3: 0,
      i4: 0,
      i5: 0,
      i6: 0,
      i7: 0,
      i8: 0,
      i9: 0,
    },
    wallMatrix: {
      a1h: false,
      a1v: false,
      a2h: false,
      a2v: false,
      a3h: false,
      a3v: false,
      a4h: false,
      a4v: false,
      a5h: false,
      a5v: false,
      a6h: false,
      a6v: false,
      a7h: false,
      a7v: false,
      a8h: false,
      a8v: false,
      b1h: false,
      b1v: false,
      b2h: false,
      b2v: false,
      b3h: false,
      b3v: false,
      b4h: false,
      b4v: false,
      b5h: false,
      b5v: false,
      b6h: false,
      b6v: false,
      b7h: false,
      b7v: false,
      b8h: false,
      b8v: false,
      c1h: false,
      c1v: false,
      c2h: false,
      c2v: false,
      c3h: false,
      c3v: false,
      c4h: false,
      c4v: false,
      c5h: false,
      c5v: false,
      c6h: false,
      c6v: false,
      c7h: false,
      c7v: false,
      c8h: false,
      c8v: false,
      d1h: false,
      d1v: false,
      d2h: false,
      d2v: false,
      d3h: false,
      d3v: false,
      d4h: false,
      d4v: false,
      d5h: false,
      d5v: false,
      d6h: false,
      d6v: false,
      d7h: false,
      d7v: false,
      d8h: false,
      d8v: false,
      e1h: false,
      e1v: false,
      e2h: false,
      e2v: false,
      e3h: false,
      e3v: false,
      e4h: false,
      e4v: false,
      e5h: false,
      e5v: false,
      e6h: false,
      e6v: false,
      e7h: false,
      e7v: false,
      e8h: false,
      e8v: false,
      f1h: false,
      f1v: false,
      f2h: false,
      f2v: false,
      f3h: false,
      f3v: false,
      f4h: false,
      f4v: false,
      f5h: false,
      f5v: false,
      f6h: false,
      f6v: false,
      f7h: false,
      f7v: false,
      f8h: false,
      f8v: false,
      g1h: false,
      g1v: false,
      g2h: false,
      g2v: false,
      g3h: false,
      g3v: false,
      g4h: false,
      g4v: false,
      g5h: false,
      g5v: false,
      g6h: false,
      g6v: false,
      g7h: false,
      g7v: false,
      g8h: false,
      g8v: false,
      h1h: false,
      h1v: false,
      h2h: false,
      h2v: false,
      h3h: false,
      h3v: false,
      h4h: false,
      h4v: false,
      h5h: false,
      h5v: false,
      h6h: false,
      h6v: false,
      h7h: false,
      h7v: false,
      h8h: false,
      h8v: false,
    },
    pastMoves: [],
    futureMoves: [],
    playerPositions: { 1: { position: 'e1' }, 2: { position: 'e9' } },
    playerWallCounts: { 1: 10, 2: 10 },
  });
});
