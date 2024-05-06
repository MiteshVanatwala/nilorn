import { useQuery } from 'react-query';
import QueryKeysEnum from './queryKeys';
import { ProductDevelopmentsService } from '../../app/generate';
import { useFilterFormSearchParams } from '../utils/FilterHelper';

export function useProductDevelopmentsFilter() {
  const currentPageNumber = Number(useFilterFormSearchParams('pageNumber'));
  const currentPageSize = Number(useFilterFormSearchParams('pageSize'));
  const pageNumber =
    useFilterFormSearchParams('pageNumber') !== undefined
      ? currentPageNumber
      : 1;
  const pageSize = useFilterFormSearchParams('pageSize') ? currentPageSize : 25;
  const sortKey = useFilterFormSearchParams('sortKey');
  const searchQuery = useFilterFormSearchParams('searchQuery', 400);
  const productDevelopments = useFilterFormSearchParams('productDevelopments');
  const clients = useFilterFormSearchParams('clients');
  const projects = useFilterFormSearchParams('projects');
  const statuses = useFilterFormSearchParams('statuses');
  const itemCategories = useFilterFormSearchParams('itemCategories');
  const productGroups = useFilterFormSearchParams('productGroups');
  const foldingTypes = useFilterFormSearchParams('foldingTypes');
  const finishedLengths = useFilterFormSearchParams('finishedLengths');
  const finishedWidths = useFilterFormSearchParams('finishedWidths');
  const finishedHeights = useFilterFormSearchParams('finishedHeights');
  const sourcingCompanies = useFilterFormSearchParams('sourcingCompanies');
  const vendors = useFilterFormSearchParams('vendor');
  const opComps = useFilterFormSearchParams('opComp');
  const members = useFilterFormSearchParams('members');
  const certificates = useFilterFormSearchParams('certificates');
  const indirectCosts = useFilterFormSearchParams('indirectCosts');
  const includeClosed = useFilterFormSearchParams('includeClosed');

  return useQuery(
    [
      QueryKeysEnum.Overview,
      pageNumber,
      pageSize,
      sortKey,
      searchQuery,
      productDevelopments,
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
      certificates,
      indirectCosts,
      includeClosed,
    ],
    () =>
      ProductDevelopmentsService.getApiProductDevelopmentsFilter(
        pageNumber,
        pageSize,
        sortKey,
        searchQuery,
        productDevelopments,
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
        // @ts-ignore // more the 15 props
        vendors,
        opComps,
        members,
        certificates,
        indirectCosts,
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
