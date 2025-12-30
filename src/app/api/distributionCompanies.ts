import { useQuery } from 'react-query';
import QueryKeysEnum from './queryKeys';
import { OpenAPI } from '../generate/core/OpenAPI';
import { request as __request } from '../generate/core/request';

// Generic mapping to the app SelectOption shape
const mapToOption = (item: any) => {
  return {
    label: item.label ?? item.text ?? item.name ?? item.title ?? item.value,
    value: item.value ?? item.id ?? item.code ?? item.key ?? item.value,
  };
};

export function useGetDistributionCompaniesOption(enable: boolean = true) {
  return useQuery(
    [QueryKeysEnum.OpComp, 'DistributionCompanies', 'Option'],
    async () => {
      const data = await __request(OpenAPI, {
        method: 'GET',
        url: '/api/DistributionCompany/Filter/Option',
      });

      const list = (data as any[]) ?? [];
      return list.map((d: any) => mapToOption(d));
    },
    {
      cacheTime: 60 * 1000 * 5,
      staleTime: 60 * 1000 * 5,
      enabled: enable,
      retry: 0,
    }
  );
}
