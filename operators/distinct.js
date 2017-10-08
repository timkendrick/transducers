const { extend, STEP } = require('../lib');

function distinct(xf) {
  let previousValue;
  return extend(xf, {
    step(acc, x) {
      if (x === previousValue) { return acc; }
      previousValue = x;
      return xf[STEP](acc, x);
    },
  });
}

module.exports = distinct;
