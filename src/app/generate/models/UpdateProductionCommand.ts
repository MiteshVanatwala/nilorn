/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PurchasePriceDto } from './PurchasePriceDto';

export type UpdateProductionCommand = {
    productionId?: string;
    currencyCode?: string | null;
    released?: boolean;
    moq?: number;
    sampleCharge?: number;
    toolCharge?: number;
    sampleLeadTime?: number;
    productionLeadTime?: number;
    comment?: string | null;
    purchasePrices?: Array<PurchasePriceDto> | null;
};
