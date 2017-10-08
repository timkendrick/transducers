const { scenario } = require('../test');

const first = require('./first');

describe('first', () => {
  scenario({
    operator: first,
    input: [1, 2, 3, 4, 5],
    expected: [1],
  });
});
