import { useQuery } from 'react-query';
import { CompositionMaterialService } from '../generate';
import QueryKeysEnum from './queryKeys';

export const useCompositionMaterial = () => {
  return useQuery(
    [QueryKeysEnum.CompositionMaterial],
    () =>
      CompositionMaterialService.getApiCompositionMaterial().then(res => res),
    {
      retry: 0,
    }
  );
};
