const { scenario } = require('../test');

const takeUntil = require('./takeUntil');

describe('takeUntil', () => {
  scenario({
    operator: takeUntil((x) => x.startsWith('f')),
    input: ['one', 'two', 'three', 'four', 'five', 'four', 'three', 'two', 'one'],
    expected: ['one', 'two', 'three'],
  });
});
