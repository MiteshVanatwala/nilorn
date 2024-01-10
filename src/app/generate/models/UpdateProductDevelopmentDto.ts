/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SalespersonPurchaserBriefDto } from './SalespersonPurchaserBriefDto';
import type { SourcingDto } from './SourcingDto';
import type { Status } from './Status';

export type UpdateProductDevelopmentDto = {
    name?: string | null;
    description?: string | null;
    itemNo?: string | null;
    status?: Status;
    itemCategoryCode?: string | null;
    productGroupCode?: string | null;
    foldingTypeCode?: string | null;
    finishedLength?: number | null;
    finishedWidth?: number | null;
    finishedHeight?: number | null;
    sampleQuantity?: number | null;
    targetSalesPrice?: string | null;
    freightIncluded?: number | null;
    projectCode?: string | null;
    sourcings?: Array<SourcingDto> | null;
    salespersonPurchasers?: Array<SalespersonPurchaserBriefDto> | null;
};
