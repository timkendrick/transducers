const mapAll = require('./mapAll');

function sort(predicate) {
  return mapAll((values) => values.sort(predicate));
}

module.exports = sort;
