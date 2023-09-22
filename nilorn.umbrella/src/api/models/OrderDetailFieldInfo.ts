/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { OrderDetailDisplayType } from './OrderDetailDisplayType';

export type OrderDetailFieldInfo = {
    fieldName?: string | null;
    description?: string | null;
    showAlways?: boolean;
    displayType?: OrderDetailDisplayType;
    allowEdit?: boolean;
};

