/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ReportFile } from './ReportFile';

export type Report = {
    name?: string | null;
    title?: string | null;
    description?: string | null;
    reportFiles?: Array<ReportFile> | null;
    requiresUserInputModal?: boolean;
};

