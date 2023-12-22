import { useMutation, useQuery, useQueryClient } from 'react-query';

import QueryKeysEnum from './queryKeys';
import { ProductDevelopmentsService } from '../generate';

export function useGetPDImage(no: string, enable: boolean = true) {
  return useQuery(
    [QueryKeysEnum.ProductDevelopmentImage, no],
    () =>
      ProductDevelopmentsService.getApiProductDevelopmentsImage(no).then(
        res => res
      ),
    {
      retry: 1,
      enabled: enable,
    }
  );
}

export const useUploadPDImage = (no: string) => {
  const queryClient = useQueryClient();

  return useMutation(
    (body: { file: Blob }) =>
      ProductDevelopmentsService.putApiProductDevelopmentsImage(no, body).then(
        response => response
      ),
    {
      onSuccess: async () => {
        queryClient.invalidateQueries([QueryKeysEnum.ProductDevelopmentImage]);
      },
    }
  );
};
