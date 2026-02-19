import { useQuery } from 'react-query';
import QueryKeysEnum from './queryKeys';
import { useMemo } from 'react';
import {
  GetForFilterProductDevelopmentsWithPaginationQuery,
  ProductDevelopmentsService,
} from '../../app/generate';
import { useFormStateFiltersDebounced } from '../utils/FilterHelper';

export function useProductDevelopmentsFilter(pageSize: number = 25) {
  const requestBody: GetForFilterProductDevelopmentsWithPaginationQuery =
    useFormStateFiltersDebounced(100); // Short debounce to prevent rapid calls

  requestBody.pageSize =
    requestBody.pageSize !== undefined ? requestBody.pageSize : pageSize;
    
  const queryKey = useMemo(() => [
    QueryKeysEnum.Overview, 
    JSON.stringify(requestBody)
  ], [requestBody]);

  return useQuery(
    queryKey,
    () =>
      ProductDevelopmentsService.postApiProductDevelopmentsFilter(
        requestBody
      ).then(res => res),
    {
      retry: 0,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      cacheTime: 1000 * 5 * 60,
      staleTime: 1000 * 5 * 60,
      enabled: Object.keys(requestBody || {}).length > 0, // Only run when we have actual data
    }
  );
}
