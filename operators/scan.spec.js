const { scenario } = require('../test');

const scan = require('./scan');

describe('scan', () => {
  scenario({
    operator: scan((acc, x) => acc + x, 0),
    input: [1, 2, 3, 4, 5],
    expected: [1, 3, 6, 10, 15],
  });
});
