/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PreloadedArticleQty } from './PreloadedArticleQty';

export type PreloadedArticleAdd = {
    productNo?: string | null;
    productGroupName?: string | null;
    reference?: string | null;
    preloadedArticleQuantities?: Array<PreloadedArticleQty> | null;
};

