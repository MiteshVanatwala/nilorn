/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { OrderTrackingHeadSimple } from './OrderTrackingHeadSimple';
import type { OrderTrackingStatusFilter } from './OrderTrackingStatusFilter';

export type OrderTrackingHeads = {
    currentPage?: number;
    totalPages?: number;
    totalRecords?: number;
    orderHeads?: Array<OrderTrackingHeadSimple> | null;
    readonly orderTrackingStatuses?: Array<OrderTrackingStatusFilter> | null;
};

