import { useQuery } from 'react-query';
import QueryKeysEnum from './queryKeys';
import {
  ClientService,
  FoldingTypeService,
  ItemCategoryService,
  ProductGroupService,
  SalesPersonPurchasersService,
  SourcingCompaniesService,
  VendorsService,
} from '../generate';

export function useClients(enable: boolean = true) {
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

export function useVendors(enable: boolean = true) {
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

export function useSourcingCompanies(enable: boolean = true) {
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

export function useSalesPersonPurchasers(enable: boolean = true) {
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

export function useFoldingType(enable: boolean = true) {
  return useQuery(
    [QueryKeysEnum.FoldingTyp],
    () => FoldingTypeService.getApiFoldingType().then(res => res),
    {
      cacheTime: Infinity,
      staleTime: Infinity,
      enabled: enable,
    }
  );
}

export function useItemCategory(enable: boolean = true) {
  return useQuery(
    [QueryKeysEnum.ItemCategory],
    () => ItemCategoryService.getApiItemCategory().then(res => res),
    {
      cacheTime: Infinity,
      staleTime: Infinity,
      enabled: enable,
    }
  );
}

export function useProductGroup(
  itemCategoryCode: string,
  enable: boolean = true
) {
  console.log('use', itemCategoryCode);
  return useQuery(
    [QueryKeysEnum.ProductGroup, itemCategoryCode],
    () =>
      ProductGroupService.getApiProductGroup(itemCategoryCode).then(res => res),
    {
      cacheTime: Infinity,
      staleTime: Infinity,
      enabled: enable,
    }
  );
}
