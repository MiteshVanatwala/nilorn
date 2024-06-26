/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MediaFileDto } from '../models/MediaFileDto';
import type { MediaFileType } from '../models/MediaFileType';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class MediaFileService {

    /**
     * @param productDevelopmentNo
     * @param mediaFileType
     * @param replaceArtwork
     * @param formData
     * @returns MediaFileDto Success
     * @throws ApiError
     */
    public static postApiMediaFileUpload(
        productDevelopmentNo: string,
        mediaFileType: MediaFileType,
        replaceArtwork?: boolean,
        formData?: {
            file?: Blob;
        },
    ): CancelablePromise<MediaFileDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/MediaFile/upload/{mediaFileType}/{productDevelopmentNo}',
            path: {
                'productDevelopmentNo': productDevelopmentNo,
                'mediaFileType': mediaFileType,
            },
            query: {
                'replaceArtwork': replaceArtwork,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }

    /**
     * @param id
     * @param keepInSharePoint
     * @returns any Success
     * @throws ApiError
     */
    public static deleteApiMediaFile(
        id: string,
        keepInSharePoint?: boolean,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/MediaFile/{id}',
            path: {
                'id': id,
            },
            query: {
                'keepInSharePoint': keepInSharePoint,
            },
        });
    }

    /**
     * @param id
     * @returns any Success
     * @throws ApiError
     */
    public static getApiMediaFile(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/MediaFile/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param productDevelopmentNo
     * @returns MediaFileDto Success
     * @throws ApiError
     */
    public static getApiMediaFileAttachments(
        productDevelopmentNo: string,
    ): CancelablePromise<Array<MediaFileDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/MediaFile/attachments/{productDevelopmentNo}',
            path: {
                'productDevelopmentNo': productDevelopmentNo,
            },
        });
    }

}
