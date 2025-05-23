/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateProductDevelopmentCommand } from '../models/CreateProductDevelopmentCommand';
import type { GetForFilterProductDevelopmentsWithPaginationQuery } from '../models/GetForFilterProductDevelopmentsWithPaginationQuery';
import type { GetNavigationForProductDevelopmentQuery } from '../models/GetNavigationForProductDevelopmentQuery';
import type { NavigationItem } from '../models/NavigationItem';
import type { ProductDevelopmentBriefDtoPaginatedList } from '../models/ProductDevelopmentBriefDtoPaginatedList';
import type { ProductDevelopmentDto } from '../models/ProductDevelopmentDto';
import type { Status } from '../models/Status';
import type { UpdateProductDevelopmentDto } from '../models/UpdateProductDevelopmentDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ProductDevelopmentsService {

    /**
     * @param requestBody 
     * @returns ProductDevelopmentBriefDtoPaginatedList Success
     * @throws ApiError
     */
    public static postApiProductDevelopmentsFilter(
requestBody?: GetForFilterProductDevelopmentsWithPaginationQuery,
): CancelablePromise<ProductDevelopmentBriefDtoPaginatedList> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/ProductDevelopments/Filter',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody 
     * @returns NavigationItem Success
     * @throws ApiError
     */
    public static postApiProductDevelopmentsNavigation(
requestBody?: GetNavigationForProductDevelopmentQuery,
): CancelablePromise<NavigationItem> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/ProductDevelopments/Navigation',
            body: requestBody,
            mediaType: 'application/json',
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

    /**
     * @param no 
     * @returns string Success
     * @throws ApiError
     */
    public static postApiProductDevelopmentsCopy(
no: string,
): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/ProductDevelopments/Copy/{no}',
            path: {
                'no': no,
            },
        });
    }

    /**
     * @deprecated
     * @param no 
     * @param name 
     * @returns string Success
     * @throws ApiError
     */
    public static postApiProductDevelopmentsVersion(
no: string,
name: string,
): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/ProductDevelopments/Version/{no}/{name}',
            path: {
                'no': no,
                'name': name,
            },
        });
    }

    /**
     * @param no 
     * @returns string Success
     * @throws ApiError
     */
    public static postApiProductDevelopmentsVersion1(
no: string,
): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/ProductDevelopments/Version/{no}',
            path: {
                'no': no,
            },
        });
    }

}
