/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Address } from './Address';

export type OrderTrackingHeadDetailed = {
    billToAddress?: Address;
    billToReference?: string | null;
    brandSeasonHeader?: string | null;
    brandSeasonName?: string | null;
    clientReference?: string | null;
    currencyCode?: string | null;
    invoiceNo?: string | null;
    nextOrderNo?: string | null;
    orderConfirmationUrl?: string | null;
    orderDate?: string | null;
    orderNo?: string | null;
    ourReference?: string | null;
    partDeliveryRequested?: boolean;
    paymentTerm?: string | null;
    prevOrderNo?: string | null;
    sellToAddress?: Address;
    sellToReference?: string | null;
    shipmentDate?: string | null;
    shipmentDescription?: string | null;
    shipmentHeader?: string | null;
    shipmentInfo?: string | null;
    shipmentNo?: string | null;
    shipToAddress?: Address;
    shipToReference?: string | null;
    showCopyOrder?: boolean;
    trackUrl?: string | null;
    referenceNo?: string | null;
    clientName?: string | null;
};

