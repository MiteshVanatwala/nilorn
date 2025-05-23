/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class SourcingService {

    /**
     * @param id 
     * @returns number Success
     * @throws ApiError
     */
    public static getApiSourcingQuantities(
id: string,
): CancelablePromise<Array<number>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Sourcing/{id}/quantities',
            path: {
                'id': id,
            },
        });
    }

}
