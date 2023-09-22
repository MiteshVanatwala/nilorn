/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Address } from './Address';

export type AddressCollection = {
    sellToAddresses?: Array<Address> | null;
    shipToAddresses?: Array<Address> | null;
    billToAddresses?: Array<Address> | null;
};

