import { useQuery } from 'react-query';
import QueryKeysEnum from './queryKeys';
import { ProductDevelopmentsService } from '../../app/generate';

export function useProductDevelopments(pageNumber?: number, pageSize?: number) {
  return useQuery(
    [QueryKeysEnum.Overview, pageNumber, pageSize],
    () =>
      ProductDevelopmentsService.getApiProductDevelopments(
        pageNumber,
        pageSize
      ).then(res => res),
    {
      retry: 1,
    }
  );
}

export function useProductDevelopmentsTest() {
  return useQuery(
    [],
    () =>
      ProductDevelopmentsService.getApiProductDevelopmentsTest().then(
        res => res
      ),
    {
      retry: 1,
    }
  );
}
