/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DetailInputField } from './DetailInputField';

export type ProductDetailsInput = {
    productNo?: string | null;
    productDescription?: string | null;
    productComment?: string | null;
    showRepeatOrder?: boolean;
    inputFields?: Array<DetailInputField> | null;
};

