/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DeliverToAddress } from './DeliverToAddress';
import type { ListFilterCriteria } from './ListFilterCriteria';
import type { PreOrderViewStatus } from './PreOrderViewStatus';
import type { Status } from './Status';

export type PreloadedOrderFilterData = {
    currentStatus?: PreOrderViewStatus;
    deliverToAddresses?: Array<DeliverToAddress> | null;
    extraSearchField?: string | null;
    filterFields?: Array<ListFilterCriteria> | null;
    hideDeliverToAndStatus?: boolean;
    maxItemPerPage?: number;
    showAllOrders?: boolean;
    showClientOrderNoFilter?: boolean;
    showExfactoryDate?: boolean;
    showExtraSearchField?: boolean;
    showPreloadedDetailsReportDownload?: boolean;
    statuses?: Array<Status> | null;
};

