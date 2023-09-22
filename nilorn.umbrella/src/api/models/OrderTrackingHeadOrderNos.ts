/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { OrderTrackingHeadKeys } from './OrderTrackingHeadKeys';

export type OrderTrackingHeadOrderNos = {
    currentPage?: number;
    totalPages?: number;
    totalRecords?: number;
    orderList?: Array<OrderTrackingHeadKeys> | null;
};

