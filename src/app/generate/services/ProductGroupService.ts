/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OptionItem } from '../models/OptionItem';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ProductGroupService {

    /**
     * @param itemCategoryCode
     * @returns OptionItem Success
     * @throws ApiError
     */
    public static getApiProductGroupFilter(
        itemCategoryCode?: string,
    ): CancelablePromise<Array<OptionItem>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/ProductGroup/Filter',
            query: {
                'ItemCategoryCode': itemCategoryCode,
            },
        });
    }

}
