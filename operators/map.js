const { extend, STEP } = require('../lib');

function map(transform) {
  return (xf) => extend(xf, {
    step(acc, x) {
      return xf[STEP](acc, transform(x));
    },
  });
}

module.exports = map;
