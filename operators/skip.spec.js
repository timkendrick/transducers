const { scenario } = require('../test');

const skip = require('./skip');

describe('skip', () => {
  describe('WHEN called with a count of zero', () => {
    scenario({
      operator: skip(0),
      input: [1, 2, 3, 4, 5],
      expected: [1, 2, 3, 4, 5],
    });
  });

  describe('WHEN called with a non-zero count', () => {
    scenario({
      operator: skip(3),
      input: [1, 2, 3, 4, 5],
      expected: [4, 5],
    });
  });
});
