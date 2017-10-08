const { scenario } = require('../test');

const skipUntil = require('./skipUntil');

describe('skipUntil', () => {
  scenario({
    operator: skipUntil((x) => x.startsWith('f')),
    input: ['one', 'two', 'three', 'four', 'five', 'four', 'three', 'two', 'one'],
    expected: ['four', 'five', 'four', 'three', 'two', 'one'],
  });
});
