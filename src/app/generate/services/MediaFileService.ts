/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MediaFile } from '../models/MediaFile';
import type { MediaFileType } from '../models/MediaFileType';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class MediaFileService {

    /**
     * @param no 
     * @param mediaFileType 
     * @param formData 
     * @returns MediaFile Success
     * @throws ApiError
     */
    public static postApiMediaFile(
no: string,
mediaFileType: MediaFileType,
formData?: {
file?: Blob;
},
): CancelablePromise<MediaFile> {
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

}
