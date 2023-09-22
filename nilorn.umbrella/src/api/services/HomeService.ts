/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Company } from '../models/Company';
import type { CompanyClient } from '../models/CompanyClient';
import type { CompanyClientChangedResponse } from '../models/CompanyClientChangedResponse';
import type { CompanySpecificInformation } from '../models/CompanySpecificInformation';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class HomeService {

    /**
     * @returns CompanySpecificInformation Success
     * @throws ApiError
     */
    public static getV1HomeMessages(): CancelablePromise<Array<CompanySpecificInformation>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/home/messages',
            errors: {
                401: `Unauthorized`,
                500: `Server Error`,
            },
        });
    }

    /**
     * @returns CompanyClient Success
     * @throws ApiError
     */
    public static getV1HomeClients(): CancelablePromise<Array<CompanyClient>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/home/clients',
            errors: {
                401: `Unauthorized`,
                500: `Server Error`,
            },
        });
    }

    /**
     * @returns CompanyClient Success
     * @throws ApiError
     */
    public static getV1HomeClientsActive(): CancelablePromise<CompanyClient> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/home/clients/active',
            errors: {
                401: `Unauthorized`,
                404: `Not Found`,
                500: `Server Error`,
            },
        });
    }

    /**
     * @param requestBody
     * @returns CompanyClientChangedResponse Success
     * @throws ApiError
     */
    public static putV1HomeClientsActive(
        requestBody?: CompanyClient,
    ): CancelablePromise<CompanyClientChangedResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/v1/home/clients/active',
            body: requestBody,
            mediaType: 'application/json; x-api-version=1.0',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                500: `Server Error`,
            },
        });
    }

    /**
     * @returns Company Success
     * @throws ApiError
     */
    public static getV1HomeCompanies(): CancelablePromise<Array<Company>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/home/companies',
            errors: {
                401: `Unauthorized`,
                500: `Server Error`,
            },
        });
    }

    /**
     * @param requestBody
     * @returns CompanyClientChangedResponse Success
     * @throws ApiError
     */
    public static putV1HomeCompaniesActive(
        requestBody?: Company,
    ): CancelablePromise<CompanyClientChangedResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/v1/home/companies/active',
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
