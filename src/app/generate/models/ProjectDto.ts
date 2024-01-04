/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ClientDto } from './ClientDto';
import type { ProductDevelopmentBriefDto } from './ProductDevelopmentBriefDto';
import type { SalespersonPurchaserBriefDto } from './SalespersonPurchaserBriefDto';

export type ProjectDto = {
    id?: string | null;
    code?: string | null;
    clientId?: string | null;
    client?: ClientDto;
    description?: string | null;
    productDevelopment?: Array<ProductDevelopmentBriefDto> | null;
    salespersonPurchasers?: Array<SalespersonPurchaserBriefDto> | null;
};
