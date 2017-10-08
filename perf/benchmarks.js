const { transduce, compose, map, filter, slice } = require('..');

const itemSets = [
  generateItems(100, randomStringGenerator(10)),
  generateItems(1000, randomStringGenerator(10)),
  generateItems(10000, randomStringGenerator(10)),
  generateItems(100000, randomStringGenerator(10)),
];

module.exports = itemSets.map((items) => [
  {
    [`Native map (${items.length} items)`]: () => (
      items.map((item) => item.toUpperCase())
    ),
    [`Transducer map (${items.length} items)`]: () => {
      const transducer = map((item) => item.toUpperCase());
      return transduce(transducer, (acc, item) => { acc.push(item); return acc; }, items, []);
    },
  },
  {
    [`Native map/filter (${items.length} items)`]: () => (
      items.map((item) => item.toUpperCase()).filter((item) => item.startsWith('A'))
    ),
    [`Transducer map/filter (${items.length} items)`]: () => {
      const transducer = compose(
        map((item) => item.toUpperCase()),
        filter((item) => item.startsWith('A'))
      );
      return transduce(transducer, (acc, item) => { acc.push(item); return acc; }, items, []);
    },
  },
  {
    [`Native map/filter/slice (${items.length} items)`]: () => (
      items.map((item) => item.toUpperCase()).filter((item) => item.startsWith('A')).slice(0, 10)
    ),
    [`Transducer map/filter/slice (${items.length} items)`]: () => {
      const transducer = compose(
        map((item) => item.toUpperCase()),
        filter((item) => item.startsWith('A')),
        slice(0, 10)
      );
      return transduce(transducer, (acc, item) => { acc.push(item); return acc; }, items, []);
    },
  },
]).reduce((acc, suites) => acc.concat(suites), []);

function generateItems(count, generator) {
  const items = new Array(count);
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < count; i++) { items[i] = generator(i); }
  return items;
}

function randomStringGenerator(length) {
  const firstCharCode = 'a'.charCodeAt(0);
  const lastCharCode = 'z'.charCodeAt(0);
  return () => {
    let string = '';
    while (string.length < length) {
      string += String.fromCharCode(
        Math.floor(firstCharCode + (Math.random() * (lastCharCode - firstCharCode)))
      );
    }
    return string;
  };
}
