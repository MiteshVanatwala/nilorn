/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MediaFileDto } from './MediaFileDto';
import type { Status } from './Status';

export type ProductDevelopmentDataDto = {
  no?: string | null;
  name?: string | null;
  thumbnailData?: string | null;
  status?: Status;
  projectCode?: string | null;
  clientName?: string | null;
  artwork?: MediaFileDto;
  versionSpecification?: string | null;
  clientRequirement?: string | null;
};

