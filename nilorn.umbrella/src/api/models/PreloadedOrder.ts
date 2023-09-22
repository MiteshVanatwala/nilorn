/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PreloadedOrderDetail } from './PreloadedOrderDetail';

export type PreloadedOrder = {
    readonly refOrderNo?: string | null;
    readonly deliverTo?: string | null;
    details?: Array<PreloadedOrderDetail> | null;
    readonly extraSearchField?: string | null;
    readonly kit?: string | null;
    readonly preOrderNo?: number;
    readonly preOrderNosInOrder?: Array<number> | null;
};

