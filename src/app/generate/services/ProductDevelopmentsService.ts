/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateProductDevelopmentCommand } from '../models/CreateProductDevelopmentCommand';
import type { ProductDevelopmentBriefDtoPaginatedList } from '../models/ProductDevelopmentBriefDtoPaginatedList';
import type { ProductDevelopmentDto } from '../models/ProductDevelopmentDto';
import type { Status } from '../models/Status';
import type { UpdateProductDevelopmentDto } from '../models/UpdateProductDevelopmentDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ProductDevelopmentsService {

    /**
     * @param pageNumber 
     * @param pageSize 
     * @param sortKey 
     * @param searchQuery 
     * @param clients 
     * @param projects 
     * @param statuses 
     * @param itemCategories 
     * @param productGroups 
     * @param foldingTypes 
     * @param finishedLengths 
     * @param finishedWidths 
     * @param finishedHeights 
     * @param sourcingCompanies 
     * @param vendors 
     * @param opComps 
     * @param members 
     * @param includeClosed 
     * @returns ProductDevelopmentBriefDtoPaginatedList Success
     * @throws ApiError
     */
    public static getApiProductDevelopmentsFilter(
pageNumber?: number,
pageSize?: number,
sortKey?: string,
searchQuery?: string,
clients?: string,
projects?: string,
statuses?: string,
itemCategories?: string,
productGroups?: string,
foldingTypes?: string,
finishedLengths?: string,
finishedWidths?: string,
finishedHeights?: string,
sourcingCompanies?: string,
vendors?: string,
opComps?: string,
members?: string,
includeClosed?: boolean,
): CancelablePromise<ProductDevelopmentBriefDtoPaginatedList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/ProductDevelopments/Filter',
            query: {
                'PageNumber': pageNumber,
                'PageSize': pageSize,
                'SortKey': sortKey,
                'SearchQuery': searchQuery,
                'Clients': clients,
                'Projects': projects,
                'Statuses': statuses,
                'ItemCategories': itemCategories,
                'ProductGroups': productGroups,
                'FoldingTypes': foldingTypes,
                'FinishedLengths': finishedLengths,
                'FinishedWidths': finishedWidths,
                'FinishedHeights': finishedHeights,
                'SourcingCompanies': sourcingCompanies,
                'Vendors': vendors,
                'OpComps': opComps,
                'Members': members,
                'IncludeClosed': includeClosed,
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
     * @param no 
     * @returns ProductDevelopmentDto Success
     * @throws ApiError
     */
    public static getApiProductDevelopments(
no: string,
): CancelablePromise<ProductDevelopmentDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/ProductDevelopments/{no}',
            path: {
                'no': no,
            },
        });
    }

    /**
     * @param no 
     * @param requestBody 
     * @returns ProductDevelopmentDto Success
     * @throws ApiError
     */
    public static patchApiProductDevelopments(
no: string,
requestBody?: UpdateProductDevelopmentDto,
): CancelablePromise<ProductDevelopmentDto> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/ProductDevelopments/{no}',
            path: {
                'no': no,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param no 
     * @param status 
     * @returns ProductDevelopmentDto Success
     * @throws ApiError
     */
    public static patchApiProductDevelopments1(
no: string,
status: Status,
): CancelablePromise<ProductDevelopmentDto> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/ProductDevelopments/{no}/{status}',
            path: {
                'no': no,
                'status': status,
            },
        });
    }

}
