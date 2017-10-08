const { extend, identity, STEP } = require('../lib');

function skip(count) {
  if (count <= 0) { return identity; }
  return (xf) => {
    let currentIndex = 0;
    return extend(xf, {
      step(acc, x) {
        // eslint-disable-next-line no-plusplus
        return (++currentIndex > count ? xf[STEP](acc, x) : acc);
      },
    });
  };
}

module.exports = skip;
