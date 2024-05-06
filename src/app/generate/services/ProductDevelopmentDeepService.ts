/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProductDevelopmentDeepDtoPaginatedList } from '../models/ProductDevelopmentDeepDtoPaginatedList';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ProductDevelopmentDeepService {

    /**
     * @param pageNumber 
     * @param pageSize 
     * @param includeCalculations 
     * @param sortKey 
     * @param searchQuery 
     * @param productDevelopments 
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
     * @param certificates 
     * @param indirectCosts 
     * @param includeClosed 
     * @returns ProductDevelopmentDeepDtoPaginatedList Success
     * @throws ApiError
     */
    public static getApiProductDevelopmentDeep(
pageNumber?: number,
pageSize?: number,
includeCalculations?: boolean,
sortKey?: string,
searchQuery?: string,
productDevelopments?: string,
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
certificates?: string,
indirectCosts?: string,
includeClosed?: boolean,
): CancelablePromise<ProductDevelopmentDeepDtoPaginatedList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/ProductDevelopmentDeep',
            query: {
                'PageNumber': pageNumber,
                'PageSize': pageSize,
                'IncludeCalculations': includeCalculations,
                'SortKey': sortKey,
                'SearchQuery': searchQuery,
                'ProductDevelopments': productDevelopments,
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
                'Certificates': certificates,
                'IndirectCosts': indirectCosts,
                'IncludeClosed': includeClosed,
            },
        });
    }

}
