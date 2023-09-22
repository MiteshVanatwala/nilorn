/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { OrderRow } from './OrderRow';
import type { OrderValue } from './OrderValue';

export type OrderRows = {
    orderValueInfo?: OrderValue;
    rows?: Array<OrderRow> | null;
};

