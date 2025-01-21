/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MemberDto } from './MemberDto';

export type ProjectCardDto = {
    id?: string;
    code?: string | null;
    description?: string | null;
    clientNo?: string | null;
    clientName?: string | null;
    members?: Array<MemberDto> | null;
    lastModified?: string | null;
};
