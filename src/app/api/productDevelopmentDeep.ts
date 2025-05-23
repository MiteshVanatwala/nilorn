import { useQuery } from 'react-query';
import { useFormStateFilters } from '../utils/FilterHelper';
import QueryKeysEnum from './queryKeys';
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
    useFormStateFilters();

  requestBody.pageSize =
    requestBody.pageSize !== undefined ? requestBody.pageSize : pageSize;

  return useQuery(
    [
      QueryKeysEnum.ProductDevelopmentDeep,
      includeCalculations,
      JSON.stringify(requestBody),
    ],
    () =>
      ProductDevelopmentDeepService.postApiProductDevelopmentDeep({
        ...requestBody,
        includeCalculations: includeCalculations,
      }).then(res => res),
    {
      retry: 0,
      keepPreviousData: keepPreviousData,
      refetchOnWindowFocus: false,
      cacheTime: 1000 * 20,
      staleTime: 1000 * 20,
    }
  );
}
