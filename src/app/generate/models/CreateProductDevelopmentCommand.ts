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
    clientId?: string;
    subClientId?: string | null;
    projectId?: string | null;
    itemCategoryId?: string | null;
    productGroupId?: string | null;
    foldingTypeId?: string | null;
    finishedLength?: number | null;
    finishedWidth?: number | null;
    finishedHeight?: number | null;
    sampleQuantity?: number | null;
};
