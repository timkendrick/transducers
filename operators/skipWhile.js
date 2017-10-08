const { extend, STEP } = require('../lib');

function skipWhile(predicate) {
  return (xf) => {
    let hasStarted = false;
    return extend(xf, {
      step(acc, x) {
        // eslint-disable-next-line no-cond-assign
        if (!hasStarted && !(hasStarted = !predicate(x))) {
          return acc;
        }
        return xf[STEP](acc, x);
      },
    });
  };
}

module.exports = skipWhile;
