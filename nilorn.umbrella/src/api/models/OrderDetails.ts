/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { OrderDetail } from './OrderDetail';
import type { OrderDetailFieldInfo } from './OrderDetailFieldInfo';

export type OrderDetails = {
    minimumQty?: number;
    packSize?: number;
    infoMessages?: Array<string> | null;
    productNo?: string | null;
    productDescription?: string | null;
    productType?: string | null;
    orderQuantity?: number;
    reference?: string | null;
    remarks?: string | null;
    disableEditQty?: boolean;
    fieldInfos?: Array<OrderDetailFieldInfo> | null;
    details?: Array<OrderDetail> | null;
};

