import { useQuery } from 'react-query';
import { useFilterSearchParams } from '../../components/Filter/FilterHelper';
import QueryKeysEnum from './queryKeys';
import { ProductDevelopmentDeepService, ProductionsService } from '../generate';

export function useProductionsFilter(includeCalculations: boolean) {
  const currentPageNumber = Number(useFilterSearchParams('pageNumber'));
  const currentPageSize = Number(useFilterSearchParams('pageSize'));
  const pageNumber =
    useFilterSearchParams('pageNumber') !== undefined ? currentPageNumber : 1;
  const pageSize = useFilterSearchParams('pageSize') ? currentPageSize : 25;
  const vendors = useFilterSearchParams('vendor');
  const clients = useFilterSearchParams('clients');
  const sourcingCompanies = useFilterSearchParams('sourcingCompanies');
  const productDevelopments = useFilterSearchParams('productDevelopments');
  const projects = useFilterSearchParams('projects');
  return useQuery(
    [
      QueryKeysEnum.Productions,
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
