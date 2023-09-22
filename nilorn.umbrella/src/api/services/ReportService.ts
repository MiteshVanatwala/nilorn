/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { File } from '../models/File';
import type { InputOptions } from '../models/InputOptions';
import type { Report } from '../models/Report';
import type { ReportFileFormat } from '../models/ReportFileFormat';
import type { ReportListFor } from '../models/ReportListFor';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ReportService {

    /**
     * @param reportListFor
     * @returns Report Success
     * @throws ApiError
     */
    public static getV1Reports(
        reportListFor: ReportListFor,
    ): CancelablePromise<Array<Report>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/reports',
            query: {
                'reportListFor': reportListFor,
            },
            errors: {
                401: `Unauthorized`,
                500: `Server Error`,
            },
        });
    }

    /**
     * @param reportName
     * @param reportFileFormat
     * @param lightVersion
     * @param requestBody
     * @returns File Success
     * @throws ApiError
     */
    public static report(
        reportName: string,
        reportFileFormat: ReportFileFormat,
        lightVersion?: boolean,
        requestBody?: Record<string, string>,
    ): CancelablePromise<File> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/reports/{reportName}',
            path: {
                'reportName': reportName,
            },
            query: {
                'reportFileFormat': reportFileFormat,
                'lightVersion': lightVersion,
            },
            body: requestBody,
            mediaType: 'application/json; x-api-version=1.0',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                404: `Not Found`,
                500: `Server Error`,
            },
        });
    }

    /**
     * @param reportName
     * @returns InputOptions Success
     * @throws ApiError
     */
    public static getV1ReportsInputoptions(
        reportName: string,
    ): CancelablePromise<InputOptions> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/reports/{reportName}/inputoptions',
            path: {
                'reportName': reportName,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                404: `Not Found`,
                500: `Server Error`,
            },
        });
    }

}
