import { useFilterFormSearchParams } from '../../components/Filter/FilterHelper';
import { ServerFilter } from '../types/types';

export const useFormStateFilters = (): ServerFilter => {
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

  return {
    pageSize,
    pageNumber,
    vendors,
    clients,
    sourcingCompanies,
    productDevelopments,
    projects,
  };
};
