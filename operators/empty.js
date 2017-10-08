const { extend, reduced } = require('../lib');

function empty(xf) {
  return extend(xf, {
    step(acc, x) {
      return reduced(acc);
    },
  });
}

module.exports = empty;
