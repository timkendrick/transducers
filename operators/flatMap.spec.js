const { scenario } = require('../test');

const flatMap = require('./flatMap');

describe('flatMap', () => {
  scenario({
    operator: flatMap((x) => [x / 10, -x]),
    input: [1, 2, 3, 4, 5],
    expected: [0.1, -1, 0.2, -2, 0.3, -3, 0.4, -4, 0.5, -5],
  });
});
