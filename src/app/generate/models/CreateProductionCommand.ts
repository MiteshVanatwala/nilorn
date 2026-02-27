/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CompositionDto } from './CompositionDto';
import type { ProductionCertificateDto } from './ProductionCertificateDto';
import type { PurchasePriceDto } from './PurchasePriceDto';

export type CreateProductionCommand = {
    currencyCode?: string | null;
    released?: boolean;
    moq?: number | null;
    sampleCharge?: number | null;
    toolCharge?: number | null;
    sampleLeadTimeMin?: number | null;
    productionLeadTimeMin?: number | null;
    sampleLeadTimeMax?: number | null;
    productionLeadTimeMax?: number | null;
    comment?: string | null;
    sourcingId?: string | null;
    vendorId?: string | null;
    purchasePrices?: Array<PurchasePriceDto> | null;
    productionCertificates?: Array<ProductionCertificateDto> | null;
    compositions?: Array<CompositionDto> | null;
};

