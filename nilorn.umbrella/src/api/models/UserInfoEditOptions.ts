/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Language } from './Language';
import type { Role } from './Role';
import type { UserType } from './UserType';

export type UserInfoEditOptions = {
    userRoles?: Array<Role> | null;
    userTypes?: Array<UserType> | null;
    languages?: Array<Language> | null;
};

