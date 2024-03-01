import {
  calculateSalesPrice,
  calculateMargin,
  calculateCost,
} from './PriceHelper';
import { PriceCalculationDto, PurchasePriceDto } from '../../../app/generate';

function roundToDecimalPlaces(num: number, decimalPlaces: number) {
  const factor = Math.pow(10, decimalPlaces);
  return Math.round(num * factor) / factor;
}

describe('Calculate SalesPrice', () => {
  const data = [
    {
      testCase: 'Example 1',
      purchasePrice: 0.35,
      intCommission: 1.0,
      currencyRate: 0.78889,
      indirectCost: 1.0,
      cost: 0.27611,
      freightIncluded: 0.0,
      margin: 40,
      expectedSalesPrice: 0.46019,
    },
    {
      testCase: 'Example 2',
      purchasePrice: 0.35,
      intCommission: 1.2,
      currencyRate: 0.78889,
      indirectCost: 1.0,
      cost: 0.33133,
      freightIncluded: 0.0,
      margin: 60,
      expectedSalesPrice: 0.82833,
    },
    {
      testCase: 'Example 3',
      purchasePrice: 0.35,
      intCommission: 1.2,
      currencyRate: 0.78889,
      indirectCost: 1.15,
      cost: 0.38103,
      freightIncluded: 0.2,
      margin: 60,
      expectedSalesPrice: 1.45258,
    },
    // {
    //   testCase: 'Example 4',
    //   purchasePrice: 0.35,
    //   intCommission: 1.0,
    //   currencyRate: 0.78889,
    //   indirectCost: 1.15,
    //   cost: 0.31753,
    //   freightIncluded: 0.2,
    //   margin: 17,
    //   expectedSalesPrice: 0.62353,
    // },
    // {
    //   testCase: 'Example 5',
    //   purchasePrice: 0.35,
    //   intCommission: 1.0,
    //   currencyRate: 0.78889,
    //   indirectCost: 1.15,
    //   cost: 0.31753,
    //   freightIncluded: 0.2,
    //   margin: 85.5,
    //   expectedSalesPrice: 3.56916,
    // },
    // {
    //   testCase: 'Example 6',
    //   purchasePrice: 0.35,
    //   intCommission: 1.0,
    //   currencyRate: 0.78889,
    //   indirectCost: 1.15,
    //   cost: 0.31753,
    //   freightIncluded: 0.0,
    //   margin: 0.15,
    //   expectedSalesPrice: 0.32236,
    // },
    {
      testCase: 'Example 7',
      purchasePrice: 0.35,
      intCommission: 1.0,
      currencyRate: 0.78889,
      indirectCost: 1.0,
      cost: 0.27611,
      freightIncluded: 0.0,
      margin: 100,
      expectedSalesPrice: null,
    },
    {
      testCase: 'Example 8', // Joanna, chnage
      purchasePrice: 0.35,
      intCommission: 1.0,
      currencyRate: 0.78889,
      indirectCost: 1.0,
      cost: 0.27611,
      freightIncluded: 0.0,
      margin: 150,
      expectedSalesPrice: null,
    },
    {
      testCase: 'Example 9', // Negative margin
      purchasePrice: 0.35,
      intCommission: 1.0,
      currencyRate: 0.78889,
      indirectCost: 1.0,
      cost: 0.27611,
      freightIncluded: 0.0,
      margin: -10,
      expectedSalesPrice: 0.25101,
    },
    {
      testCase: 'Example 10',
      purchasePrice: 0.35,
      intCommission: 1.0,
      currencyRate: 0.78889,
      indirectCost: 1.0,
      cost: 0.27611,
      freightIncluded: 0.0,
      margin: 0,
      expectedSalesPrice: 0.27611,
    },
  ];

  data.forEach(testCase => {
    test(`Case: ${testCase.testCase}`, () => {
      const { cost, freightIncluded, margin, expectedSalesPrice } = testCase;
      const calculatedSalesPrice = calculateSalesPrice(
        cost,
        freightIncluded,
        margin
      );

      // Round the calculated sales price to 5 decimal places
      // Add a small offset to ensure rounding up
      // TODO: Round in function
      const roundedCalculatedSalesPrice = calculatedSalesPrice
        ? Number((calculatedSalesPrice + 0.000005).toFixed(5))
        : calculatedSalesPrice;

      expect(roundedCalculatedSalesPrice).toBe(expectedSalesPrice);
    });
  });
});

describe('Calculate Margin', () => {
  const data = [
    {
      testCase: 'Example 1',
      purchasePrice: 0.35,
      intCommission: 1.1,
      currencyRate: 0.78889,
      indirectCost: 1.2,
      cost: 0.36447,
      freightIncluded: 0.0,
      salesPrice: 10000.0,
      expectedMargin: 99.996355,
    },
    // {
    //   testCase: 'Example 2',
    //   purchasePrice: 0.35,
    //   intCommission: 1.1,
    //   currencyRate: 0.78889,
    //   indirectCost: 1.2,
    //   cost: 0.36447,
    //   freightIncluded: 0.0,
    //   salesPrice: 0.695,
    //   expectedMargin: 47.56,
    // },
    // {
    //   testCase: 'Example 3',
    //   purchasePrice: 0.35,
    //   intCommission: 1.1,
    //   currencyRate: 0.78889,
    //   indirectCost: 1.2,
    //   cost: 0.36447,
    //   freightIncluded: 0.2,
    //   salesPrice: 0.65,
    //   expectedMargin: 13.16,
    // },
    // {
    //   testCase: 'Example 4',
    //   purchasePrice: 0.35,
    //   intCommission: 1.00,
    //   currencyRate: 0.788890,
    //   indirectCost: 1.00,
    //   cost: 0.27611,
    //   freightIncluded: 0.00,
    //   salesPrice: 0.26500,
    //   expectedMargin: -4.19
    // },
    // {
    //   testCase: 'Example 5',
    //   purchasePrice: 0.35,
    //   intCommission: 1.0,
    //   currencyRate: 0.78889,
    //   indirectCost: 1.0,
    //   cost: 0.27611,
    //   freightIncluded: 0.0,
    //   expectedSalesPrice: 2.11,
    //   expectedMargin: 86.91,
    // },
    // {
    //   testCase: 'Example 6',
    //   purchasePrice: 0.35,
    //   intCommission: 1.0,
    //   currencyRate: 0.78889,
    //   indirectCost: 1.0,
    //   cost: 0.27611,
    //   freightIncluded: 0.01,
    //   salesPrice: 2.11,
    //   expectedMargin: 86.44,
    // },
    {
      testCase: 'Example 7',
      purchasePrice: 0.35,
      intCommission: 1.0,
      currencyRate: 0.78889,
      indirectCost: 1.18,
      cost: 0.32581,
      freightIncluded: 0.0,
      salesPrice: 0.05,
      expectedMargin: -551.62,
    },
    {
      testCase: 'Example 8',
      purchasePrice: 0.35,
      intCommission: 1.0,
      currencyRate: 0.78889,
      indirectCost: 1.18,
      cost: 0.32581,
      freightIncluded: 0.0,
      salesPrice: 0.0,
      expectedMargin: null,
    },
    // {
    //   testCase: 'Example 9',
    //   purchasePrice: 0.35,
    //   intCommission: 1.0,
    //   currencyRate: 0.78889,
    //   indirectCost: 1.18,
    //   cost: 0.32581,
    //   freightIncluded: 0.0,
    //   salesPrice: -0.5,
    //   expectedMargin: 165.16,
    // },
    {
      testCase: 'Example 10',
      purchasePrice: 0.35,
      intCommission: 1.2,
      currencyRate: 0.78889,
      indirectCost: 1.18,
      cost: 0.39097,
      freightIncluded: 0.0,
      salesPrice: 0.39097,
      expectedMargin: 0.0,
    },
  ];

  data.forEach(testCase => {
    test(`Case: ${testCase.testCase}`, () => {
      const { cost, freightIncluded, salesPrice, expectedMargin } = testCase;
      const calculatedMargine = calculateMargin(
        salesPrice,
        cost,
        freightIncluded
      );

      // Round the calculated sales price to 5 decimal places
      // Add a small offset to ensure rounding up
      const roundedCalculatedMargin = calculatedMargine
        ? Number(calculatedMargine.toFixed(6))
        : calculatedMargine;

      expect(roundedCalculatedMargin).toBe(expectedMargin);
    });
  });
});

describe('Calculate Cost', () => {
  test('should calculate total cost correctly with valid inputs', () => {
    const purchasePrice: PurchasePriceDto = { price: 0.436 };
    const calculation: PriceCalculationDto = {
      internalCommission: 17,
      currencyRate: 0.1022,
      indirectCost: 0,
    };
    expect(calculateCost(purchasePrice, calculation)).toBe(1.7819592);
  });

  test('should return NaN if any required parameter is missing', () => {
    const purchasePrice: PurchasePriceDto = { price: 100 };
    const calculation: PriceCalculationDto = {
      internalCommission: 5,
      currencyRate: 1.2,
      indirectCost: null,
    };
    expect(calculateCost(purchasePrice, calculation)).toBeNull();
  });
});
