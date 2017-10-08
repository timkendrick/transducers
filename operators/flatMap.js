const { compose } = require('../lib');

const map = require('./map');
const flatten = require('./flatten');

function flatMap(transform) {
  return compose(map(transform), flatten);
}

module.exports = flatMap;
