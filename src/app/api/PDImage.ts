import { useMutation, useQuery, useQueryClient } from 'react-query';

import QueryKeysEnum from './queryKeys';
import { ImageService } from '../generate';

export function useGetPDImage(no: string, enable: boolean = true) {
  return useQuery(
    [QueryKeysEnum.ProductDevelopmentImage, no],
    () => ImageService.getApiImage(no).then(res => res),
    {
      retry: 0,
      enabled: enable,
    }
  );
}
export function useDeletePDImage(id: string) {
  const queryClient = useQueryClient();

  return useMutation(
    () => ImageService.deleteApiImage(id).then(response => response),
    {
      onSuccess: async () => {
        queryClient.invalidateQueries([QueryKeysEnum.ProductDevelopmentImage]);
      },
    }
  );
}

export const useUploadPDImage = (no: string) => {
  const queryClient = useQueryClient();

  return useMutation(
    (body: { file: Blob }) =>
      ImageService.putApiImage(no, body).then(response => response),
    {
      onSuccess: async () => {
        queryClient.invalidateQueries([QueryKeysEnum.ProductDevelopmentImage]);
      },
    }
  );
};
