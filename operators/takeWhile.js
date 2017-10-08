const { extend, reduced, STEP } = require('../lib');

function takeWhile(predicate) {
  return (xf) => extend(xf, {
    step(acc, x) {
      if (!predicate(x)) { return reduced(acc); }
      return xf[STEP](acc, x);
    },
  });
}

module.exports = takeWhile;
