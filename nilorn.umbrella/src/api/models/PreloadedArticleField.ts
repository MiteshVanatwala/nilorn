/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PreloadedArticleFilterType } from './PreloadedArticleFilterType';

export type PreloadedArticleField = {
    fieldName?: string | null;
    fieldLabel?: string | null;
    filterInputType?: PreloadedArticleFilterType;
    filterValues?: Array<string> | null;
};

