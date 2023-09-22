/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type OrderRow = {
    rowNo?: number;
    productNo?: string | null;
    description?: string | null;
    productType?: string | null;
    productIcon?: string | null;
    productImageUrl?: string | null;
    price?: number;
    orderQty?: number;
    allowEditDetails?: boolean;
    referenceNoIsReadOnly?: boolean;
    referenceNo?: string | null;
    remarks?: string | null;
    allowDelete?: boolean;
    allowEditQty?: boolean;
    maxQty?: number;
    minQty?: number;
    packSize?: number;
    previewPdfUrl?: string | null;
    rowMessages?: Array<string> | null;
};

