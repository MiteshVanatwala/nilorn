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

export function scrollNameIntoView(name: string) {
  const labelForInput = document.querySelector(
    `label[for="${name}"]`
  ) as HTMLElement | null;
  if (labelForInput) {
    labelForInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

export function scrollSelectorIntoView(selector: string) {
  const element = document.querySelector(selector) as HTMLElement | null;
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

function round(num: number, decimalPlaces = 0): number {
  if (num < 0) return -round(-num, decimalPlaces);
  var p = Math.pow(10, decimalPlaces);
  var n = num * p;
  var f = n - Math.floor(n);
  var e = Number.EPSILON * n;

  // Determine whether this fraction is a midpoint value.
  return f >= 0.5 - e ? Math.ceil(n) / p : Math.floor(n) / p;
}

export function roundUp(
  num: number | null | undefined,
  numDecimals: number | null | undefined
): number | null | undefined {
  if (numDecimals !== null && numDecimals !== undefined) {
    if (!!num) {
      const roundedNum = round(num, numDecimals);
      return Number(roundedNum.toFixed(numDecimals));
    }
    return num;
  }
  return num;
}

export function numToThousandSeparatedsStr(
  value: string | number | undefined | null,
  includeDecimals: boolean = true
) {
  if (value === undefined || value === null) {
    return '';
  }
  let [intStr, decStr] =
    typeof value === 'number' ? value.toString().split('.') : value.split('.');
  const formattedIntegerPart = [...intStr].reduceRight((prev, curr, i, arr) => {
    const reveresedIndex = arr.length - i - 1;
    if (reveresedIndex && reveresedIndex % 3 === 0) {
      return `${curr} ${prev}`;
    }
    return `${curr}${prev}`;
  }, '');

  if (includeDecimals) {
    return `${formattedIntegerPart}${
      isNaN(Number(decStr)) ? `` : `.${decStr}`
    }`;
  }
  return formattedIntegerPart;
}

export function isNumeric(value: string) {
  return /^\d+$/.test(value);
}

export const generateUniqueKey = (pre: string) => {
  return `${pre}_${new Date().getTime()}`;
};

/**
 * Get unique product development numbers from an array of product development data
 * @param productDevelopmentsData Array of product development data objects
 * @returns Array of unique product development numbers
 */
export function getUniqueProductDevelopmentNumbers(
  productDevelopmentsData: Array<{ no?: string | null }>
): string[] {
  return productDevelopmentsData
    .map(pd => pd?.no)
    .filter((no, index, array) => no && array.indexOf(no) === index) as string[];
}
