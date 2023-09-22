/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Address } from './Address';
import type { UnconfirmedOrderStatus } from './UnconfirmedOrderStatus';

export type OrderHead = {
    billToAddress?: Address;
    billToReference?: string | null;
    brandSeasonNo?: string | null;
    currencyCode?: string | null;
    customerOrderNo?: string | null;
    email?: string | null;
    minDeliveryDate?: string;
    registerDate?: string;
    requestedDeliveryDate?: string;
    sellToAddress?: Address;
    sellToReference?: string | null;
    shipToAddress?: Address;
    partDelivery?: boolean;
    shipToReference?: string | null;
    status?: UnconfirmedOrderStatus;
    webOrderId?: number;
    showPartDelivery?: boolean;
    projectedDeliveryDate?: string;
};

