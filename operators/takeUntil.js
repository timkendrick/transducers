const { not } = require('../lib');

const takeWhile = require('./takeWhile');

function takeUntil(predicate) {
  return takeWhile(not(predicate));
}

module.exports = takeUntil;
