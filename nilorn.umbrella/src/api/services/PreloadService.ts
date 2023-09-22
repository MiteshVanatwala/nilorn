/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ListFilterCriteria } from '../models/ListFilterCriteria';
import type { PreloadedOrderFilterData } from '../models/PreloadedOrderFilterData';
import type { PreloadedOrders } from '../models/PreloadedOrders';
import type { PreloadedOrderSortField } from '../models/PreloadedOrderSortField';
import type { SortDirection } from '../models/SortDirection';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PreloadService {

    /**
     * @param requestedChunkSize
     * @param currentPage
     * @param sortField
     * @param sortDirection
     * @param filterField
     * @param filterValue
     * @returns PreloadedOrders Success
     * @throws ApiError
     */
    public static getV1PreloadOrders(
        requestedChunkSize: number = 30,
        currentPage: number = 1,
        sortField?: PreloadedOrderSortField,
        sortDirection?: SortDirection,
        filterField?: Array<ListFilterCriteria>,
        filterValue?: Array<string>,
    ): CancelablePromise<PreloadedOrders> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/preload/orders',
            query: {
                'requestedChunkSize': requestedChunkSize,
                'currentPage': currentPage,
                'sortField': sortField,
                'sortDirection': sortDirection,
                'filterField': filterField,
                'filterValue': filterValue,
            },
            errors: {
                401: `Unauthorized`,
                404: `Not Found`,
                500: `Server Error`,
            },
        });
    }

    /**
     * @returns PreloadedOrderFilterData Success
     * @throws ApiError
     */
    public static getV1PreloadGlobalfilterdata(): CancelablePromise<PreloadedOrderFilterData> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/preload/globalfilterdata',
            errors: {
                401: `Unauthorized`,
                404: `Not Found`,
                500: `Server Error`,
            },
        });
    }

}
