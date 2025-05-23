import { useQuery } from 'react-query';
import QueryKeysEnum from './queryKeys';
import { SourcingService } from '../generate';

export function useGetSourcingQuantities(id: string, enable: boolean = true) {
  return useQuery(
    [QueryKeysEnum.SourcingQty, id],
    () => SourcingService.getApiSourcingQuantities(id).then(res => res),
    {
      retry: 0,
      enabled: enable,
    }
  );
}
