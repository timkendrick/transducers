# @timkendrick/transducers
[![npm version](https://img.shields.io/npm/v/@timkendrick/transducers.svg)](https://www.npmjs.com/package/@timkendrick/transducers)
![Stability](https://img.shields.io/badge/stability-stable-brightgreen.svg)

> Simple, high-performance transducers for JavaScript

## Installation

```bash
npm install @timkendrick/transducers --save
```

## Overview

Transducers provide an elegant, high-performance abstraction for manipulating collections. They allow you to compose complex, reusable transformations that can be applied to any kind of collection, and can produce different output formats depending on the choice of underlying reducer.

```javascript
import { compose, map, filter, take, array } from '@timkendrick/transducers';

// Define a source iterator
const users = getUsers(10000);

// Compose a transducer that expresses a transformation
const transducer = compose(
  filter((user) => user.admin === true)
  map((user) => `${user.firstName} ${user.lastName}`),
  take(10),
);

// Apply the transformation using the 'array' reducer (which outputs an array)
const results = transduce(transducer, array, users);

// Log an array containing the full names of the first ten admin users
console.log(results);
```

One of the primary advantages of transducers is their efficiency. See the [performance](./perf) benchmarks for more details.

## Usage

### `compose(transducer1, transducer2, ...transducerN)`

Compose a series of transducers. The transformations expressed by the transducers will be processed in order from left-to-right.

The resulting transducer can be further composed for combining with other transducers.

### `transduce(transducer, reducer, items, [initialValue])`

Apply the `transducer` to an iterable collection of `items`, using the specified `reducer` function and `initialValue` argument to construct the output.

The `reducer` can optionally refer to a transducer that defines an 'init' method (e.g. the bundled `array` reducer), in which case the `initialValue` is optional. In all other cases the `initialValue` argument is required.

## Included operators

While not an exhaustive set by any means, various operators have been bundled for convenience:

- `distinct`: ignore repeated items
- `empty`: ignore all items
- `filter(predicate)`: take only the items that conform to the `predicate` function
- `first`: take the first item only
- `flatMap(project)`: for each item, map to a collection using `project`, and merge the results
- `flatten`: flatten a higher-order collection by one dimension
- `last`: take the last item only
- `map(transform)`: transform each item to the result of mapping it through the `project` function
- `mapAll(transform)`: transform the entire output set by mapping it through the `transform` function
- `scan(reducer, seed)`: for each item, return the result of calling the `reducer` function with the previous result and the current item
- `skip(count)`: ignore the first `count` items
- `skipUntil(predicate)`: ignore items until one conforms to the `predicate` function
- `skipWhile(predicate)`: ignore items until one does not conform to the `predicate` function
- `slice(start, length)`: ignore items until the `start` index, and take `length` items from that point
- `sort(compare)`: sort the entire output set using the `compare` comparison function
- `take(count)`: take only the first `count` items
- `takeUntil(predicate)`: take all items until one conforms to the `predicate` function
- `takeWhile(predicate)`: take all items until one does not conform to the `predicate` function

See the tests for the bundled [operators](./operators) for more details.

The bundled operators can all be composed using the `compose()` helper to produce more specific operators.

## Included reducers

Transducers can be used with any type of reducer. Some of the most common ones are bundled for convenience:

### `array`

Combines the transformed collection into a JavaScript array:

```javascript
import { skip, transduce } from '@timkendrick/transducers';

transduce(skip(1), array, ['foo', 'bar', 'baz']); // ['bar', 'baz']
```

### `sum`

Combines the transformed collection into a sum total:

```javascript
import { skip, sum } from '@timkendrick/transducers';

transduce(skip(1), sum, [1, 2, 3, 4, 5]); // 14
```

### `log`

Joins the transformed collection into a string with items separated by newline characters:

```javascript
import { take, log } from '@timkendrick/transducers';

transduce(skip(1), log, ['foo', 'bar', 'baz']); // "Foo\nBar\nBaz"
```

## Interoperability with other libraries

This package conforms to the Transducers spec, allowing for full interoperability with all packages that support transducers.

## Reducing bundle size

While the main `@timkendrick/transducers` package comes with a set of bundled operators, you can choose to import the core functionality on its own and load any desired operators and reducers individually:

```javascript
import { compose, transduce } from '@timkendrick/transducers/core';

import array from '@timkendrick/transducers/reducers/array';

import map from '@timkendrick/transducers/operators/map';
import filter from '@timkendrick/transducers/operators/filter';
import take from '@timkendrick/transducers/operators/take';
```

This allows you to generate a super-minimal application bundle (the core module is <1KB minified and gzipped), and can also be useful for avoiding overlap with other transducer libraries.
