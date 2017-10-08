const { scenario } = require('../test');

const sort = require('./sort');

describe('sort', () => {
  scenario({
    operator: sort((a, b) => b - a),
    input: [1, 2, 3, 4, 5],
    expected: [5, 4, 3, 2, 1],
  });
});
