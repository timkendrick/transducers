const { scenario } = require('../test');

const filter = require('./filter');

describe('filter', () => {
  scenario({
    operator: filter((x) => x % 2),
    input: [1, 2, 3, 4, 5],
    expected: [1, 3, 5],
  });
});
