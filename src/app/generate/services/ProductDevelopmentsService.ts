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
     * @param clientNames 
     * @param projects 
     * @param statuses 
     * @param itemCategory 
     * @param productGroup 
     * @param foldingType 
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
clientNames?: string,
projects?: string,
statuses?: string,
itemCategory?: string,
productGroup?: string,
foldingType?: string,
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
                'ClientNames': clientNames,
                'Projects': projects,
                'Statuses': statuses,
                'ItemCategory': itemCategory,
                'ProductGroup': productGroup,
                'FoldingType': foldingType,
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
