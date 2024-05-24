/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OptionItem } from '../models/OptionItem';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CompositionMaterialService {

    /**
     * @returns OptionItem Success
     * @throws ApiError
     */
    public static getApiCompositionMaterial(): CancelablePromise<Array<OptionItem>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/CompositionMaterial',
        });
    }

}
