import { useQuery } from 'react-query';
import QueryKeysEnum from './queryKeys';
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

  return useQuery(
    [QueryKeysEnum.Overview, JSON.stringify(requestBody)],
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
    }
  );
}
