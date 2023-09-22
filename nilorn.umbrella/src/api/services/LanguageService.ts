/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Language } from '../models/Language';
import type { PageText } from '../models/PageText';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class LanguageService {

    /**
     * @returns Language Success
     * @throws ApiError
     */
    public static getV1Languages(): CancelablePromise<Array<Language>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/languages',
            errors: {
                401: `Unauthorized`,
                500: `Server Error`,
            },
        });
    }

    /**
     * @param langTagLcid
     * @returns PageText Success
     * @throws ApiError
     */
    public static getV1LanguagesPagetexts(
        langTagLcid?: string,
    ): CancelablePromise<Array<PageText>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/languages/pagetexts',
            query: {
                'langTagLcid': langTagLcid,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                500: `Server Error`,
            },
        });
    }

}
