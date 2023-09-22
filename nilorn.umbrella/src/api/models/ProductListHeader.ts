/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ProductBrandSubClient } from './ProductBrandSubClient';
import type { ProductType } from './ProductType';

export type ProductListHeader = {
    showPrice?: boolean;
    showInStockInProductionInDemands?: boolean;
    showInPreload?: boolean;
    showLabelBook?: boolean;
    currencyCode?: string | null;
    productTypes?: Array<ProductType> | null;
    brands?: Array<ProductBrandSubClient> | null;
};

