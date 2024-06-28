/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OpCompDto } from '../models/OpCompDto';
import type { OptionItem } from '../models/OptionItem';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class OpCompService {

    /**
     * @param isSourcingCompany
     * @returns OpCompDto Success
     * @throws ApiError
     */
    public static getApiOpCompFilter(
        isSourcingCompany?: boolean,
    ): CancelablePromise<Array<OpCompDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/OpComp/Filter',
            query: {
                'isSourcingCompany': isSourcingCompany,
            },
        });
    }

    /**
     * @param isSourcingCompany
     * @returns OptionItem Success
     * @throws ApiError
     */
    public static getApiOpCompFilterOption(
        isSourcingCompany?: boolean,
    ): CancelablePromise<Array<OptionItem>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/OpComp/Filter/Option',
            query: {
                'isSourcingCompany': isSourcingCompany,
            },
        });
    }

}
