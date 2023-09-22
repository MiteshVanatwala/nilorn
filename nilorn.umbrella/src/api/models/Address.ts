/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AddressType } from './AddressType';

export type Address = {
    customerNo: string;
    name?: string | null;
    addressType?: AddressType;
    allowAltAddress?: boolean;
    address1?: string | null;
    address2?: string | null;
    postCode?: string | null;
    city?: string | null;
    countryCode?: string | null;
    countryName?: string | null;
    contact?: string | null;
    email?: string | null;
    phone?: string | null;
    shipToAddressCode?: string | null;
    isAltAddress?: boolean;
    readonly addressUniqueKey?: string | null;
    isBlocked?: boolean;
};

