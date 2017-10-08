const { extend, STEP } = require('../lib');

function scan(reducer, seed) {
  return (xf) => {
    let currentValue = seed;
    return extend(xf, {
      step(acc, x) {
        currentValue = reducer(currentValue, x);
        return xf[STEP](acc, currentValue);
      },
    });
  };
}

module.exports = scan;
