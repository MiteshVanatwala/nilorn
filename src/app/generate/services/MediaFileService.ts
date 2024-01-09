/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class MediaFileService {

    /**
     * @param no 
     * @param formData 
     * @returns boolean Success
     * @throws ApiError
     */
    public static postApiMediaFileAttachments(
no: string,
formData?: {
file?: Blob;
},
): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/MediaFile/attachments/{no}',
            path: {
                'no': no,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }

}
