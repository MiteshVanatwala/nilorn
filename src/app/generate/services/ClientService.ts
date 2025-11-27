/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ClientDto } from '../models/ClientDto';
import type { OptionItem } from '../models/OptionItem';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ClientService {

    /**
     * @deprecated
     * @param filterByAccess 
     * @returns ClientDto Success
     * @throws ApiError
     */
    public static getApiClient(
filterByAccess: boolean = true,
): CancelablePromise<Array<ClientDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Client/{filterByAccess}',
            path: {
                'filterByAccess': filterByAccess,
            },
        });
    }

    /**
     * @param clientno 
     * @returns ClientDto Success
     * @throws ApiError
     */
    public static getApiClient1(
clientno: string,
): CancelablePromise<ClientDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Client/{clientno}',
            path: {
                'clientno': clientno,
            },
        });
    }

    /**
     * @param clientno 
     * @param requestBody 
     * @returns ClientDto Success
     * @throws ApiError
     */
    public static patchApiClient(
clientno: string,
requestBody?: ClientDto,
): CancelablePromise<ClientDto> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/Client/{clientno}',
            path: {
                'clientno': clientno,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param filterByAccess 
     * @param filterByUser 
     * @returns OptionItem Success
     * @throws ApiError
     */
    public static getApiClientFilterOption(
filterByAccess: boolean = true,
filterByUser: boolean = false,
): CancelablePromise<Array<OptionItem>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Client/Filter/Option',
            query: {
                'filterByAccess': filterByAccess,
                'filterByUser': filterByUser,
            },
        });
    }

}
