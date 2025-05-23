/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OptionItem } from '../models/OptionItem';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CertificateService {

    /**
     * @returns OptionItem Success
     * @throws ApiError
     */
    public static getApiCertificate(): CancelablePromise<Array<OptionItem>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Certificate',
        });
    }

    /**
     * @param certificateCode 
     * @returns OptionItem Success
     * @throws ApiError
     */
    public static getApiCertificateClasses(
certificateCode: string,
): CancelablePromise<Array<OptionItem>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Certificate/Classes/{certificateCode}',
            path: {
                'certificateCode': certificateCode,
            },
        });
    }

    /**
     * @param certificateCode 
     * @returns OptionItem Success
     * @throws ApiError
     */
    public static getApiCertificateCategories(
certificateCode: string,
): CancelablePromise<Array<OptionItem>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Certificate/Categories/{certificateCode}',
            path: {
                'certificateCode': certificateCode,
            },
        });
    }

}
