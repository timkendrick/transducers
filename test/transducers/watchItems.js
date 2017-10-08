const { INIT, STEP, RESULT } = require('../../lib');

function watchItems(callback) {
  return (xf) => ({
    [INIT]() {
      return xf[INIT]();
    },
    [STEP](acc, x) {
      callback(x);
      return xf[STEP](acc, x);
    },
    [RESULT](acc) {
      return xf[RESULT](acc);
    },
  });
}

module.exports = watchItems;
