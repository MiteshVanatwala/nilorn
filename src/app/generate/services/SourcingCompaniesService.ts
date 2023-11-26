/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SourcingCompanyDto } from '../models/SourcingCompanyDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class SourcingCompaniesService {

    /**
     * @returns SourcingCompanyDto Success
     * @throws ApiError
     */
    public static getApiSourcingCompanies(): CancelablePromise<Array<SourcingCompanyDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/SourcingCompanies',
        });
    }

}
