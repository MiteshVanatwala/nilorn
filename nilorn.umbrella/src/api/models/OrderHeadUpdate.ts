/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { OrderStatus } from './OrderStatus';

export type OrderHeadUpdate = {
    billToCustomerNo?: string | null;
    billToReference?: string | null;
    brandSeasonNo?: string | null;
    currencyCode?: string | null;
    customerOrderNo?: string | null;
    email?: string | null;
    requestedDeliveryDate?: string | null;
    sellToCustomerNo?: string | null;
    sellToReference?: string | null;
    shipToAddressCode?: string | null;
    shipToReference?: string | null;
    partDelivery?: boolean | null;
    status?: OrderStatus;
};

