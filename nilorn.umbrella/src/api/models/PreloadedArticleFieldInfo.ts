/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CustomerName } from './CustomerName';
import type { PreloadedArticleField } from './PreloadedArticleField';

export type PreloadedArticleFieldInfo = {
    lastUpdated?: string;
    showReferenceInput?: boolean;
    referenceIsMandatory?: boolean;
    minimumQty?: number;
    packSize?: number;
    customers?: Array<CustomerName> | null;
    preloadedArticleFields?: Array<PreloadedArticleField> | null;
};

