const { INIT, STEP, RESULT } = require('../lib');

const log = {
  [INIT]() {
    return '';
  },
  [STEP](acc, x) {
    return (acc ? `${acc}\n` : '') + x;
  },
  [RESULT](acc) {
    return acc;
  },
};

module.exports = log;
