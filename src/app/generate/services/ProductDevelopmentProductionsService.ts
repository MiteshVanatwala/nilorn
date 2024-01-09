/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProductDevelopmentProductionDtoPaginatedList } from '../models/ProductDevelopmentProductionDtoPaginatedList';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ProductDevelopmentProductionsService {
  /**
   * @param pageNumber
   * @param pageSize
   * @param productDevelopments
   * @param vendors
   * @param sourcingCompanies
   * @param clients
   * @returns ProductDevelopmentProductionDtoPaginatedList Success
   * @throws ApiError
   */
  public static getApiProductDevelopmentProductions(
    pageNumber?: number,
    pageSize?: number,
    productDevelopments?: string,
    vendors?: string,
    sourcingCompanies?: string,
    clients?: string
  ): CancelablePromise<ProductDevelopmentProductionDtoPaginatedList> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/ProductDevelopmentProductions',
      query: {
        PageNumber: pageNumber,
        PageSize: pageSize,
        ProductDevelopments: productDevelopments,
        Vendors: vendors,
        SourcingCompanies: sourcingCompanies,
        Clients: clients,
      },
    });
  }
}
