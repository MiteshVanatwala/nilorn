import { useQuery } from 'react-query';
import { useFormStateFiltersDebounced } from '../utils/FilterHelper';
import QueryKeysEnum from './queryKeys';
import { useMemo } from 'react';
import {
  GetFilteredProductDevelopmentDeepWithPaginationQuery,
  ProductDevelopmentDeepService,
} from '../generate';

export function useProductDevelopmentDeepFilter(
  includeCalculations: boolean,
  pageSize: number = 25,
  keepPreviousData: boolean = true
) {
  const requestBody: GetFilteredProductDevelopmentDeepWithPaginationQuery =
    useFormStateFiltersDebounced(100);

  requestBody.pageSize =
    requestBody.pageSize !== undefined ? requestBody.pageSize : pageSize;

  
  // create new requestBody to avoid unwanted properties properties like activeSearchProfile
  const filteredRequestBody: GetFilteredProductDevelopmentDeepWithPaginationQuery = 
  {
    sortKey: requestBody.sortKey,
    searchQuery: requestBody.searchQuery,
    productDevelopments: requestBody.productDevelopments,
    clients: requestBody.clients?.filter(c => c !== "") || [],
    projects: requestBody.projects,
    statuses: requestBody.statuses, 
    itemCategories: requestBody.itemCategories,
    productGroups: requestBody.productGroups,
    foldingTypes: requestBody.foldingTypes,
    finishedLengths: requestBody.finishedLengths,
    finishedWidths: requestBody.finishedWidths,
    finishedHeights: requestBody.finishedHeights,
    sourcingCompanies: requestBody.sourcingCompanies,
    vendors: requestBody.vendors,
    opComps: requestBody.opComps,
    members: requestBody.members,
    certificates: requestBody.certificates,
    indirectCosts: requestBody.indirectCosts,
    includeClosed: requestBody.includeClosed,
    pageNumber: requestBody.pageNumber,
    pageSize: requestBody.pageSize
  }

  const queryKey = useMemo(() => [
    QueryKeysEnum.ProductDevelopmentDeep,
    includeCalculations,
    JSON.stringify(filteredRequestBody),
  ], [includeCalculations, filteredRequestBody]);

  return useQuery(
    queryKey,
    () =>
      ProductDevelopmentDeepService.postApiProductDevelopmentDeep({
        ...filteredRequestBody,
        includeCalculations: includeCalculations,
      }).then(res => res),
    {
      retry: 0,
      keepPreviousData: keepPreviousData,
      refetchOnWindowFocus: false,
      cacheTime: 1000 * 20,
      staleTime: 1000 * 20,
      enabled: Object.keys(requestBody || {}).length > 0, // Only run when we have actual data
    }
  );
}
