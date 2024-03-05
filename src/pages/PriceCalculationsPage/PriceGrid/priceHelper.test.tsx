import {
  calculateSalesPrice,
  calculateMargin,
  calculateCost,
} from './PriceHelper';
import { PriceCalculationDto, PurchasePriceDto } from '../../../app/generate';
import { dataCalculateMargin } from './testData';

describe('Calculate SalesPrice', () => {
  const data = [
    {
      testCase: 'Example 1',
      purchasePrice: 0.35,
      intCommission: 1.0,
      currencyRate: 0.78889,
      indirectCost: 1.0,
      cost: 0.2761115,
      freightIncluded: 0.0,
      margin: 40,
      expectedSalesPrice: 0.46018583333333335,
    },
    {
      testCase: 'Example 2',
      purchasePrice: 0.35,
      intCommission: 1.2,
      currencyRate: 0.78889,
      indirectCost: 1.0,
      cost: 0.3313338,
      freightIncluded: 0.0,
      margin: 60,
      expectedSalesPrice: 0.8283345,
    },
    {
      testCase: 'Example 3',
      purchasePrice: 0.35,
      intCommission: 1.2,
      currencyRate: 0.78889,
      indirectCost: 1.15,
      cost: 0.38103387,
      freightIncluded: 0.2,
      margin: 60,
      expectedSalesPrice: 1.4525846749999998,
    },
    {
      testCase: 'Example 4',
      purchasePrice: 0.35,
      intCommission: 1.0,
      currencyRate: 0.78889,
      indirectCost: 1.15,
      cost: 0.317528225,
      freightIncluded: 0.2,
      margin: 17,
      expectedSalesPrice: 0.6235279819277109,
    },
    {
      testCase: 'Example 5',
      purchasePrice: 0.35,
      intCommission: 1.0,
      currencyRate: 0.78889,
      indirectCost: 1.15,
      cost: 0.317528225,
      freightIncluded: 0.2,
      margin: 85.5,
      expectedSalesPrice: 3.569160172413793,
    },
    {
      testCase: 'Example 6',
      purchasePrice: 0.35,
      intCommission: 1.0,
      currencyRate: 0.78889,
      indirectCost: 1.15,
      cost: 0.317528225,
      freightIncluded: 0.0,
      margin: 1.5,
      expectedSalesPrice: 0.3223636802030457,
    },
    {
      testCase: 'Example 7',
      purchasePrice: 0.35,
      intCommission: 1.0,
      currencyRate: 0.78889,
      indirectCost: 1.0,
      cost: 0.2761115,
      freightIncluded: 0.0,
      margin: 100,
      expectedSalesPrice: null,
    },
    {
      testCase: 'Example 8',
      purchasePrice: 0.35,
      intCommission: 1.0,
      currencyRate: 0.78889,
      indirectCost: 1.0,
      cost: 0.2761115,
      freightIncluded: 0.0,
      margin: 150,
      expectedSalesPrice: null, // -0.552223,
    },
    {
      testCase: 'Example 9', // Negative margin
      purchasePrice: 0.35,
      intCommission: 1.0,
      currencyRate: 0.78889,
      indirectCost: 1.0,
      cost: 0.2761115,
      freightIncluded: 0.0,
      margin: -10,
      expectedSalesPrice: 0.2510104545454545,
    },
    {
      testCase: 'Example 10',
      purchasePrice: 0.35,
      intCommission: 1.0,
      currencyRate: 0.78889,
      indirectCost: 1.0,
      cost: 0.2761115,
      freightIncluded: 0.0,
      margin: 0,
      expectedSalesPrice: 0.2761115,
    },
  ];

  data.forEach(testCase => {
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
