/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Address } from '../models/Address';
import type { AddressCollection } from '../models/AddressCollection';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AddressService {

    /**
     * @param selectedSellToAddressNo
     * @param webOrderId
     * @returns AddressCollection Success
     * @throws ApiError
     */
    public static getV1Addresses(
        selectedSellToAddressNo?: string,
        webOrderId?: number,
    ): CancelablePromise<AddressCollection> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/addresses',
            query: {
                'selectedSellToAddressNo': selectedSellToAddressNo,
                'webOrderId': webOrderId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                500: `Server Error`,
            },
        });
    }

    /**
     * @param requestBody
     * @returns any Success
     * @throws ApiError
     */
    public static postV1Addresses(
        requestBody?: Address,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/addresses',
            body: requestBody,
            mediaType: 'application/json; x-api-version=1.0',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                500: `Server Error`,
            },
        });
    }

}
