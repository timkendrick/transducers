const { extend, STEP } = require('../lib');

function filter(predicate) {
  return (xf) => extend(xf, {
    step(acc, x) {
      return (predicate(x) ? xf[STEP](acc, x) : acc);
    },
  });
}

module.exports = filter;
