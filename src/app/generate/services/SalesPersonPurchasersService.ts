/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SalespersonPurchaserBriefDto } from '../models/SalespersonPurchaserBriefDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class SalesPersonPurchasersService {

    /**
     * @returns SalespersonPurchaserBriefDto Success
     * @throws ApiError
     */
    public static getApiSalesPersonPurchasers(): CancelablePromise<Array<SalespersonPurchaserBriefDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/SalesPersonPurchasers',
        });
    }

    /**
     * @param no 
     * @returns SalespersonPurchaserBriefDto Success
     * @throws ApiError
     */
    public static getApiSalesPersonPurchasersFilter(
no?: string,
): CancelablePromise<Array<SalespersonPurchaserBriefDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/SalesPersonPurchasers/Filter',
            query: {
                'no': no,
            },
        });
    }

}
