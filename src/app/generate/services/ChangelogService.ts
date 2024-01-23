/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChangelogDto } from '../models/ChangelogDto';
import type { ChangelogType } from '../models/ChangelogType';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ChangelogService {

    /**
     * @param type 
     * @param id 
     * @param productDevelopmentNo 
     * @returns ChangelogDto Success
     * @throws ApiError
     */
    public static getApiChangelog(
type?: ChangelogType,
id?: string,
productDevelopmentNo?: string,
): CancelablePromise<Array<ChangelogDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Changelog',
            query: {
                'Type': type,
                'Id': id,
                'ProductDevelopmentNo': productDevelopmentNo,
            },
        });
    }

}
