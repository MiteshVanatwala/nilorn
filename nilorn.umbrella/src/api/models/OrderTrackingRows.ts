/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { OrderTrackingRow } from './OrderTrackingRow';

export type OrderTrackingRows = {
    currencyCode?: string | null;
    rows?: Array<OrderTrackingRow> | null;
};

