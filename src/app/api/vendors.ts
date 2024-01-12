import { useQuery } from 'react-query';
import QueryKeysEnum from './queryKeys';
import { VendorsService } from '../generate';

export function useGetVendors(enable: boolean = true) {
  return useQuery(
    [QueryKeysEnum.Vendors],
    () => VendorsService.getApiVendors().then(res => res),
    {
      retry: 0,
      enabled: enable,
    }
  );
}
