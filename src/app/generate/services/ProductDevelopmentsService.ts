/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateProductDevelopmentCommand } from '../models/CreateProductDevelopmentCommand';
import type { GetProductDevelopmentDto } from '../models/GetProductDevelopmentDto';
import type { ProductDevelopmentBriefDtoPaginatedList } from '../models/ProductDevelopmentBriefDtoPaginatedList';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ProductDevelopmentsService {

    /**
     * @param pageNumber 
     * @param pageSize 
     * @returns ProductDevelopmentBriefDtoPaginatedList Success
     * @throws ApiError
     */
    public static getApiProductDevelopments(
pageNumber?: number,
pageSize?: number,
): CancelablePromise<ProductDevelopmentBriefDtoPaginatedList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/ProductDevelopments',
            query: {
                'PageNumber': pageNumber,
                'PageSize': pageSize,
            },
        });
    }

    /**
     * @param requestBody 
     * @returns string Success
     * @throws ApiError
     */
    public static postApiProductDevelopments(
requestBody?: CreateProductDevelopmentCommand,
): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/ProductDevelopments',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param pageNumber 
     * @param pageSize 
     * @param searchQuery 
     * @param number 
     * @param name 
     * @param description 
     * @param itemNo 
     * @param statusName 
     * @param clientName 
     * @param subClientName 
     * @param itemCategoryCode 
     * @param productGroupName 
     * @param foldingTypeName 
     * @param finishedLength 
     * @param finishedWidth 
     * @param finishedHeight 
     * @param sampleQuantity 
     * @returns ProductDevelopmentBriefDtoPaginatedList Success
     * @throws ApiError
     */
    public static getApiProductDevelopmentsFilter(
pageNumber?: number,
pageSize?: number,
searchQuery?: string,
number?: string,
name?: string,
description?: string,
itemNo?: string,
statusName?: string,
clientName?: string,
subClientName?: string,
itemCategoryCode?: string,
productGroupName?: string,
foldingTypeName?: string,
finishedLength?: number,
finishedWidth?: number,
finishedHeight?: number,
sampleQuantity?: number,
): CancelablePromise<ProductDevelopmentBriefDtoPaginatedList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/ProductDevelopments/Filter',
            query: {
                'PageNumber': pageNumber,
                'PageSize': pageSize,
                'SearchQuery': searchQuery,
                'Number': number,
                'Name': name,
                'Description': description,
                'ItemNo': itemNo,
                'StatusName': statusName,
                'ClientName': clientName,
                'SubClientName': subClientName,
                'ItemCategoryCode': itemCategoryCode,
                'ProductGroupName': productGroupName,
                'FoldingTypeName': foldingTypeName,
                'FinishedLength': finishedLength,
                'FinishedWidth': finishedWidth,
                'FinishedHeight': finishedHeight,
                'SampleQuantity': sampleQuantity,
            },
        });
    }

    /**
     * @returns string Success
     * @throws ApiError
     */
    public static getApiProductDevelopmentsTest(): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/ProductDevelopments/test',
        });
    }

    /**
     * @param id 
     * @returns GetProductDevelopmentDto Success
     * @throws ApiError
     */
    public static getApiProductDevelopments1(
id: string,
): CancelablePromise<GetProductDevelopmentDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/ProductDevelopments/{Id}',
            path: {
                'id': id,
            },
        });
    }

}
