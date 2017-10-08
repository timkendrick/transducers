const { scenario } = require('../test');

const slice = require('./slice');

describe('slice', () => {
  describe('WHEN called with a zero length', () => {
    scenario({
      operator: slice(1, 0),
      input: [1, 2, 3, 4, 5],
      expected: [],
    });
  });

  describe('WHEN called with a non-zero length', () => {
    scenario({
      operator: slice(1, 3),
      input: [1, 2, 3, 4, 5],
      expected: [2, 3, 4],
    });
  });
});
