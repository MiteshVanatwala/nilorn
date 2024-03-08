import {
  calculateSalesPrice,
  calculateMargin,
  calculateCost,
} from './PriceHelper';
import { dataCalculateMargin, dataCalculateSalesPrice } from './testData';

describe('Calculate SalesPrice', () => {
  dataCalculateSalesPrice.forEach(testCase => {
    test(`Case: ${testCase.testCase}`, () => {
      const { cost, freightIncluded, margin, expectedSalesPrice } = testCase;
      const res = calculateSalesPrice(cost, freightIncluded, margin);

      expect(res).toBe(expectedSalesPrice);
    });
  });
});

describe('Calculate Margin', () => {
  dataCalculateMargin.forEach(testCase => {
    test(`Case: ${testCase.testCase}`, () => {
      const { cost, freightIncluded, salesPrice, expectedMargin } = testCase;
      const calculatedMargine = calculateMargin(
        salesPrice,
        cost,
        freightIncluded
      );

      expect(calculatedMargine).toBe(expectedMargin);
    });
  });
});

describe('Calculate Cost', () => {
  dataCalculateSalesPrice.forEach(testCase => {
    test(`Case: ${testCase.testCase}`, () => {
      const {
        purchasePrice,
        internalCommission,
        indirectCost,
        currencyRate,
        cost: expectedCost,
      } = testCase;
      const res = calculateCost(purchasePrice, {
        internalCommission,
        indirectCost,
        currencyRate,
      });

      // toFixed(9) is to match excel wher is rounded.
      // Else we need to modify both `expectedSalesPrice` and `cost`
      expect(Number(res?.toFixed(9))).toBe(expectedCost);
    });
  });
});
