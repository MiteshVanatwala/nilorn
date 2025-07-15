/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MemberBriefDto } from './MemberBriefDto';

export type ProjectPageDto = {
  id?: string | null;
  code?: string | null;
  clientId?: string | null;
  description?: string | null;
  artWorkFolderName?: string | null;
  attachmentFolderName?: string | null;
  channelName?: string | null;
  teamsName?: string | null;
  members?: Array<MemberBriefDto> | null;
};
