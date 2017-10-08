const { INIT, STEP, RESULT } = require('../lib');

const sum = {
  [INIT]() {
    return 0;
  },
  [STEP](acc, x) {
    return acc + x;
  },
  [RESULT](acc) {
    return acc;
  },
};

module.exports = sum;
