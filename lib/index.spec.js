const { scenario, watchItems } = require('../test');

const { compose } = require('.');
const { filter, map, sort, take } = require('../operators');

describe('compose', () => {
  describe('WHEN composing a series of transducers', () => {
    scenario({
      operator: compose(
        filter((x) => x % 2 !== 0),
        map((x) => x * 3),
        sort((a, b) => b - a),
        take(3)
      ),
      input: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      expected: [27, 21, 15],
    });
  });

  describe('WHEN composing a transducer that discards a subset of the source items', () => {
    let callback;
    let transducer;
    beforeEach(() => {
      callback = jest.fn();
      transducer = compose(
        watchItems(callback),
        filter((x) => x % 2 !== 0),
        map((x) => x * 2),
        take(3)
      );
    });

    scenario({
      operator: (xf) => transducer(xf),
      input: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      before: () => {
        jest.clearAllMocks();
      },
      assert: () => {
        // Ensure that the minimum possible items are processed (i.e. 1..3..5 in this case)
        expect(callback).toHaveBeenCalledTimes(5);
        expect(callback.mock.calls).toEqual([
          [1],
          [2],
          [3],
          [4],
          [5],
        ]);
      },
    });
  });
});
