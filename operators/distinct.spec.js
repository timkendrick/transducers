const { scenario } = require('../test');

const distinct = require('./distinct');

describe('distinct', () => {
  scenario({
    operator: distinct,
    input: [1, 2, 3, 3, 4, 3, 5],
    expected: [1, 2, 3, 4, 3, 5],
  });
});
