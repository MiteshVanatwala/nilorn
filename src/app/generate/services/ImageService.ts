/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ImageService {

    /**
     * @param productDevelopmentNo
     * @returns string Success
     * @throws ApiError
     */
    public static getApiImage(
        productDevelopmentNo: string,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Image/{productDevelopmentNo}',
            path: {
                'productDevelopmentNo': productDevelopmentNo,
            },
        });
    }

    /**
     * @param productDevelopmentNo
     * @param formData
     * @returns string Success
     * @throws ApiError
     */
    public static putApiImage(
        productDevelopmentNo: string,
        formData?: {
            file?: Blob;
        },
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/Image/{productDevelopmentNo}',
            path: {
                'productDevelopmentNo': productDevelopmentNo,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }

    /**
     * @param productDevelopmentNo
     * @returns any Success
     * @throws ApiError
     */
    public static deleteApiImage(
        productDevelopmentNo: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/Image/{productDevelopmentNo}',
            path: {
                'productDevelopmentNo': productDevelopmentNo,
            },
        });
    }

}
