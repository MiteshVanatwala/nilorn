/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ProductGroupService {

    /**
     * @param itemCategoryCode 
     * @returns string Success
     * @throws ApiError
     */
    public static getApiProductGroup(
itemCategoryCode: string,
): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/ProductGroup/{itemCategoryCode}',
            path: {
                'itemCategoryCode': itemCategoryCode,
            },
        });
    }

}
