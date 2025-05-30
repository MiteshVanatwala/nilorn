/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ClientRequirementDto } from './ClientRequirementDto';
import type { MemberBriefDto } from './MemberBriefDto';

export type ClientDto = {
    id?: string;
    no?: string | null;
    name?: string | null;
    teamsName?: string | null;
    channelName?: string | null;
    artWorkFolderName?: string | null;
    attachmentFolderName?: string | null;
    keyAccountManager?: MemberBriefDto;
    accountManager?: MemberBriefDto;
    targetMargin?: number;
    members?: Array<MemberBriefDto> | null;
    clientRequirements?: Array<ClientRequirementDto> | null;
    lastModified?: string | null;
};
