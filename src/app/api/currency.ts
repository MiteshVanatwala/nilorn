import { useQuery } from 'react-query';
import QueryKeysEnum from './queryKeys';
import { CurrencyService } from '../generate';

export function useGetCurrencies() {
  return useQuery(
    [QueryKeysEnum.Currency],
    () => CurrencyService.getApiCurrency().then(res => res),
    {
      retry: 0,
    }
  );
}
