import { useQuery } from 'react-query';
import { useFilterFormSearchParams } from '../utils/FilterHelper';
import QueryKeysEnum from './queryKeys';
import { ProductDevelopmentDeepService, ProductionsService } from '../generate';

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
  const vendors = useFilterFormSearchParams('vendor');
  const clients = useFilterFormSearchParams('clients');
  const sourcingCompanies = useFilterFormSearchParams('sourcingCompanies');
  const productDevelopments = useFilterFormSearchParams('productDevelopments');
  const projects = useFilterFormSearchParams('projects');

  return useQuery(
    [
      QueryKeysEnum.ProductDevelopmentDeep,
      pageNumber,
      pageSize,
      includeCalculations,
      vendors,
      clients,
      sourcingCompanies,
      productDevelopments,
      projects,
    ],

    () =>
      ProductDevelopmentDeepService.getApiProductDevelopmentDeep(
        pageNumber,
        pageSize,
        includeCalculations,
        productDevelopments,
        vendors,
        sourcingCompanies,
        clients,
        projects
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
