const { scenario } = require('../test');

const empty = require('./empty');

describe('empty', () => {
  scenario({
    operator: empty,
    input: [1, 2, 3, 4, 5],
    expected: [],
  });
});

