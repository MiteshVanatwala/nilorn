/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PreloadedOrder } from './PreloadedOrder';
import type { PreOrderViewStatus } from './PreOrderViewStatus';

export type PreloadedOrders = {
    statuses?: Array<PreOrderViewStatus> | null;
    preloadedOrderHeads?: Array<PreloadedOrder> | null;
    currentPage?: number;
    defaultChunkSize?: number;
    totalPages?: number;
    totalRecords?: number | null;
};

