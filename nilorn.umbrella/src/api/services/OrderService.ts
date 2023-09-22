/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ArtworkType } from '../models/ArtworkType';
import type { DeleteOrderRowsRequest } from '../models/DeleteOrderRowsRequest';
import type { File } from '../models/File';
import type { OrderConfirmation } from '../models/OrderConfirmation';
import type { OrderConfirmationResponse } from '../models/OrderConfirmationResponse';
import type { OrderDetails } from '../models/OrderDetails';
import type { OrderHead } from '../models/OrderHead';
import type { OrderHeadCreate } from '../models/OrderHeadCreate';
import type { OrderHeadUpdate } from '../models/OrderHeadUpdate';
import type { OrderReviewOptions } from '../models/OrderReviewOptions';
import type { OrderRowCreate } from '../models/OrderRowCreate';
import type { OrderRows } from '../models/OrderRows';
import type { OrderRowUpdate } from '../models/OrderRowUpdate';
import type { PreloadedArticleAdd } from '../models/PreloadedArticleAdd';
import type { PreloadedOrders } from '../models/PreloadedOrders';
import type { PreOrderViewStatus } from '../models/PreOrderViewStatus';
import type { UnconfirmedOrderStatus } from '../models/UnconfirmedOrderStatus';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class OrderService {

    /**
     * @param status
     * @returns OrderHead Success
     * @throws ApiError
     */
    public static getV1Orders(
        status: Array<UnconfirmedOrderStatus>,
    ): CancelablePromise<Array<OrderHead>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/orders',
            query: {
                'status': status,
            },
            errors: {
                401: `Unauthorized`,
                500: `Server Error`,
            },
        });
    }

    /**
     * @param requestBody
     * @returns number Success
     * @throws ApiError
     */
    public static postV1Orders(
        requestBody?: OrderHeadCreate,
    ): CancelablePromise<Array<number>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/orders',
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
     * @param webOrderId
     * @returns OrderHead Success
     * @throws ApiError
     */
    public static getV1Orders1(
        webOrderId: number,
    ): CancelablePromise<OrderHead> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/orders/{webOrderId}',
            path: {
                'webOrderId': webOrderId,
            },
            errors: {
                401: `Unauthorized`,
                404: `Not Found`,
                500: `Server Error`,
            },
        });
    }

    /**
     * @param webOrderId
     * @returns any Success
     * @throws ApiError
     */
    public static deleteV1Orders(
        webOrderId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/orders/{webOrderId}',
            path: {
                'webOrderId': webOrderId,
            },
            errors: {
                401: `Unauthorized`,
                404: `Not Found`,
                500: `Server Error`,
            },
        });
    }

    /**
     * @param webOrderId
     * @param requestBody
     * @returns any Success
     * @throws ApiError
     */
    public static putV1Orders(
        webOrderId: number,
        requestBody?: OrderHeadUpdate,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/v1/orders/{webOrderId}',
            path: {
                'webOrderId': webOrderId,
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
     * @param webOrderId
     * @param review
     * @returns OrderRows Success
     * @throws ApiError
     */
    public static getV1OrdersRows(
        webOrderId: number,
        review: boolean = false,
    ): CancelablePromise<OrderRows> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/orders/{webOrderId}/rows',
            path: {
                'webOrderId': webOrderId,
            },
            query: {
                'review': review,
            },
            errors: {
                401: `Unauthorized`,
                404: `Not Found`,
                500: `Server Error`,
            },
        });
    }

    /**
     * @param webOrderId
     * @param requestBody
     * @returns any Success
     * @throws ApiError
     */
    public static postV1OrdersRows(
        webOrderId: number,
        requestBody?: Array<OrderRowCreate>,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/orders/{webOrderId}/rows',
            path: {
                'webOrderId': webOrderId,
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
     * @param webOrderId
     * @param rowNo
     * @param requestBody
     * @returns any Success
     * @throws ApiError
     */
    public static putV1OrdersRows(
        webOrderId: number,
        rowNo: number,
        requestBody?: OrderRowUpdate,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/v1/orders/{webOrderId}/rows/{rowNo}',
            path: {
                'webOrderId': webOrderId,
                'rowNo': rowNo,
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
     * @param webOrderId
     * @param rowNo
     * @returns OrderDetails Success
     * @throws ApiError
     */
    public static getV1OrdersRowsDetails(
        webOrderId: number,
        rowNo: number,
    ): CancelablePromise<OrderDetails> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/orders/{webOrderId}/rows/{rowNo}/details',
            path: {
                'webOrderId': webOrderId,
                'rowNo': rowNo,
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
     * @param webOrderId
     * @param rowNo
     * @param pdfType
     * @param recreate
     * @returns File Success
     * @throws ApiError
     */
    public static webOrderRowPdf(
        webOrderId: number,
        rowNo: number,
        pdfType?: ArtworkType,
        recreate: boolean = false,
    ): CancelablePromise<File> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/orders/{webOrderId}/rows/{rowNo}/pdf',
            path: {
                'webOrderId': webOrderId,
                'rowNo': rowNo,
            },
            query: {
                'pdfType': pdfType,
                'recreate': recreate,
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
     * @param webOrderId
     * @returns OrderReviewOptions Success
     * @throws ApiError
     */
    public static getV1OrdersReviewoptions(
        webOrderId: number,
    ): CancelablePromise<OrderReviewOptions> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/orders/{webOrderId}/reviewoptions',
            path: {
                'webOrderId': webOrderId,
            },
            errors: {
                401: `Unauthorized`,
                404: `Not Found`,
                500: `Server Error`,
            },
        });
    }

    /**
     * @param webOrderId
     * @param requestBody
     * @returns any Success
     * @throws ApiError
     */
    public static postV1OrdersRowsDeleteRequests(
        webOrderId: number,
        requestBody?: DeleteOrderRowsRequest,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/orders/{webOrderId}/rows/delete-requests',
            path: {
                'webOrderId': webOrderId,
            },
            body: requestBody,
            mediaType: 'application/json; x-api-version=1.0',
            errors: {
                401: `Unauthorized`,
                404: `Not Found`,
                500: `Server Error`,
            },
        });
    }

    /**
     * @param webOrderId
     * @param requestBody
     * @returns any Success
     * @throws ApiError
     */
    public static postV1OrdersPreloadedArticles(
        webOrderId: number,
        requestBody?: PreloadedArticleAdd,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/orders/{webOrderId}/preloaded-articles',
            path: {
                'webOrderId': webOrderId,
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
     * @param webOrderId
     * @param requestBody
     * @returns OrderConfirmationResponse Success
     * @throws ApiError
     */
    public static postV1OrdersConfirmation(
        webOrderId: number,
        requestBody?: OrderConfirmation,
    ): CancelablePromise<OrderConfirmationResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/orders/{webOrderId}/confirmation',
            path: {
                'webOrderId': webOrderId,
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
     * @param preloadedOrderStatus
     * @param shipToAddressNo
     * @param yourReferenceNo
     * @param sortField
     * @returns PreloadedOrders Success
     * @throws ApiError
     */
    public static getV1OrdersPreloadedOrders(
        preloadedOrderStatus: PreOrderViewStatus,
        shipToAddressNo?: string,
        yourReferenceNo?: string,
        sortField?: string,
    ): CancelablePromise<PreloadedOrders> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/orders/preloaded-orders/{preloadedOrderStatus}',
            path: {
                'preloadedOrderStatus': preloadedOrderStatus,
            },
            query: {
                'shipToAddressNo': shipToAddressNo,
                'yourReferenceNo': yourReferenceNo,
                'SortField': sortField,
            },
            errors: {
                401: `Unauthorized`,
                404: `Not Found`,
                500: `Server Error`,
            },
        });
    }

}
