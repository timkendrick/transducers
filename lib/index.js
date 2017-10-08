const INIT = '@@transducer/init';
const STEP = '@@transducer/step';
const RESULT = '@@transducer/result';
const REDUCED = '@@transducer/reduced';
const VALUE = '@@transducer/value';

function transduce(transducer, reducer, input, initial) {
  const stepper = (typeof reducer === 'function' ? wrap(reducer) : reducer);
  const xf = transducer(stepper);
  const initialValue = (arguments.length >= 4 ? initial : xf[INIT]());
  return xf[RESULT](reduce(xf[STEP], initialValue, input));
}

function reduce(reducer, initialValue, values) {
  let acc = initialValue;
  // eslint-disable-next-line no-restricted-syntax
  for (const value of values) {
    acc = reducer(acc, value);
    if (isReduced(acc)) {
      acc = deref(acc);
      break;
    }
  }
  return acc;
}

function reduced(value) {
  return {
    [REDUCED]: true,
    [VALUE]: value,
  };
}

function isReduced(value) {
  return Boolean(value && (typeof value === 'object') && (value[REDUCED] === true));
}

function deref(reducedValue) {
  return reducedValue[VALUE];
}

function extend(xf, methods) {
  return {
    [INIT]: methods.init || xf[INIT],
    [STEP]: methods.step || xf[STEP],
    [RESULT]: methods.result || xf[RESULT],
  };
}

function compose(...fns) {
  return (x) => fns.reduceRight((acc, fn) => fn(acc), x);
}

function wrap(reducer) {
  return {
    [INIT]() {
      throw new Error('Reducer must be given an initial value');
    },
    [STEP]: reducer,
    [RESULT](acc) {
      return acc;
    },
  };
}

function identity(x) {
  return x;
}

function not(predicate) {
  return (x) => !predicate(x);
}

module.exports = {
  INIT,
  STEP,
  RESULT,
  REDUCED,
  VALUE,
  transduce,
  reduce,
  reduced,
  isReduced,
  deref,
  extend,
  compose,
  wrap,
  identity,
  not,
};
