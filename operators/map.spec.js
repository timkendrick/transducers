const { scenario } = require('../test');

const map = require('./map');

describe('map', () => {
  scenario({
    operator: map((x) => x * 2),
    input: [1, 2, 3, 4, 5],
    expected: [2, 4, 6, 8, 10],
  });
});
