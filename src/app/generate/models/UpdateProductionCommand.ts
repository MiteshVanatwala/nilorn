/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CompositionDto } from './CompositionDto';
import type { ProductionCertificateDto } from './ProductionCertificateDto';
import type { PurchasePriceDto } from './PurchasePriceDto';

export type UpdateProductionCommand = {
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
    id?: string;
    purchasePrices?: Array<PurchasePriceDto> | null;
    productionCertificates?: Array<ProductionCertificateDto> | null;
    compositions?: Array<CompositionDto> | null;
};
