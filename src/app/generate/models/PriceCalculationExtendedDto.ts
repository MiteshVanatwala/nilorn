/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PriceDto } from './PriceDto';
import type { ProductDevelopmentDataDto } from './ProductDevelopmentDataDto';

export type PriceCalculationExtendedDto = {
    id?: string;
    productionId?: string;
    currencyCode?: string | null;
    currencyRate?: number | null;
    internalCommission?: number | null;
    indirectCost?: number | null;
    freightIncluded?: number | null;
    priceDtos?: Array<PriceDto> | null;
    lastModified?: string | null;
    productDevelopmentDataDto?: ProductDevelopmentDataDto;
    vendorName?: string | null;
    sourcingCompanyCode?: string | null;
};
