/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { RuleType } from './RuleType';

export type DetailValidationRule = {
    ruleType?: RuleType;
    ruleValue?: string | null;
    validationErrorMessage?: string | null;
};

