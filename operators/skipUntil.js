const { not } = require('../lib');

const skipWhile = require('./skipWhile');

function skipUntil(predicate) {
  return skipWhile(not(predicate));
}

module.exports = skipUntil;
