/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SalespersonPurchaserBriefDto } from './SalespersonPurchaserBriefDto';

export type SourcingCompanyDto = {
    name?: string | null;
    isSourcingCompany?: boolean;
    currencyCode?: string | null;
    salespersonPurchasers?: Array<SalespersonPurchaserBriefDto> | null;
};
