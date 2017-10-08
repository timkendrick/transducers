const { INIT, STEP, RESULT } = require('../lib');

const array = {
  [INIT]() {
    return [];
  },
  [STEP](acc, x) {
    acc.push(x);
    return acc;
  },
  [RESULT](acc) {
    return acc;
  },
};

module.exports = array;
