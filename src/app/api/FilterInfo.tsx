import { useQuery } from 'react-query';
import QueryKeysEnum from './queryKeys';
import {
  ClientService,
  FoldingTypeService,
  ItemCategoryService,
  MembersService,
  OpCompService,
  ProductGroupService,
  VendorsService,
} from '../generate';

export function useClients(
  enable: boolean = true,
  filterByAccess: boolean = false
) {
  return useQuery(
    [QueryKeysEnum.Clients, filterByAccess],
    () => ClientService.getApiClient(filterByAccess).then(res => res),
    {
      cacheTime: 60 * 1000 * 5,
      staleTime: 60 * 1000 * 5,
      enabled: enable,
      retry: 0,
    }
  );
}

export function useClient(clientNo: string) {
  return useQuery(
    [QueryKeysEnum.Clients, clientNo],
    () => ClientService.getApiClient1(clientNo).then(res => res),
    {
      retry: 0,
      enabled: !!clientNo,
    }
  );
}

export function useVendors(enable: boolean = true) {
  return useQuery(
    [QueryKeysEnum.Vendors],
    () => VendorsService.getApiVendors().then(res => res),
    {
      cacheTime: 60 * 1000 * 5,
      staleTime: 60 * 1000 * 5,
      enabled: enable,
      retry: 0,
    }
  );
}

export function useOpCompOption(
  enable: boolean = true,
  isSourcingCompany: boolean = false
) {
  return useQuery(
    [QueryKeysEnum.OpComp, QueryKeysEnum.Option, isSourcingCompany],
    () =>
      OpCompService.getApiOpCompFilterOption(isSourcingCompany).then(
        res => res
      ),
    {
      cacheTime: 60 * 1000 * 5,
      staleTime: 60 * 1000 * 5,
      enabled: enable,
      retry: 0,
    }
  );
}

export function useMembers(enable: boolean = true) {
  return useQuery(
    [QueryKeysEnum.Members],
    () => MembersService.getApiMembers().then(res => res),
    {
      cacheTime: 60 * 1000 * 5,
      staleTime: 60 * 1000 * 5,
      enabled: enable,
      retry: 0,
    }
  );
}

export function useFoldingType(enable: boolean = true) {
  return useQuery(
    [QueryKeysEnum.FoldingType],
    () => FoldingTypeService.getApiFoldingType().then(res => res),
    {
      cacheTime: 60 * 1000 * 5,
      staleTime: 60 * 1000 * 5,
      enabled: enable,
      retry: 0,
    }
  );
}

export function useItemCategory(enable: boolean = true) {
  return useQuery(
    [QueryKeysEnum.ItemCategory],
    () => ItemCategoryService.getApiItemCategory().then(res => res),
    {
      cacheTime: 60 * 1000 * 5,
      staleTime: 60 * 1000 * 5,
      enabled: enable,
      retry: 0,
    }
  );
}

export function useProductGroup(
  enable: boolean = true,
  itemCategoryCode?: string
) {
  return useQuery(
    [QueryKeysEnum.ProductGroup, itemCategoryCode],
    () =>
      ProductGroupService.getApiProductGroupFilter(itemCategoryCode).then(
        res => res
      ),
    {
      cacheTime: 60 * 1000 * 5,
      staleTime: 60 * 1000 * 5,
      enabled: enable,
      retry: 0,
    }
  );
}
