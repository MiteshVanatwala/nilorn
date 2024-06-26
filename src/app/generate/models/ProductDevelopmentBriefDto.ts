/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MediaFileDto } from './MediaFileDto';
import type { Status } from './Status';

export type ProductDevelopmentBriefDto = {
    no?: string | null;
    thumbnailData?: string | null;
    name?: string | null;
    versionSpecification?: string | null;
    status?: Status;
    versions?: number;
    artwork?: MediaFileDto;
    client?: string | null;
    project?: string | null;
    productGroup?: string | null;
    itemCategory?: string | null;
    sourcings?: Array<string> | null;
};

