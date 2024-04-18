/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateProductionCommand } from '../models/CreateProductionCommand';
import type { DeleteProductionCommand } from '../models/DeleteProductionCommand';
import type { NavigationItem } from '../models/NavigationItem';
import type { ProductionDto } from '../models/ProductionDto';
import type { ProductionExtendedDto } from '../models/ProductionExtendedDto';
import type { UpdateProductionCommand } from '../models/UpdateProductionCommand';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ProductionsService {

    /**
     * @param requestBody 
     * @returns ProductionDto Success
     * @throws ApiError
     */
    public static postApiProductions(
requestBody?: CreateProductionCommand,
): CancelablePromise<ProductionDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Productions',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody 
     * @returns any Success
     * @throws ApiError
     */
    public static deleteApiProductions(
requestBody?: DeleteProductionCommand,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/Productions',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param id 
     * @returns ProductionExtendedDto Success
     * @throws ApiError
     */
    public static getApiProductions(
id?: string,
): CancelablePromise<ProductionExtendedDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Productions',
            query: {
                'id': id,
            },
        });
    }

    /**
     * @param requestBody 
     * @returns ProductionDto Success
     * @throws ApiError
     */
    public static patchApiProductions(
requestBody?: UpdateProductionCommand,
): CancelablePromise<ProductionDto> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/Productions',
            body: requestBody,
            mediaType: 'application/json',
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
    public static getApiProductionsNavigation(
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
            url: '/api/Productions/Navigation',
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

    /**
     * @param no 
     * @param sourcingCompanyCode 
     * @param released 
     * @returns ProductionDto Success
     * @throws ApiError
     */
    public static getApiProductions1(
no: string,
sourcingCompanyCode: string,
released?: boolean,
): CancelablePromise<Array<ProductionDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Productions/{no}/{sourcingCompanyCode}',
            path: {
                'no': no,
                'sourcingCompanyCode': sourcingCompanyCode,
            },
            query: {
                'released': released,
            },
        });
    }

    /**
     * @param id 
     * @param released 
     * @returns ProductionDto Success
     * @throws ApiError
     */
    public static patchApiProductionsReleaseProduction(
id: string,
released: boolean,
): CancelablePromise<ProductionDto> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/Productions/releaseProduction/{id}/{released}',
            path: {
                'id': id,
                'released': released,
            },
        });
    }

}
