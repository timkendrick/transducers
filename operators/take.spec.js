const { scenario } = require('../test');

const take = require('./take');

describe('take', () => {
  describe('WHEN called with a count of zero', () => {
    scenario({
      operator: take(0),
      input: [1, 2, 3, 4, 5],
      expected: [],
    });
  });

  describe('WHEN called with a non-zero count', () => {
    scenario({
      operator: take(3),
      input: [1, 2, 3, 4, 5],
      expected: [1, 2, 3],
    });
  });
});
