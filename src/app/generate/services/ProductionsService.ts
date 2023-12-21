/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProductDevelopmentProductionDto } from '../models/ProductDevelopmentProductionDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ProductionsService {

    /**
     * @returns ProductDevelopmentProductionDto Success
     * @throws ApiError
     */
    public static getApiProductions(): CancelablePromise<Array<ProductDevelopmentProductionDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Productions',
        });
    }

}
