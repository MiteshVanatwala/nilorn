/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { File } from '../models/File';
import type { FilterInformation } from '../models/FilterInformation';
import type { OrderDetails } from '../models/OrderDetails';
import type { OrderTrackingFilterField } from '../models/OrderTrackingFilterField';
import type { OrderTrackingHeadDetailed } from '../models/OrderTrackingHeadDetailed';
import type { OrderTrackingHeadOrderNos } from '../models/OrderTrackingHeadOrderNos';
import type { OrderTrackingHeads } from '../models/OrderTrackingHeads';
import type { OrderTrackingRows } from '../models/OrderTrackingRows';
import type { OrderTrackingSortField } from '../models/OrderTrackingSortField';
import type { SortDirection } from '../models/SortDirection';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class OrderTrackingService {

    /**
     * @param currentPage
     * @param maxRecordsPerPage
     * @param sortField
     * @param sortDirection
     * @param filterField
     * @param filterValue
     * @returns OrderTrackingHeads Success
     * @throws ApiError
     */
    public static getV1Ordertracking(
        currentPage: number = 1,
        maxRecordsPerPage: number = 30,
        sortField?: OrderTrackingSortField,
        sortDirection?: SortDirection,
        filterField?: Array<OrderTrackingFilterField>,
        filterValue?: Array<string>,
    ): CancelablePromise<OrderTrackingHeads> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/ordertracking',
            query: {
                'currentPage': currentPage,
                'maxRecordsPerPage': maxRecordsPerPage,
                'sortField': sortField,
                'sortDirection': sortDirection,
                'filterField': filterField,
                'filterValue': filterValue,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                500: `Server Error`,
            },
        });
    }

    /**
     * @param orderNo
     * @param shipmentNo
     * @returns OrderTrackingHeadDetailed Success
     * @throws ApiError
     */
    public static getV1Ordertracking1(
        orderNo: string,
        shipmentNo?: string,
    ): CancelablePromise<OrderTrackingHeadDetailed> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/ordertracking/{orderNo}',
            path: {
                'orderNo': orderNo,
            },
            query: {
                'shipmentNo': shipmentNo,
            },
            errors: {
                401: `Unauthorized`,
                500: `Server Error`,
            },
        });
    }

    /**
     * @param orderNo
     * @param shipmentNo
     * @returns OrderTrackingRows Success
     * @throws ApiError
     */
    public static getV1OrdertrackingRows(
        orderNo: string,
        shipmentNo?: string,
    ): CancelablePromise<OrderTrackingRows> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/ordertracking/{orderNo}/rows',
            path: {
                'orderNo': orderNo,
            },
            query: {
                'shipmentNo': shipmentNo,
            },
            errors: {
                401: `Unauthorized`,
                500: `Server Error`,
            },
        });
    }

    /**
     * @param orderNo
     * @param rowNo
     * @param isApproval
     * @returns OrderDetails Success
     * @throws ApiError
     */
    public static getV1OrdertrackingRowsDetails(
        orderNo: string,
        rowNo: number,
        isApproval: boolean = false,
    ): CancelablePromise<OrderDetails> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/ordertracking/{orderNo}/rows/{rowNo}/details',
            path: {
                'orderNo': orderNo,
                'rowNo': rowNo,
            },
            query: {
                'isApproval': isApproval,
            },
            errors: {
                401: `Unauthorized`,
                404: `Not Found`,
                500: `Server Error`,
            },
        });
    }

    /**
     * @param orderNo
     * @returns File Success
     * @throws ApiError
     */
    public static orderConfirmationDocument(
        orderNo: string,
    ): CancelablePromise<File> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/ordertracking/{orderNo}/confirmation-document',
            path: {
                'orderNo': orderNo,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                500: `Server Error`,
            },
        });
    }

    /**
     * @param companyId
     * @param artworkFilename
     * @returns File Success
     * @throws ApiError
     */
    public static artwork(
        companyId: string,
        artworkFilename?: string,
    ): CancelablePromise<File> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/ordertracking/artwork/{companyId}',
            path: {
                'companyId': companyId,
            },
            query: {
                'artworkFilename': artworkFilename,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                404: `Not Found`,
                500: `Server Error`,
            },
        });
    }

    /**
     * @param currentPage
     * @param maxRecordsPerPage
     * @param sortField
     * @param sortDirection
     * @param filterField
     * @param filterValue
     * @returns OrderTrackingHeadOrderNos Success
     * @throws ApiError
     */
    public static getV1OrdertrackingOrdernos(
        currentPage: number = 1,
        maxRecordsPerPage: number = 30,
        sortField?: OrderTrackingSortField,
        sortDirection?: SortDirection,
        filterField?: Array<OrderTrackingFilterField>,
        filterValue?: Array<string>,
    ): CancelablePromise<OrderTrackingHeadOrderNos> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/ordertracking/ordernos',
            query: {
                'currentPage': currentPage,
                'maxRecordsPerPage': maxRecordsPerPage,
                'sortField': sortField,
                'sortDirection': sortDirection,
                'filterField': filterField,
                'filterValue': filterValue,
            },
            errors: {
                401: `Unauthorized`,
                500: `Server Error`,
            },
        });
    }

    /**
     * @returns FilterInformation Success
     * @throws ApiError
     */
    public static getV1OrdertrackingFilterinformation(): CancelablePromise<FilterInformation> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/ordertracking/filterinformation',
            errors: {
                401: `Unauthorized`,
                500: `Server Error`,
            },
        });
    }

}
