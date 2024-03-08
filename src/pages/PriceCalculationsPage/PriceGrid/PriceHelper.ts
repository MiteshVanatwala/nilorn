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
  cost: number | null,
  freightIncluded: number | null,
  margin: number | null
): number | null {
  if (
    cost === null ||
    freightIncluded === null ||
    margin === null ||
    margin >= 100
  ) {
    return null;
  }
  return (cost + freightIncluded) / ((100 - margin) / 100);
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
  salePrice: number | null,
  cost: number | null,
  freightIncluded: number | null
): number | null {
  if (
    salePrice === 0 ||
    salePrice === null ||
    cost === null ||
    freightIncluded === null
  ) {
    return null;
  }

  return ((salePrice - cost - freightIncluded) / salePrice) * 100;
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
): number | null {
  if (
    !purchasePrice ||
    typeof purchasePrice.price !== 'number' ||
    !calculation ||
    typeof calculation.internalCommission !== 'number' ||
    typeof calculation.currencyRate !== 'number' ||
    typeof calculation.indirectCost !== 'number'
  ) {
    return null;
  }
  return (
    (purchasePrice!.price + calculation!.internalCommission) *
    calculation!.currencyRate *
    (1 + calculation!.indirectCost / 100)
  );
}
