const { compose } = require('../lib');

const skip = require('./skip');
const take = require('./take');

function slice(offset, length) {
  return compose(skip(offset), take(length));
}

module.exports = slice;
