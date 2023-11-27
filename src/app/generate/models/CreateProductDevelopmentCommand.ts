/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Status } from './Status';

export type CreateProductDevelopmentCommand = {
    no?: string | null;
    name?: string | null;
    description?: string | null;
    itemNo?: string | null;
    status?: Status;
    clientId?: string | null;
    subClientId?: string | null;
    projectId?: string | null;
    itemCategoryCode?: string | null;
    productGroupCode?: string | null;
    foldingTypeCode?: string | null;
    finishedLength?: number | null;
    finishedWidth?: number | null;
    finishedHeight?: number | null;
    sampleQuantity?: number | null;
};
