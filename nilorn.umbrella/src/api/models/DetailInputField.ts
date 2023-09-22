/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CrossFieldValidationRule } from './CrossFieldValidationRule';
import type { DetailPredefinedValue } from './DetailPredefinedValue';
import type { DetailValidationRule } from './DetailValidationRule';
import type { InputControlType } from './InputControlType';

export type DetailInputField = {
    fieldId?: number | null;
    fieldName?: string | null;
    fieldTitle?: string | null;
    groupName?: string | null;
    sortOrder?: number;
    inputControlType?: InputControlType;
    predefinedValues?: Array<DetailPredefinedValue> | null;
    validationRules?: Array<DetailValidationRule> | null;
    crossFieldValidationRules?: Array<CrossFieldValidationRule> | null;
};

