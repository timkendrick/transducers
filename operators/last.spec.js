const { scenario } = require('../test');

const last = require('./last');

describe('last', () => {
  scenario({
    operator: last,
    input: [1, 2, 3, 4, 5],
    expected: [5],
  });
});
