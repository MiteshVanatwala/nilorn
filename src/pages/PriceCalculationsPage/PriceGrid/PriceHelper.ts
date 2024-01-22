import { PriceCalculationDto, PurchasePriceDto } from '../../../app/generate';

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
  cost: number,
  freightIncluded: number,
  margin: number
): number {
  return (cost + freightIncluded) / ((100 - margin) / 100);
}

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
export function calculateMargin(
  salePrice: number,
  cost: number,
  freightIncluded: number
): number {
  if (salePrice === 0) {
    return 0;
  }
  const margin = 100 - ((cost + freightIncluded) / salePrice) * 100;

  // Ensure the calculated margin is min 0
  if (margin < 0) {
    return 0;
  }

  return margin;
}

/**
 * Calculates the total cost of a purchase, incorporating various factors.
 *
 * This method calculates the total cost by applying currency rate adjustments
 * and adding internal commission and indirect costs to the base price.
 * The indirect cost is treated as a percentage of the total cost (e.g., 5 for 5%).
 * It's important that both input parameters are not null, or the method will throw a NullReferenceException.
 * @param purchasePrice The PurchasePrice object containing base price details.
 * @param calculation The PriceCalculation object containing additional cost factors.
 * @returns The total calculated cost as a decimal. This includes base price, internal commission, currency rate adjustments, and indirect costs.
 */
export function calculateCost(
  purchasePrice: PurchasePriceDto,
  calculation: PriceCalculationDto
): number {
  if (
    !!purchasePrice.price &&
    calculation!.internalCommission &&
    calculation!.currencyRate &&
    calculation!.indirectCost
  ) {
    return (
      (purchasePrice!.price + calculation!.internalCommission) *
      calculation!.currencyRate *
      (1 + calculation!.indirectCost / 100)
    );
  }
  return NaN;
}
