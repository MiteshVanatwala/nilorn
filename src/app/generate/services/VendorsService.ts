/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { VendorDto } from '../models/VendorDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class VendorsService {

    /**
     * @returns VendorDto Success
     * @throws ApiError
     */
    public static getApiVendors(): CancelablePromise<Array<VendorDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Vendors',
        });
    }

}
