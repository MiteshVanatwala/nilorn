/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DetailValidationRule } from './DetailValidationRule';

export type CrossFieldValidationRule = {
    ownerFieldRule?: DetailValidationRule;
    targetFieldId?: number;
    targetFieldRule?: DetailValidationRule;
};

