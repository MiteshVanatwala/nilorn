/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Logo } from './Logo';

export type UserContext = {
    selectedCompanyClientKey?: string | null;
    selectedClientNo?: string | null;
    selectedCompanyId?: string | null;
    selectedCustomerNo?: string | null;
    displayName?: string | null;
    logo?: Logo;
    supportEmail?: string | null;
    allowedToPlaceOrders?: boolean;
};

