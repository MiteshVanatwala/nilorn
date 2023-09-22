/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { OrderDetailField } from './OrderDetailField';

export type OrderDetail = {
    detailNo?: number;
    quantity?: number;
    fields?: Array<OrderDetailField> | null;
};

