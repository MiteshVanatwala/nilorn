/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PriceCalculationDto } from './PriceCalculationDto';
import type { PurchasePriceDto } from './PurchasePriceDto';

export type ProductionDto = {
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
    vendorName?: string | null;
    purchasePrices?: Array<PurchasePriceDto> | null;
    priceCalculations?: Array<PriceCalculationDto> | null;
    lastModified?: string | null;
};
