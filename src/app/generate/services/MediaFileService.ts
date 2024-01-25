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
     * @param no 
     * @param mediaFileType 
     * @param formData 
     * @returns MediaFileDto Success
     * @throws ApiError
     */
    public static postApiMediaFile(
no: string,
mediaFileType: MediaFileType,
formData?: {
file?: Blob;
},
): CancelablePromise<MediaFileDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/MediaFile/{no}/{mediaFileType}',
            path: {
                'no': no,
                'mediaFileType': mediaFileType,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }

    /**
     * @param no 
     * @returns MediaFileDto Success
     * @throws ApiError
     */
    public static getApiMediaFileAttachments(
no: string,
): CancelablePromise<Array<MediaFileDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/MediaFile/{no}/attachments',
            path: {
                'no': no,
            },
        });
    }

    /**
     * @param id 
     * @returns boolean Success
     * @throws ApiError
     */
    public static deleteApiMediaFile(
id: string,
): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/MediaFile/{id}',
            path: {
                'id': id,
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

}
