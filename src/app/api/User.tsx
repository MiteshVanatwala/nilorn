import { useQuery } from 'react-query';
import QueryKeysEnum from './queryKeys';
import { SalesPersonPurchasersService } from '../generate';

export const useCurrentUser = () => {
  return useQuery(
    [QueryKeysEnum.User],
    () =>
      SalesPersonPurchasersService.getApiSalesPersonPurchasersCurrent().then(
        res => res
      ),
    {
      cacheTime: Infinity,
      staleTime: Infinity,
      retry: 0,
    }
  );
};
