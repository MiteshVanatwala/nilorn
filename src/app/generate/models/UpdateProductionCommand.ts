/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PurchasePriceDto } from './PurchasePriceDto';

export type UpdateProductionCommand = {
    currencyCode?: string | null;
    released?: boolean;
    moq?: number | null;
    sampleCharge?: number | null;
    toolCharge?: number | null;
    sampleLeadTime?: number | null;
    productionLeadTime?: number | null;
    comment?: string | null;
    id?: string;
    purchasePrices?: Array<PurchasePriceDto> | null;
};
