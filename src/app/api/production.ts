import { useQuery } from 'react-query';
import {
  CertificateService,
  CompositionMaterialService,
  GetFilteredProductDevelopmentDeepWithPaginationQuery,
  ProductionsService,
} from '../generate';
import QueryKeysEnum from './queryKeys';

export function useProduction(id: string) {
  return useQuery(
    [QueryKeysEnum.Productions, id],
    () => ProductionsService.getApiProductions(id),
    {
      retry: 0,
      cacheTime: 10,
      staleTime: 10,
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

export function useProductionNavigation(
  id: string,
  filters?: GetFilteredProductDevelopmentDeepWithPaginationQuery
) {
  return useQuery(
    [
      QueryKeysEnum.Productions,
      QueryKeysEnum.Navigation,
      id,
      JSON.stringify(filters),
    ],
    () =>
      ProductionsService.postApiProductionsNavigation({
        ...filters,
        id: id,
      }),
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

export const useCertificateCodes = (enable: boolean = true) => {
  return useQuery(
    [QueryKeysEnum.Certificate],
    () => CertificateService.getApiCertificate().then(res => res),
    {
      retry: 0,
      enabled: enable,
    }
  );
};

export const useCertificateClasses = (certificateCode: string) => {
  return useQuery(
    [QueryKeysEnum.CertificateClasses, certificateCode],
    () =>
      CertificateService.getApiCertificateClasses(certificateCode).then(
        res => res
      ),
    {
      retry: 0,
    }
  );
};

export const useCertificateCategories = (certificateCode: string) => {
  return useQuery(
    [QueryKeysEnum.CertificateCategories, certificateCode],
    () =>
      CertificateService.getApiCertificateCategories(certificateCode).then(
        res => res
      ),
    {
      retry: 0,
    }
  );
};
