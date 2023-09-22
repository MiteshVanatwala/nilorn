/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ItemInfoType } from './ItemInfoType';
import type { ProductBrandSubClient } from './ProductBrandSubClient';

export type Product = {
    productNo?: string | null;
    description?: string | null;
    productGroupName?: string | null;
    isVariable?: boolean;
    price?: number;
    imageUrl?: string | null;
    productType?: string | null;
    brand?: ProductBrandSubClient;
    inStock?: number;
    inProduction?: number;
    demands?: number;
    inPreload?: number;
    packSize?: number;
    productComments?: Array<string> | null;
    variableType?: ItemInfoType;
    subProducts?: Array<Product> | null;
};

