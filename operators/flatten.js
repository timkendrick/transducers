const { extend, reduce, STEP } = require('../lib');

function flatten(xf) {
  return extend(xf, {
    step(acc, x) {
      return reduce(xf[STEP], acc, x);
    },
  });
}

module.exports = flatten;
