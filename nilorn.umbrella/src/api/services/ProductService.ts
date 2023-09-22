/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GlobalStock } from '../models/GlobalStock';
import type { PreloadedArticleFieldInfo } from '../models/PreloadedArticleFieldInfo';
import type { PreloadedArticleRow } from '../models/PreloadedArticleRow';
import type { Product } from '../models/Product';
import type { ProductDetailsInput } from '../models/ProductDetailsInput';
import type { ProductListHeader } from '../models/ProductListHeader';
import type { SortDirection } from '../models/SortDirection';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ProductService {

    /**
     * @param webOrderId
     * @returns ProductListHeader Success
     * @throws ApiError
     */
    public static getV1ProductsProductlistinfo(
        webOrderId?: number,
    ): CancelablePromise<ProductListHeader> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/products/productlistinfo',
            query: {
                'webOrderId': webOrderId,
            },
            errors: {
                401: `Unauthorized`,
                404: `Not Found`,
                500: `Server Error`,
            },
        });
    }

    /**
     * @param webOrderId
     * @param sortDirection
     * @returns Product Success
     * @throws ApiError
     */
    public static getV1Products(
        webOrderId?: number,
        sortDirection?: SortDirection,
    ): CancelablePromise<Array<Product>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/products',
            query: {
                'webOrderId': webOrderId,
                'sortDirection': sortDirection,
            },
            errors: {
                401: `Unauthorized`,
                404: `Not Found`,
                500: `Server Error`,
            },
        });
    }

    /**
     * @returns GlobalStock Success
     * @throws ApiError
     */
    public static getV1ProductsGlobalstock(): CancelablePromise<GlobalStock> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/products/globalstock',
            errors: {
                401: `Unauthorized`,
                404: `Not Found`,
                500: `Server Error`,
            },
        });
    }

    /**
     * @param itemNo
     * @param webOrderId
     * @param rowNumbers
     * @returns ProductDetailsInput Success
     * @throws ApiError
     */
    public static getV1ProductsInputoptions(
        itemNo?: string,
        webOrderId?: number,
        rowNumbers?: Array<number>,
    ): CancelablePromise<ProductDetailsInput> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/products/inputoptions',
            query: {
                'itemNo': itemNo,
                'webOrderId': webOrderId,
                'rowNumbers': rowNumbers,
            },
            errors: {
                401: `Unauthorized`,
                404: `Not Found`,
                500: `Server Error`,
            },
        });
    }

    /**
     * @param productNo
     * @param productGroupName
     * @returns PreloadedArticleFieldInfo Success
     * @throws ApiError
     */
    public static getV1ProductsPreloadedArticleFields(
        productNo?: string,
        productGroupName?: string,
    ): CancelablePromise<PreloadedArticleFieldInfo> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/products/preloaded-article-fields',
            query: {
                'productNo': productNo,
                'productGroupName': productGroupName,
            },
            errors: {
                401: `Unauthorized`,
                404: `Not Found`,
                500: `Server Error`,
            },
        });
    }

    /**
     * @param filterFieldName
     * @param filterFieldValue
     * @param productNo
     * @param customerNo
     * @param productGroupName
     * @returns PreloadedArticleRow Success
     * @throws ApiError
     */
    public static getV1ProductsPreloadedArticleRows(
        filterFieldName?: Array<string>,
        filterFieldValue?: Array<string>,
        productNo?: string,
        customerNo?: string,
        productGroupName?: string,
    ): CancelablePromise<Array<PreloadedArticleRow>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/products/preloaded-article-rows',
            query: {
                'filterFieldName': filterFieldName,
                'filterFieldValue': filterFieldValue,
                'productNo': productNo,
                'customerNo': customerNo,
                'productGroupName': productGroupName,
            },
            errors: {
                401: `Unauthorized`,
                404: `Not Found`,
                500: `Server Error`,
            },
        });
    }

}
