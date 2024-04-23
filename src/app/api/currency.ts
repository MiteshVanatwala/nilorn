import { useQuery } from 'react-query';
import QueryKeysEnum from './queryKeys';
import { CurrencyService } from '../generate';

export function useGetCurrenciesFilterOption() {
  return useQuery(
    [QueryKeysEnum.Currency],
    () => CurrencyService.getApiCurrencyFilterOption().then(res => res),
    {
      retry: 1,
    }
  );
}

export function useGetCurrency(currencyCode?: string) {
  return useQuery(
    [QueryKeysEnum.Currency, currencyCode],
    () => CurrencyService.getApiCurrency(currencyCode).then(res => res),
    {
      retry: 1,
      keepPreviousData: true,
      enabled: !!currencyCode,
    }
  );
}
