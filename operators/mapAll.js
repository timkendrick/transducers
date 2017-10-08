const { extend, reduce, RESULT, STEP } = require('../lib');

function mapAll(transform) {
  return (xf) => {
    const values = [];
    return extend(xf, {
      step(acc, x) {
        values.push(x);
        return acc;
      },
      result(acc) {
        return xf[RESULT](reduce(xf[STEP], acc, transform(values)));
      },
    });
  };
}

module.exports = mapAll;
