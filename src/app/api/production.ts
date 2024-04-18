import { useQuery } from 'react-query';
import { CompositionMaterialService, ProductionsService } from '../generate';
import QueryKeysEnum from './queryKeys';
import { ServerFilter } from '../types/types';

export function useProduction(id: string) {
  return useQuery(
    [QueryKeysEnum.Productions, id],
    () => ProductionsService.getApiProductions(id),
    {
      retry: 0,
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
      ProductionsService.getApiProductions1(no, sourcingCompanyCode, released),
    {
      retry: 0,
    }
  );
}

export function useProductionNavigation(id: string, filters?: ServerFilter) {
  const { vendors, clients, sourcingCompanies, productDevelopments, projects } =
    filters || {};

  return useQuery(
    [
      QueryKeysEnum.Productions,
      QueryKeysEnum.Navigation,
      id,
      vendors,
      clients,
      sourcingCompanies,
      productDevelopments,
      projects,
    ],
    () =>
      ProductionsService.getApiProductionsNavigation(
        id,
        false,
        productDevelopments,
        vendors,
        sourcingCompanies,
        clients,
        projects
      ),
    {
      retry: 0,
    }
  );
}

export const useCompositionMaterials = () => {
  return useQuery(
    [QueryKeysEnum.CompositionMaterial],
    () =>
      CompositionMaterialService.getApiCompositionMaterial().then(res => res),
    {
      retry: 0,
    }
  );
};
