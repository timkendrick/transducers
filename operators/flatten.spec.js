const { scenario } = require('../test');

const flatten = require('./flatten');

describe('flatten', () => {
  scenario({
    operator: flatten,
    input: [[1], [2, 3], [4, 5, 6], [7, 8], [9]],
    expected: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  });
});
