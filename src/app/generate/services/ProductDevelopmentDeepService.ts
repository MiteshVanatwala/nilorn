/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GetFilteredProductDevelopmentDeepWithPaginationQuery } from '../models/GetFilteredProductDevelopmentDeepWithPaginationQuery';
import type { ProductDevelopmentDeepDtoPaginatedList } from '../models/ProductDevelopmentDeepDtoPaginatedList';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ProductDevelopmentDeepService {

    /**
     * @param requestBody 
     * @returns ProductDevelopmentDeepDtoPaginatedList Success
     * @throws ApiError
     */
    public static postApiProductDevelopmentDeep(
requestBody?: GetFilteredProductDevelopmentDeepWithPaginationQuery,
): CancelablePromise<ProductDevelopmentDeepDtoPaginatedList> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/ProductDevelopmentDeep',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
