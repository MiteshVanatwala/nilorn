/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PriceDto } from './PriceDto';

export type PriceCalculationDto = {
    productionId?: string;
    currencyCode?: string | null;
    currencyRate?: number | null;
    internalCommission?: number | null;
    indirectCost?: number | null;
    freightIncluded?: number | null;
    priceDtos?: Array<PriceDto> | null;
};
