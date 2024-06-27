/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CurrencyDto } from '../models/CurrencyDto';
import type { OptionItem } from '../models/OptionItem';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CurrencyService {

    /**
     * @param currencyCode
     * @returns CurrencyDto Success
     * @throws ApiError
     */
    public static getApiCurrency(
        currencyCode?: string,
    ): CancelablePromise<CurrencyDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Currency',
            query: {
                'currencyCode': currencyCode,
            },
        });
    }

    /**
     * @returns OptionItem Success
     * @throws ApiError
     */
    public static getApiCurrencyFilterOption(): CancelablePromise<Array<OptionItem>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Currency/Filter/Option',
        });
    }

}
