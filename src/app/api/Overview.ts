import { useQuery } from 'react-query';
import QueryKeysEnum from './queryKeys';
import { ProductDevelopmentsService } from '../../app/generate';
import { useFilterSearchParams } from '../../components/Filter/FilterHelper';

export function useProductDevelopments(pageNumber: number, pageSize?: number) {
  return useQuery(
    [QueryKeysEnum.Overview, pageNumber, pageSize],
    () =>
      ProductDevelopmentsService.getApiProductDevelopments(
        pageNumber,
        pageSize
      ).then(res => res),
    {
      retry: 1,
      enabled: pageNumber > 0,
    }
  );
}

export function useProductDevelopmentsFilter(
  pageNumber?: number,
  pageSize?: number
) {
  const sortKey = useFilterSearchParams('sortKey');
  const searchQuery = useFilterSearchParams('searchQuery');
  const clients = useFilterSearchParams('clients');
  const projects = useFilterSearchParams('projects');
  const statuses = useFilterSearchParams('statuses');
  const itemCategories = useFilterSearchParams('itemCategories');
  const productGroups = useFilterSearchParams('productGroups');
  const foldingTypes = useFilterSearchParams('foldingTypes');
  const finishedLengths = useFilterSearchParams('finishedLengths');
  const finishedWidths = useFilterSearchParams('finishedWidths');
  const finishedHeights = useFilterSearchParams('finishedHeights');

  return useQuery(
    [
      QueryKeysEnum.Overview,
      pageNumber,
      pageSize,
      sortKey,
      searchQuery,
      clients, // TODO, search on no?
      projects,
      statuses, // TODO, always return 500, whats expected?
      itemCategories, // TODO: No data yet.
      productGroups, // TODO: No data yet.
      foldingTypes, // TODO: No data yet.
      finishedLengths,
      finishedWidths,
      finishedHeights,
    ],
    () =>
      ProductDevelopmentsService.getApiProductDevelopmentsFilter(
        pageNumber,
        pageSize,
        sortKey,
        searchQuery,
        clients,
        projects,
        statuses,
        itemCategories,
        productGroups,
        foldingTypes,
        finishedLengths,
        finishedWidths,
        finishedHeights
      ).then(res => res),
    {
      retry: 0,
    }
  );
}

export function useProductDevelopmentsTest() {
  return useQuery(
    [],
    () =>
      ProductDevelopmentsService.getApiProductDevelopmentsTest().then(
        res => res
      ),
    {
      retry: 1,
      enabled: false,
    }
  );
}
