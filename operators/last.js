const { extend, RESULT, STEP } = require('../lib');

function last(xf) {
  let current;
  return extend(xf, {
    step(acc, x) {
      current = x;
      return acc;
    },
    result(acc) {
      return xf[RESULT](xf[STEP](acc, current));
    },
  });
}

module.exports = last;
