const { scenario } = require('../test');

const takeWhile = require('./takeWhile');

describe('takeWhile', () => {
  scenario({
    operator: takeWhile((x) => x.startsWith('f')),
    input: ['five', 'four', 'three', 'two', 'one', 'two', 'three', 'four', 'five'],
    expected: ['five', 'four'],
  });
});
