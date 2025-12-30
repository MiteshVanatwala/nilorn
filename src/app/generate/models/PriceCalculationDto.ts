/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CurrencyDto } from './CurrencyDto';
import type { PriceDto } from './PriceDto';

export type PriceCalculationDto = {
    id?: string;
    productionId?: string;
    currency?: CurrencyDto;
    currencyRate?: number | null;
    internalCommission?: number | null;
    indirectCost?: number | null;
    freightIncluded?: number | null;
    priceDtos?: Array<PriceDto> | null;
    lastModified?: string | null;
};
