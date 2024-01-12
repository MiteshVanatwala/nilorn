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

export function isEqual(obj1: any, obj2: any) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}
