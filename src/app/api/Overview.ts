import { useQuery } from 'react-query';
import QueryKeysEnum from './queryKeys';
import { ProductDevelopmentsService } from '../../app/generate';
import { useFilterSearchParams } from '../../components/Filter/FilterHelper';

export function useProductDevelopmentsFilter() {
  const currentPageNumber = Number(useFilterSearchParams('pageNumber'));
  const currentPageSize = Number(useFilterSearchParams('pageSize'));
  const pageNumber =
    useFilterSearchParams('pageNumber') !== undefined ? currentPageNumber : 1;
  const pageSize = useFilterSearchParams('pageSize') ? currentPageSize : 25;
  const sortKey = useFilterSearchParams('sortKey');
  const searchQuery = useFilterSearchParams('searchQuery', 400);
  const clients = useFilterSearchParams('clients');
  const projects = useFilterSearchParams('projects');
  const statuses = useFilterSearchParams('statuses');
  const itemCategories = useFilterSearchParams('itemCategories');
  const productGroups = useFilterSearchParams('productGroups');
  const foldingTypes = useFilterSearchParams('foldingTypes');
  const finishedLengths = useFilterSearchParams('finishedLengths');
  const finishedWidths = useFilterSearchParams('finishedWidths');
  const finishedHeights = useFilterSearchParams('finishedHeights');
  const sourcingCompanies = useFilterSearchParams('sourcingCompanies');
  const vendors = useFilterSearchParams('vendor');
  const opComps = useFilterSearchParams('opComp');
  const members = useFilterSearchParams('members');
  const includeClosed = useFilterSearchParams('includeClosed');

  return useQuery(
    [
      QueryKeysEnum.Overview,
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
      finishedHeights,
      sourcingCompanies,
      vendors,
      opComps,
      members,
      includeClosed,
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
        finishedHeights,
        sourcingCompanies,
        vendors,
        // @ts-ignore // more the 15 props
        opComps,
        members,
        !!includeClosed
      ).then(res => res),
    {
      retry: 0,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      cacheTime: 1000 * 5 * 60,
      staleTime: 1000 * 5 * 60,
      enabled: pageNumber > 0 && pageSize > 0,
    }
  );
}
