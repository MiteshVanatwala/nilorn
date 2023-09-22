/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { InputControlType } from './InputControlType';
import type { PredefinedValue } from './PredefinedValue';
import type { ValidationRule } from './ValidationRule';

export type InputField = {
    name?: string | null;
    title?: string | null;
    sort?: number;
    groupName?: string | null;
    inputControlType?: InputControlType;
    isRequired?: boolean;
    predefinedValues?: Array<PredefinedValue> | null;
    validationRules?: Array<ValidationRule> | null;
    defaultValue?: string | null;
    minValue?: string | null;
    maxValue?: string | null;
};

