/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MediaFileDto } from './MediaFileDto';
import type { Status } from './Status';

export type ProductDevelopmentVersionDto = {
    no?: string | null;
    name?: string | null;
    status?: Status;
    thumbnailData?: string | null;
    artwork?: MediaFileDto;
    versionSpecification?: string | null;
    sourcings?: Array<string> | null;
};
