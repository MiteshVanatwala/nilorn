export function createRangeArray(start: number, end: number) {
  const rangeArr = [];
  let counter = start;
  while (counter <= end) {
    rangeArr.push(counter);
    counter++;
  }
  return rangeArr;
}

export function isNullOrWhiteSpace(str: string | null | undefined) {
  return str === null || str === undefined || str.match(/^ *$/) !== null;
}

export function uniqueInArray(value: number, index: number, values: any[]) {
  const filteredValues = values.filter((_, i: number) => i !== index);
  return !filteredValues.includes(value);
}
