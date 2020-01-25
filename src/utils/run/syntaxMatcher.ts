import { ParsedFunctionResult, ParsedPrototypeResult } from "../combinators";

function matchesPrototype(
  parsedFunction: ParsedFunctionResult,
  parsedPrototype: ParsedPrototypeResult
) {
  // return early if the length already doesn't match
  const pfLen = parsedFunction.args.length;
  const matchesLength = matchesAnyLength(pfLen, parsedPrototype);
  if (!matchesLength) return false;

  const allTypesMatch = matchesType(parsedFunction, parsedPrototype);

  return allTypesMatch;
}

/// Loops through the prototype to see if the length matches the normal length
/// or any of the optional lengths
function matchesAnyLength(
  parsedFunctionLength: number,
  parsedPrototype: ParsedPrototypeResult
) {
  let currProto = parsedPrototype;
  let len = 0;

  while (currProto && parsedFunctionLength > len) {
    len += currProto.args.length;

    // matches this level of arguments
    if (parsedFunctionLength === len) return true;

    // too few arguments
    if (parsedFunctionLength < len) return false;

    // going deeper into the optional params
    currProto = currProto.optional;
  }

  // more params provided than there are even optional params
  return false;
}

/// esnures that the allowed types for a prototype match up with the input
/// this function already assumes the lengths match up
function matchesType(
  parsedFunction: ParsedFunctionResult,
  parsedPrototype: ParsedPrototypeResult
) {
  const protoIter = iterableFromPrototype(parsedPrototype);

  for (const [userArg, protoArg] of combineIter(parsedFunction.args, protoIter)) {
    // check if any types on the current proto arg match with user's argument
    const typeMatches = protoArg.types.includes(userArg.type);
    if (!typeMatches) return false;
  }

  return true;
}

/// returns an iterator by going deep into a prototype.
function* iterableFromPrototype(parsedPrototype: ParsedPrototypeResult) {
  let currProto = parsedPrototype;

  while (currProto) {
    for (const arg of currProto.args) {
      yield arg;
    }

    currProto = currProto.optional;
  }
}

/// basic utility function to combine 2 Iterables. It exits when one runs out of output, 
// regardless of the state of the other one.
function* combineIter(
  ...iters: Iterable<any>[]
): Iterable<any[]> {
  // Using raw iterator protocol since for loops can be frustrating
  const rawIters = iters.map(iter => iter[Symbol.iterator]())

  // values gained from rawIters
  const items = rawIters.map(iter => iter.next())

  // while no item is done i.e. it has more output  
  while (items.every(item => !item.done)) {
    yield items.map(item => item.value)

    // moving iterators down to the next element
    for (let i = 0; i < items.length; i++) {
      items[i] = rawIters[i].next()
    }
  }
}

export default matchesPrototype;
