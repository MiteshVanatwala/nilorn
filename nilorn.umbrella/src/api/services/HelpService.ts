/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Document } from '../models/Document';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class HelpService {

    /**
     * @returns Document Success
     * @throws ApiError
     */
    public static getV1HelpDocuments(): CancelablePromise<Array<Document>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/help/documents',
            errors: {
                401: `Unauthorized`,
                500: `Server Error`,
            },
        });
    }

}
