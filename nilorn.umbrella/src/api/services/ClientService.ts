/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BrandSeasonList } from '../models/BrandSeasonList';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ClientService {

    /**
     * @param clientNo
     * @returns BrandSeasonList Success
     * @throws ApiError
     */
    public static getV1ClientsBrandseasons(
        clientNo: string,
    ): CancelablePromise<BrandSeasonList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/clients/{clientNo}/brandseasons',
            path: {
                'clientNo': clientNo,
            },
            errors: {
                401: `Unauthorized`,
                404: `Not Found`,
                500: `Server Error`,
            },
        });
    }

}
