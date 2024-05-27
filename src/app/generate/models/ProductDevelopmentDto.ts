/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MediaFileDto } from './MediaFileDto';
import type { MemberBriefDto } from './MemberBriefDto';
import type { SourcingDto } from './SourcingDto';
import type { Status } from './Status';

export type ProductDevelopmentDto = {
    name?: string | null;
    description?: string | null;
    versionSpecification?: string | null;
    itemNo?: string | null;
    projectCode?: string | null;
    itemCategoryCode?: string | null;
    productGroupCode?: string | null;
    foldingTypeCode?: string | null;
    finishedLength?: number | null;
    finishedWidth?: number | null;
    finishedHeight?: number | null;
    sampleQuantity?: number | null;
    targetSalesPrice?: string | null;
    freightIncluded?: number | null;
    no?: string | null;
    status?: Status;
    thumbnailData?: string | null;
    artwork?: MediaFileDto;
    client?: string | null;
    clientNo?: string | null;
    versions?: number | null;
    sourcings?: Array<SourcingDto> | null;
    members?: Array<MemberBriefDto> | null;
    hasProductions?: boolean;
    hasPriceCalculation?: boolean;
    lastModified?: string | null;
};
