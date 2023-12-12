import { useQuery } from 'react-query';
import { useFilterSearchParams } from '../../components/Filter/FilterHelper';
import QueryKeysEnum from './queryKeys';

export function useProductionsFilter() {
  const pageNumber = Number(useFilterSearchParams('pageNumber')) ?? 0;
  const pageSize = Number(useFilterSearchParams('pageSize')) ?? 0;
  const searchQuery = useFilterSearchParams('searchQuery', 400);
  const vendor = useFilterSearchParams('vendor');
  const clients = useFilterSearchParams('clients');
  const projects = useFilterSearchParams('projects');
  const number = useFilterSearchParams('number');
  const sourcingCompanies = useFilterSearchParams('sourcingCompanies');
  const itemCategories = useFilterSearchParams('itemCategories');
  const productGroups = useFilterSearchParams('productGroups');
  const statuses = useFilterSearchParams('statuses');

  return useQuery(
    [
      QueryKeysEnum.Productions,
      pageNumber,
      pageSize,
      searchQuery,
      vendor,
      clients,
      projects,
      number,
      sourcingCompanies,
      itemCategories,
      productGroups,
      statuses,
    ],
    () => {
      return {
        data: { pageNumber: 1, totalPages: 100, totalCount: 1000 },
        isError: false,
        isLoading: false,
        isFetching: false,
      };
    },
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
