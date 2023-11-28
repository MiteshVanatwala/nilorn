import { useQuery } from 'react-query';
import QueryKeysEnum from './queryKeys';
import {
  ClientService,
  SalesPersonPurchasersService,
  SourcingCompaniesService,
  VendorsService,
} from '../generate';

export function useClients(enable: boolean) {
  return useQuery(
    [QueryKeysEnum.Clients],
    () => ClientService.getApiClient().then(res => res),
    {
      cacheTime: Infinity,
      staleTime: Infinity,
      enabled: enable,
    }
  );
}

export function useVendors(enable: boolean) {
  return useQuery(
    [QueryKeysEnum.Vendors],
    () => VendorsService.getApiVendors().then(res => res),
    {
      cacheTime: Infinity,
      staleTime: Infinity,
      enabled: enable,
    }
  );
}

export function useSourcingCompanies(enable: boolean) {
  return useQuery(
    [QueryKeysEnum.SourcingCompanies],
    () => SourcingCompaniesService.getApiSourcingCompanies().then(res => res),
    {
      cacheTime: Infinity,
      staleTime: Infinity,
      enabled: enable,
    }
  );
}

export function useSalesPersonPurchasers(enable: boolean) {
  return useQuery(
    [QueryKeysEnum.SalesPersonPurchasers],
    () =>
      SalesPersonPurchasersService.getApiSalesPersonPurchasers().then(
        res => res
      ),
    {
      cacheTime: Infinity,
      staleTime: Infinity,
      enabled: enable,
    }
  );
}
