const scenarioBuilder = require('@timkendrick/scenario-builder');

const { transduce } = require('../lib');
const { array, sum, log } = require('../reducers');

function add(...values) {
  return values.reduce((acc, x) => acc + x, 0);
}

const runScenario = scenarioBuilder(
  ({ transducer, reducer, collection: input }) => transduce(transducer, reducer, input)
);

const scenario = ({ operator, input, expected, before, assert }) => {
  runScenario('WHEN the transducer is used to transform a collection', Object.assign(
    {
      before,
      input: {
        transducer: operator,
        reducer: array,
        collection: input,
      },
    },
    (expected ? { expected } : {}),
    (assert ? { assert } : {})
  ));

  runScenario('WHEN the transducer is used to generate a sum total', Object.assign(
    {
      before,
      input: {
        transducer: operator,
        reducer: sum,
        collection: input,
      },
    },
    (expected ? { expected: add(...expected) } : {}),
    (assert ? { assert } : {})
  ));

  runScenario('WHEN the transducer is used to build a string', Object.assign(
    {
      before,
      input: {
        transducer: operator,
        reducer: log,
        collection: input,
      },
    },
    (expected ? { expected: expected.join('\n') } : {}),
    (assert ? { assert } : {})
  ));
};

module.exports = scenario;
