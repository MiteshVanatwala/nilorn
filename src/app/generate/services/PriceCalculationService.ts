/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreatePriceCalculationCommand } from '../models/CreatePriceCalculationCommand';
import type { DefaultPriceCalculationDto } from '../models/DefaultPriceCalculationDto';
import type { NavigationItem } from '../models/NavigationItem';
import type { PriceCalculationDto } from '../models/PriceCalculationDto';
import type { PriceCalculationExtendedDto } from '../models/PriceCalculationExtendedDto';
import type { PriceDto } from '../models/PriceDto';
import type { UpdatePriceCalculationCommand } from '../models/UpdatePriceCalculationCommand';
import type { UpdateSalesPriceCommand } from '../models/UpdateSalesPriceCommand';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PriceCalculationService {

    /**
     * @param requestBody 
     * @returns PriceCalculationDto Success
     * @throws ApiError
     */
    public static postApiPriceCalculation(
requestBody?: CreatePriceCalculationCommand,
): CancelablePromise<PriceCalculationDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/PriceCalculation',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody 
     * @returns PriceCalculationDto Success
     * @throws ApiError
     */
    public static patchApiPriceCalculation(
requestBody?: UpdatePriceCalculationCommand,
): CancelablePromise<PriceCalculationDto> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/PriceCalculation',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param id 
     * @returns PriceCalculationExtendedDto Success
     * @throws ApiError
     */
    public static getApiPriceCalculation(
id?: string,
): CancelablePromise<PriceCalculationExtendedDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/PriceCalculation',
            query: {
                'Id': id,
            },
        });
    }

    /**
     * @param id 
     * @returns any Success
     * @throws ApiError
     */
    public static deleteApiPriceCalculation(
id: string,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/PriceCalculation/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param requestBody 
     * @returns PriceDto Success
     * @throws ApiError
     */
    public static patchApiPriceCalculationSalesPrice(
requestBody?: UpdateSalesPriceCommand,
): CancelablePromise<Array<PriceDto>> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/PriceCalculation/SalesPrice',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param productDevelopmentNo 
     * @param sourcingCompanycode 
     * @returns DefaultPriceCalculationDto Success
     * @throws ApiError
     */
    public static getApiPriceCalculationDefaultValues(
productDevelopmentNo?: string,
sourcingCompanycode?: string,
): CancelablePromise<DefaultPriceCalculationDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/PriceCalculation/DefaultValues',
            query: {
                'ProductDevelopmentNo': productDevelopmentNo,
                'SourcingCompanycode': sourcingCompanycode,
            },
        });
    }

    /**
     * @param id 
     * @param includeCalculations 
     * @param productDevelopments 
     * @param vendors 
     * @param sourcingCompanies 
     * @param clients 
     * @param projects 
     * @returns NavigationItem Success
     * @throws ApiError
     */
    public static getApiPriceCalculationNavigation(
id: string,
includeCalculations?: boolean,
productDevelopments?: string,
vendors?: string,
sourcingCompanies?: string,
clients?: string,
projects?: string,
): CancelablePromise<NavigationItem> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/PriceCalculation/Navigation',
            query: {
                'Id': id,
                'IncludeCalculations': includeCalculations,
                'ProductDevelopments': productDevelopments,
                'Vendors': vendors,
                'SourcingCompanies': sourcingCompanies,
                'Clients': clients,
                'Projects': projects,
            },
        });
    }

}
