/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Country } from '../models/Country';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CountryService {

    /**
     * @param onlyCountriesThatSupportAlternativeAddresses
     * @returns Country Success
     * @throws ApiError
     */
    public static getV1Countries(
        onlyCountriesThatSupportAlternativeAddresses?: boolean,
    ): CancelablePromise<Array<Country>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/countries',
            query: {
                'onlyCountriesThatSupportAlternativeAddresses': onlyCountriesThatSupportAlternativeAddresses,
            },
            errors: {
                401: `Unauthorized`,
                500: `Server Error`,
            },
        });
    }

}
