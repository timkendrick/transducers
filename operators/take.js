const { extend, reduced, STEP } = require('../lib');

const empty = require('./empty');

function take(count) {
  if (count <= 0) { return empty; }
  return (xf) => {
    let numRemaining = count;
    return extend(xf, {
      step(acc, x) {
        const value = xf[STEP](acc, x);
        // eslint-disable-next-line no-plusplus
        return (--numRemaining <= 0 ? reduced(value) : value);
      },
    });
  };
}

module.exports = take;
