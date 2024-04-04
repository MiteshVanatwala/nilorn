/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PriceCalculationDto } from './PriceCalculationDto';
import type { ProductDevelopmentDataDto } from './ProductDevelopmentDataDto';
import type { PurchasePriceDto } from './PurchasePriceDto';

export type ProductionExtendedDto = {
  currencyCode?: string | null;
  released?: boolean;
  moq?: number | null;
  sampleCharge?: number | null;
  toolCharge?: number | null;
  sampleLeadTime?: number | null;
  productionLeadTime?: number | null;
  comment?: string | null;
  id?: string;
  vendorId?: string | null;
  priceCalculations?: Array<PriceCalculationDto> | null;
  productDevelopmentDataDto?: ProductDevelopmentDataDto;
  purchasePrices?: Array<PurchasePriceDto> | null;
  vendorName?: string | null;
  sourcingCompanyCode?: string | null;
  lastModified?: string | null;
};
