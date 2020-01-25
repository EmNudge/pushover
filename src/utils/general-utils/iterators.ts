/// basic utility function to combine 2 Iterables. It exits when one runs out of output,
// regardless of the state of the other one.
export function* combineIter(...iters: Iterable<any>[]): Iterable<any[]> {
  // Using raw iterator protocol since for loops can be frustrating
  const rawIters = iters.map(iter => iter[Symbol.iterator]());

  // values gained from rawIters
  const items = rawIters.map(iter => iter.next());

  // while no item is done i.e. it has more output
  while (items.every(item => !item.done)) {
    yield items.map(item => item.value);

    // moving iterators down to the next element
    for (let i = 0; i < items.length; i++) {
      items[i] = rawIters[i].next();
    }
  }
}

// allows non-array iterables to have a comparable `.entries()` method
// returns index along with item in a given iterable
export function* entries<T>(iter: Iterable<T>): Iterable<[number, T]> {
  let index = 0;
  for (const item of iter) {
    yield [index, item];
    index++;
  }
}

// flattens an iterator of iterators. Only flattens one level.
export function* flattenIterable<T>(iter: Iterable<Iterable<T>>): Iterable<T> {
  for (const nestedIter of iter) {
    for (const item of nestedIter) {
      yield item;
    }
  }
}

interface NestedObject<T> {
  [value: string]: NestedObject<T> | T;
}

/// allows iterating through structures that are deeply nested, such as Linked Lists
/// atm it's rather messy since there isn't a good way to write this out with generics,
/// so a hand-made one, specific for a situation, is probably better.
export function* iterableFromNested<T>(
  iterObj: NestedObject<T>,
  valueProp: string,
  nestProp: string
): Iterable<T> {
  // making a copy so that we don't mutate the original object
  let mutIterObj = iterObj;

  // check that next nest exists i.e. it's not null or undefined
  while (mutIterObj[valueProp]) {
    yield mutIterObj[valueProp] as T;

    // move mutIterObj down one nesting level
    mutIterObj = mutIterObj[nestProp] as NestedObject<T>;
  }
}
