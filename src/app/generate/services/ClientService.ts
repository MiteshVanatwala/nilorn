/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ClientDto } from '../models/ClientDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ClientService {

    /**
     * @returns ClientDto Success
     * @throws ApiError
     */
    public static getApiClient(filterByAccess: boolean): CancelablePromise<Array<ClientDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Client/{filterByAccess}',
            path: {
                'filterByAccess': filterByAccess,
            },
        });
    }

}
