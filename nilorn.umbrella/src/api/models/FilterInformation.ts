/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ExtraSearchField } from './ExtraSearchField';
import type { OrderingCustomer } from './OrderingCustomer';
import type { ShipToAddress } from './ShipToAddress';

export type FilterInformation = {
    shipToAddresses?: Array<ShipToAddress> | null;
    orderingCustomers?: Array<OrderingCustomer> | null;
    extraSearchField?: ExtraSearchField;
};

