import { useQuery } from 'react-query';
import { useFilterFormSearchParams } from '../utils/FilterHelper';
import QueryKeysEnum from './queryKeys';
import { ProductDevelopmentDeepService } from '../generate';

export function useProductDevelopmentDeepFilter(
  includeCalculations: boolean,
  keepPreviousData: boolean = true
) {
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
      QueryKeysEnum.ProductDevelopmentDeep,
      pageNumber,
      pageSize,
      includeCalculations,
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
      !!includeClosed,
    ],
    () =>
      ProductDevelopmentDeepService.getApiProductDevelopmentDeep(
        pageNumber,
        pageSize,
        includeCalculations,
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
      keepPreviousData: keepPreviousData,
      refetchOnWindowFocus: false,
      cacheTime: 1000 * 20,
      staleTime: 1000 * 20,
      enabled: pageNumber > 0 && pageSize > 0,
    }
  );
}
