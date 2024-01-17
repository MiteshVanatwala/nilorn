import { useQuery } from 'react-query';
import { useFilterSearchParams } from '../../components/Filter/FilterHelper';
import QueryKeysEnum from './queryKeys';
import { ProductDevelopmentDeepService, ProductionsService } from '../generate';

export function useProductionsFilter(includeCalculations: boolean) {
  const pageNumber = Number(useFilterSearchParams('pageNumber')) ?? 0;
  const pageSize = Number(useFilterSearchParams('pageSize')) ?? 0;
  const searchQuery = useFilterSearchParams('searchQuery', 400);
  const vendors = useFilterSearchParams('vendor');
  const clients = useFilterSearchParams('clients');
  const projects = useFilterSearchParams('projects');
  const number = useFilterSearchParams('number');
  const sourcingCompanies = useFilterSearchParams('sourcingCompanies');
  const itemCategories = useFilterSearchParams('itemCategories');
  const productDevelopments = useFilterSearchParams('itemCategories');
  const productGroups = useFilterSearchParams('productGroups');
  const statuses = useFilterSearchParams('statuses');

  return useQuery(
    [
      QueryKeysEnum.Productions,
      pageNumber,
      pageSize,
      includeCalculations,
      searchQuery,
      vendors,
      clients,
      projects,
      number,
      sourcingCompanies,
      itemCategories,
      productGroups,
      statuses,
    ],

    () =>
      ProductDevelopmentDeepService.getApiProductDevelopmentDeep(
        pageNumber,
        pageSize,
        includeCalculations,
        productDevelopments,
        vendors,
        sourcingCompanies,
        clients
      ).then(res => res),
    {
      retry: 0,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      cacheTime: 1000 * 20,
      staleTime: 1000 * 20,
      enabled: pageNumber > 0 && pageSize > 0,
    }
  );
}

export function useProductions(
  no: string,
  sourcingCompanyCode: string,
  released?: boolean | undefined
) {
  return useQuery(
    [QueryKeysEnum.Productions, no, sourcingCompanyCode, released],
    () =>
      ProductionsService.getApiProductions(no, sourcingCompanyCode, released),
    {
      retry: 0,
    }
  );
}
