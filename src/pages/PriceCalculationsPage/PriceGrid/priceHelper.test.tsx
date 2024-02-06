import {
  calculateSalesPrice,
  calculateMargin,
  calculateCost,
} from './PriceHelper';
import { PriceCalculationDto, PurchasePriceDto } from '../../../app/generate';

describe('calculateSalesPrice', () => {
  test('should calculate sales price correctly with valid inputs', () => {
    expect(calculateSalesPrice(0.05212, 0, 50)).toBe(0.10424);
  });

  test('should return null if any parameter is null', () => {
    expect(calculateSalesPrice(100, null, 20)).toBeNull();
    expect(calculateSalesPrice(100, 10, null)).toBeNull();
  });

  test('should return null if margin is 100 or higher', () => {
    expect(calculateSalesPrice(100, 10, 100)).toBeNull();
    expect(calculateSalesPrice(100, 10, 110)).toBeNull();
  });
});

describe('calculateMargin', () => {
  test('should calculate margin correctly with valid inputs', () => {
    expect(calculateMargin(0.10424, 0.05212, 0)).toBe(50);
  });

  test('should return null if any parameter is null', () => {
    expect(calculateMargin(150, null, 10)).toBeNull();
    expect(calculateMargin(150, 100, null)).toBeNull();
  });
});

describe('calculateCost', () => {
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
