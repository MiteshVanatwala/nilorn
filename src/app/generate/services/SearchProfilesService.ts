/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SearchProfileDto } from '../models/SearchProfileDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class SearchProfilesService {

    /**
     * @returns SearchProfileDto Success
     * @throws ApiError
     */
    public static getApiSearchProfiles(): CancelablePromise<Array<SearchProfileDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/SearchProfiles',
        });
    }

}
