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
<<<<<<< HEAD
     * @param requestBody
=======
     * @param requestBody 
>>>>>>> 20278ba (Generate api)
     * @returns ProductDevelopmentDeepDtoPaginatedList Success
     * @throws ApiError
     */
    public static postApiProductDevelopmentDeep(
<<<<<<< HEAD
        requestBody?: GetFilteredProductDevelopmentDeepWithPaginationQuery,
    ): CancelablePromise<ProductDevelopmentDeepDtoPaginatedList> {
=======
requestBody?: GetFilteredProductDevelopmentDeepWithPaginationQuery,
): CancelablePromise<ProductDevelopmentDeepDtoPaginatedList> {
>>>>>>> 20278ba (Generate api)
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/ProductDevelopmentDeep',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
