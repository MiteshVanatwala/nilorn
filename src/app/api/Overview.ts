import { useQuery } from 'react-query';
import QueryKeysEnum from './queryKeys';
import {
  GetForFilterProductDevelopmentsWithPaginationQuery,
  ProductDevelopmentsService,
} from '../../app/generate';
import { useFilterFormFormWatch } from '../utils/FilterHelper';

export function useProductDevelopmentsFilter() {
  const requestBody: GetForFilterProductDevelopmentsWithPaginationQuery =
    useFilterFormFormWatch();

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
