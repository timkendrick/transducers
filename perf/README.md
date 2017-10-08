# Performance

Transducers have the potential to operate much faster than the native JavaScript ES5.1 array methods for several reasons:

- Multiple transformations can be composed into a single operation. This means that the source collection only needs to be iterated once in order to apply a whole set of transformations simultaneously, rather than having to perform multiple passes over the whole source collection to apply to the multiple transformations. Another way of saying this is that transducers perform a single depth-first iteration to derive their results, rather than the multiple (breadth-first) iterations that are required when combining native array methods.
- There is no need to cache intermediate results, due to the fact that there is only a single iteration over the array. This drastically reduces the number of collection items required to coexist simultaneously in memory, and therefore lowers the likelihood of lengthy garbage-collection pauses.
- Transformers have the ability to 'bail out' early (e.g. when performing a slice on a collection), at which point no further items will be processed from the source collection. This terminating message applies to the whole composed set of transformations, so even if only a small portion of the source items have been iterated over, only the minimum possible processing will take place, due to the depth-first nature of the composed transformation.

## Benchmarks

Source files for these benchmarks can be found in `./benchmarks.js`. To run the benchmarks on your machine, clone the repository and run `npm run benchmark`.

The following results were computed on a 1.6GHz Macbook Air (early 2015) with 8GB RAM:

```
Running benchmarks.js #1 (1 of 12):
✔ Native map (100 items) x 16,240 ops/sec ±1.58% (82 runs sampled)
✔ Transducer map (100 items) x 38,652 ops/sec ±2.12% (77 runs sampled)
Transducer map (100 items) is 138.00% faster

Running benchmarks.js #2 (2 of 12):
✔ Native map/filter (100 items) x 13,468 ops/sec ±1.39% (82 runs sampled)
✔ Transducer map/filter (100 items) x 19,037 ops/sec ±2.23% (76 runs sampled)
Transducer map/filter (100 items) is 41.35% faster

Running benchmarks.js #3 (3 of 12):
✔ Native map/filter/slice (100 items) x 13,357 ops/sec ±1.67% (82 runs sampled)
✔ Transducer map/filter/slice (100 items) x 19,000 ops/sec ±1.70% (81 runs sampled)
Transducer map/filter/slice (100 items) is 42.24% faster

Running benchmarks.js #4 (4 of 12):
✔ Native map (1000 items) x 1,662 ops/sec ±1.59% (82 runs sampled)
✔ Transducer map (1000 items) x 2,422 ops/sec ±2.05% (82 runs sampled)
Transducer map (1000 items) is 45.75% faster

Running benchmarks.js #5 (5 of 12):
✔ Native map/filter (1000 items) x 1,335 ops/sec ±1.57% (83 runs sampled)
✔ Transducer map/filter (1000 items) x 2,229 ops/sec ±1.48% (82 runs sampled)
Transducer map/filter (1000 items) is 67.01% faster

Running benchmarks.js #6 (6 of 12):
✔ Native map/filter/slice (1000 items) x 1,355 ops/sec ±1.36% (84 runs sampled)
✔ Transducer map/filter/slice (1000 items) x 5,468 ops/sec ±1.93% (82 runs sampled)
Transducer map/filter/slice (1000 items) is 303.58% faster

Running benchmarks.js #7 (7 of 12):
✔ Native map (10000 items) x 165 ops/sec ±1.56% (71 runs sampled)
✔ Transducer map (10000 items) x 252 ops/sec ±2.04% (78 runs sampled)
Transducer map (10000 items) is 52.77% faster

Running benchmarks.js #8 (8 of 12):
✔ Native map/filter (10000 items) x 133 ops/sec ±1.46% (70 runs sampled)
✔ Transducer map/filter (10000 items) x 228 ops/sec ±1.65% (76 runs sampled)
Transducer map/filter (10000 items) is 71.01% faster

Running benchmarks.js #9 (9 of 12):
✔ Native map/filter/slice (10000 items) x 132 ops/sec ±1.71% (70 runs sampled)
✔ Transducer map/filter/slice (10000 items) x 7,694 ops/sec ±1.71% (82 runs sampled)
Transducer map/filter/slice (10000 items) is 5723.27% faster

Running benchmarks.js #10 (10 of 12):
✔ Native map (100000 items) x 12.57 ops/sec ±3.69% (34 runs sampled)
✔ Transducer map (100000 items) x 20.65 ops/sec ±5.01% (37 runs sampled)
Transducer map (100000 items) is 64.22% faster

Running benchmarks.js #11 (11 of 12):
✔ Native map/filter (100000 items) x 9.33 ops/sec ±3.48% (27 runs sampled)
✔ Transducer map/filter (100000 items) x 23.19 ops/sec ±1.52% (41 runs sampled)
Transducer map/filter (100000 items) is 148.58% faster

Running benchmarks.js #12 (12 of 12):
✔ Native map/filter/slice (100000 items) x 8.10 ops/sec ±6.25% (25 runs sampled)
✔ Transducer map/filter/slice (100000 items) x 9,399 ops/sec ±2.77% (76 runs sampled)
Transducer map/filter/slice (100000 items) is 115870.63% faster
```

These results show that this library consistently outperforms the native V8 map/filter/slice functions, ranging from around 0.5x faster for a single map function on a set of 100 items, up to over 1000x faster for a combination of map/filter/slice transformers on a set of 100,000 items.

In summary, as the number of array transformations that are applied during the processing step increases, and as the size of the source collection increases, transducers will become increasingly performant relative to native array functions, with a massive speedup for situations where the result set is limited and therefore allows for early termination of the transforming operation.
