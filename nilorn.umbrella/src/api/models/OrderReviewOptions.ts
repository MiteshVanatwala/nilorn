/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PaymentOption } from './PaymentOption';

export type OrderReviewOptions = {
    webOrderId?: number;
    partDelivery?: boolean;
    paymentOptions?: Array<PaymentOption> | null;
    paymentCode?: string | null;
    paymentDescription?: string | null;
};

