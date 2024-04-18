/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CompositionDto } from './CompositionDto';
import type { PriceCalculationDto } from './PriceCalculationDto';
import type { ProductDevelopmentDataDto } from './ProductDevelopmentDataDto';
import type { ProductionCertificateDto } from './ProductionCertificateDto';
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
    purchasePrices?: Array<PurchasePriceDto> | null;
    priceCalculations?: Array<PriceCalculationDto> | null;
    productDevelopmentDataDto?: ProductDevelopmentDataDto;
    productionCertificates?: Array<ProductionCertificateDto> | null;
    compositions?: Array<CompositionDto> | null;
    vendorName?: string | null;
    sourcingCompanyCode?: string | null;
    lastModified?: string | null;
};

