/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { File } from '../models/File';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AssetService {

    /**
     * @param companyId
     * @param clientNo
     * @returns File Success
     * @throws ApiError
     */
    public static clientLogo(
        companyId: string,
        clientNo: string,
    ): CancelablePromise<File> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/assets/{companyId}/clients/{clientNo}/logo',
            path: {
                'companyId': companyId,
                'clientNo': clientNo,
            },
            errors: {
                404: `Not Found`,
                500: `Server Error`,
            },
        });
    }

    /**
     * @param companyId
     * @param itemNo
     * @returns File Success
     * @throws ApiError
     */
    public static itemImage(
        companyId: string,
        itemNo: string,
    ): CancelablePromise<File> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/assets/{companyId}/items/{itemNo}/image',
            path: {
                'companyId': companyId,
                'itemNo': itemNo,
            },
            errors: {
                404: `Not Found`,
                500: `Server Error`,
            },
        });
    }

    /**
     * @param companyId
     * @param filenameOnServer
     * @param filenameOnClient
     * @returns File Success
     * @throws ApiError
     */
    public static helpDocument(
        companyId: string,
        filenameOnServer?: string,
        filenameOnClient?: string,
    ): CancelablePromise<File> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/assets/{companyId}/helpdocuments',
            path: {
                'companyId': companyId,
            },
            query: {
                'filenameOnServer': filenameOnServer,
                'filenameOnClient': filenameOnClient,
            },
            errors: {
                404: `Not Found`,
                500: `Server Error`,
            },
        });
    }

}
