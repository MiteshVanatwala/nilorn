/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SalespersonPurchaserBriefDto } from './SalespersonPurchaserBriefDto';
import type { SourcingDto } from './SourcingDto';
import type { Status } from './Status';

export type ProductDevelopmentDto = {
    no?: string | null;
    name?: string | null;
    description?: string | null;
    itemNo?: string | null;
    status?: Status;
    imageUrl?: string | null;
    artworkUrl?: string | null;
    client?: string | null;
    clientId?: string | null;
    project?: string | null;
    itemCategoryCode?: string | null;
    productGroupCode?: string | null;
    foldingTypeCode?: string | null;
    finishedLength?: number | null;
    finishedWidth?: number | null;
    finishedHeight?: number | null;
    sampleQuantity?: number | null;
    targetSalesPrice?: string | null;
    freightIncluded?: number;
    versions?: number | null;
    sourcings?: Array<SourcingDto> | null;
    salespersonPurchasers?: Array<SalespersonPurchaserBriefDto> | null;
};
