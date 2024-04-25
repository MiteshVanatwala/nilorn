import { roundUp } from './common';

describe('roundUp function', () => {
  it('should round up a number to the specified number of decimals', () => {
    expect(roundUp(3.14159, 2)).toBe(3.14);
    expect(roundUp(3.14159, 3)).toBe(3.142);
    expect(roundUp(3.14159, 0)).toBe(3);
    expect(roundUp(12345, 0)).toBe(12345);
  });

  it('should return num if numDecimals is null or undefined', () => {
    expect(roundUp(3.14159, null)).toBe(3.14159);
    expect(roundUp(3.14159, undefined)).toBe(3.14159);
    expect(roundUp(null, null)).toBe(null);
    expect(roundUp(undefined, undefined)).toBe(undefined);
  });

  it('should return null if num is null or undefined, regardless of numDecimals', () => {
    expect(roundUp(null, 2)).toBe(null);
    expect(roundUp(undefined, 2)).toBe(undefined);
    expect(roundUp(null, 0)).toBe(null);
    expect(roundUp(undefined, 0)).toBe(undefined);
  });
});
