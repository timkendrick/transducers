const { scenario } = require('../test');

const mapAll = require('./mapAll');

describe('mapAll', () => {
  scenario({
    operator: mapAll((items) => items.sort((a, b) => b - a)),
    input: [1, 2, 3, 4, 5],
    expected: [5, 4, 3, 2, 1],
  });
});
