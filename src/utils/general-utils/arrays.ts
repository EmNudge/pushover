/// function to return an array of objects with the highest value
export function getMax(arr: object[], property: string) {
  const highestObjs: object[] = [];
  let highestVal = -Infinity;

  for (const item of arr) {
    const val = item[property];

    if (val < highestVal) continue;

    if (val > highestVal) {
      highestVal = val;
      highestObjs.length = 0;
    }

    highestObjs.push(item);
  }

  return highestObjs;
}

/// returns true if only one entry in the array fulfils the function.
/// returns false if all are false or more than one are true
export function onlyOne(array: any[], func: (val: any) => any): boolean {
  let oneItemQualifies = false;

  for (const val of array) {
    // if function does not result in a truthy value, skip this loop
    if (!func(val)) continue;

    oneItemQualifies = !oneItemQualifies;

    // if it's false after being flipped, it must have been true before being flipped
    // this means it's the second time we got a truthy value.
    if (!oneItemQualifies) return false;
  }

  return oneItemQualifies;
}
