/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Language } from './Language';
import type { UserClientCustomerAccess } from './UserClientCustomerAccess';
import type { UserInfoEditOptions } from './UserInfoEditOptions';

export type UserInformation = {
    loginId?: number;
    userName?: string | null;
    email?: string | null;
    userType?: string | null;
    customerNo?: string | null;
    disabled?: boolean;
    allowImpersonate?: boolean;
    userExpireDate?: string | null;
    passwordExpireDate?: string | null;
    defaultLanguage?: Language;
    onlyAllowedToTrackOrders?: boolean;
    allowCustomerLocalProduction?: boolean;
    allowPreloadCancellation?: boolean;
    allowChangeInvoiceAddress?: boolean;
    allowOrderApproval?: boolean;
    allowCreditCardPayments?: boolean;
    onlyLocalCompanyClients?: boolean | null;
    lastLoginDate?: string | null;
    numberOfLogins?: number;
    clientAccess?: Array<UserClientCustomerAccess> | null;
    editOptions?: UserInfoEditOptions;
};

