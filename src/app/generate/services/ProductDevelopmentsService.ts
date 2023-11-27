/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateProductDevelopmentCommand } from '../models/CreateProductDevelopmentCommand';
import type { GetProductDevelopmentDto } from '../models/GetProductDevelopmentDto';
import type { ProductDevelopmentBriefDtoPaginatedList } from '../models/ProductDevelopmentBriefDtoPaginatedList';
import type { Status } from '../models/Status';

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
    pageSize?: number
  ): CancelablePromise<ProductDevelopmentBriefDtoPaginatedList> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/ProductDevelopments',
      query: {
        PageNumber: pageNumber,
        PageSize: pageSize,
      },
    });
  }

  /**
   * @param requestBody
   * @returns string Success
   * @throws ApiError
   */
  public static postApiProductDevelopments(
    requestBody?: CreateProductDevelopmentCommand
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
    finishedHeights?: string
  ): CancelablePromise<ProductDevelopmentBriefDtoPaginatedList> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/ProductDevelopments/Filter',
      query: {
        PageNumber: pageNumber,
        PageSize: pageSize,
        SortKey: sortKey,
        SearchQuery: searchQuery,
        Clients: clients,
        Projects: projects,
        Statuses: statuses,
        ItemCategories: itemCategories,
        ProductGroups: productGroups,
        FoldingTypes: foldingTypes,
        FinishedLengths: finishedLengths,
        FinishedWidths: finishedWidths,
        FinishedHeights: finishedHeights,
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
    id: string
  ): CancelablePromise<GetProductDevelopmentDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/ProductDevelopments/{Id}',
      path: {
        id: id,
      },
    });
  }

  /**
   * @param id
   * @param status
   * @returns GetProductDevelopmentDto Success
   * @throws ApiError
   */
  public static patchApiProductDevelopments(
    id: string,
    status?: Status
  ): CancelablePromise<GetProductDevelopmentDto> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/ProductDevelopments/{id}',
      path: {
        id: id,
      },
      query: {
        status: status,
      },
    });
  }
}
