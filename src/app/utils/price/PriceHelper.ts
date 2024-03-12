import { PriceCalculationDto } from '../../../app/generate';
import { MAX_MARGIN } from '../constant';

/**
 * Calculates the sales price based on cost, freight, and margin.
 *
 * This method calculates the sales price by adding the cost and the freight,
 * and then dividing by the complement of the margin percentage.
 * It assumes that the margin is provided as a percentage value
 * (e.g., 15 for 15%). If the margin is 100 or higher, or if any parameter is null,
 * the result will be null, indicating an invalid calculation.
 * @param cost The base cost of the product.
 * @param freightIncluded The freight cost included in the product price.
 * @param margin The desired profit margin as a percentage of the total cost.
 * @returns The calculated sales price as a decimal. Returns null if any of the input parameters are null.
 */
export function calculateSalesPrice(
  cost: number = 0,
  freightIncluded: number = 0,
  margin: number = 0
): number {
  const calcMargin = margin > 100 ? MAX_MARGIN : margin;
  return (cost + freightIncluded) * (100 / (100 - calcMargin));
}

/**
 * Calculates the margin based on cost, freight, and salePrice.
 *
 * This method calculates the margin percentage by subtracting the cost and the freight
 * from the sales price, then dividing the result by the sales price and multiplying by 100.
 * If the sales price is 0 or if any parameter is null, the result will be null,
 * indicating an invalid calculation.
 * @param const The base cost of the product.
 * @param salePrice The aales price of the product price.
 * @param freightIncluded The freight cost included in the product price.
 * @returns The calculated margin as a decimal. Returns null if any of the input parameters are null.
 */
export function calculateMargin(
  salePrice: number = 0,
  cost: number = 0,
  freightIncluded: number = 0
): number {
  return ((salePrice - cost - freightIncluded) / salePrice) * 100;
}

/**
 * Calculates the total cost of a purchase, incorporating various factors.
 *
 * This method calculates the total cost by applying currency rate adjustments
 * and adding internal commission and indirect costs to the base price.
 * The indirect cost is treated as a percentage of the total cost (e.g., 5 for 5%).
 * It's important that all input parameters are not null, or the method will retrun null.
 * @param purchasePrice The PurchasePrice object containing base price details.
 * @param calculation The PriceCalculation object containing additional cost factors.
 * @returns The total calculated cost as a decimal. This includes base price, internal commission, currency rate adjustments, and indirect costs.
 */
export function calculateCost(
  purchasePrice: number = 0,
  calculation: PriceCalculationDto
): number | null {
  const internalCommission = calculation.internalCommission
    ? calculation.internalCommission
    : 0;
  const currencyRate = calculation.currencyRate ? calculation.currencyRate : 1;
  const indirectCost = calculation.indirectCost ? calculation.indirectCost : 0;

  return (
    purchasePrice *
    (1 + internalCommission / 100) *
    currencyRate *
    (1 + indirectCost / 100)
  );
}
