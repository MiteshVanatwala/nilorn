import { useQuery } from 'react-query';
import { useFilterSearchParams } from '../../components/Filter/FilterHelper';
import QueryKeysEnum from './queryKeys';
import { ProductDevelopmentProductionsService } from '../generate';

export function useProductionsFilter() {
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
      ProductDevelopmentProductionsService.getApiProductDevelopmentProductions(
        pageNumber,
        pageSize,
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
