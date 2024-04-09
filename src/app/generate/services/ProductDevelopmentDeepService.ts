/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProductDevelopmentDeepDtoPaginatedList } from '../models/ProductDevelopmentDeepDtoPaginatedList';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ProductDevelopmentDeepService {

    /**
     * @param pageNumber
     * @param pageSize
     * @param includeCalculations
     * @param productDevelopments
     * @param vendors
     * @param sourcingCompanies
     * @param clients
     * @param projects
     * @returns ProductDevelopmentDeepDtoPaginatedList Success
     * @throws ApiError
     */
    public static getApiProductDevelopmentDeep(
        pageNumber?: number,
        pageSize?: number,
        includeCalculations?: boolean,
        productDevelopments?: string,
        vendors?: string,
        sourcingCompanies?: string,
        clients?: string,
        projects?: string,
    ): CancelablePromise<ProductDevelopmentDeepDtoPaginatedList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/ProductDevelopmentDeep',
            query: {
                'PageNumber': pageNumber,
                'PageSize': pageSize,
                'IncludeCalculations': includeCalculations,
                'ProductDevelopments': productDevelopments,
                'Vendors': vendors,
                'SourcingCompanies': sourcingCompanies,
                'Clients': clients,
                'Projects': projects,
            },
        });
    }

}
