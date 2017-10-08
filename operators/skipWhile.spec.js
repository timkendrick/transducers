const { scenario } = require('../test');

const skipWhile = require('./skipWhile');

describe('skipWhile', () => {
  scenario({
    operator: skipWhile((x) => x.startsWith('f')),
    input: ['five', 'four', 'three', 'two', 'one', 'two', 'three', 'four', 'five'],
    expected: ['three', 'two', 'one', 'two', 'three', 'four', 'five'],
  });
});
