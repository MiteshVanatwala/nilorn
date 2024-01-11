import { useMutation, useQuery, useQueryClient } from 'react-query';

import QueryKeysEnum from './queryKeys';
import { ImageService, ProductionsService } from '../generate';

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
export function useDeleteVendor() {
  //   const queryClient = useQueryClient();
  return useMutation(
    (body: { id: string }) =>
      ProductionsService.deleteApiProductions(body).then(response => response),
    {
      onSuccess: async () => {
        //TODO invalidate productions
        // queryClient.invalidateQueries([QueryKeysEnum.ProductDevelopmentImage]);
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
