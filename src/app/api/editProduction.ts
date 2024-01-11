import { useMutation, useQuery, useQueryClient } from 'react-query';

import QueryKeysEnum from './queryKeys';
import {
  ApiError,
  ImageService,
  ProductionDto,
  ProductionsService,
} from '../generate';
import { useTranslation } from 'react-i18next';
import { useToast } from '../hooks/useToast';

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

// export function useUpdateProduction() {
//   //   const queryClient = useQueryClient();
//   return useMutation(
//     (body: { id: string }) =>
//       ProductionsService.deleteApiProductions(body).then(response => response),
//     {
//       onSuccess: async () => {
//         //TODO invalidate productions
//         // queryClient.invalidateQueries([QueryKeysEnum.ProductDevelopmentImage]);
//       },
//     }
//   );
// }
// export function useUpdateProduction(id: string, released: boolean) {
//   return useQuery(
//     [QueryKeysEnum.ProductDevelopmentImage, id, released],
//     () =>
//       ProductionsService.patchApiProductionsReleaseProduction(
//         id,
//         released
//       ).then(res => res),
//     {
//       retry: 0,
//     }
//   );
// }
export const usePatchProduction = (
  id: string,
  released: boolean,
  saveOnly: boolean = false
) => {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  return useMutation(
    (body: ProductionDto) =>
      ProductionsService.patchApiProductionsReleaseProduction(
        id,
        released
      ).then(response => response),
    {
      onSuccess: async (res: ProductionDto) => {
        queryClient.invalidateQueries([QueryKeysEnum.Projects]);
        showToast({
          status: 'success',
          description: saveOnly
            ? t('Production.SaveSuccess')
            : t('Production.SaveReleaseSuccess'),
        });
      },
      onError: async (err: ApiError) => {
        showToast({
          status: 'error',
          title: err.body.title,
          description: err.body.detail,
        });
      },
    }
  );
};
export const useReleaseForSales = (
  id: string | undefined,
  released: boolean
) => {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  return useMutation(
    [QueryKeysEnum.ProductDevelopmentImage, id, released],
    () =>
      ProductionsService.patchApiProductionsReleaseProduction(
        id ?? '',
        released
      ).then(res => res),
    {
      retry: 0,
      onSuccess: async (res: ProductionDto) => {
        queryClient.invalidateQueries([QueryKeysEnum.Projects]);
        showToast({
          status: 'success',
          description: t('Production.SaveReleaseSuccess'),
        });
      },
      onError: async (err: ApiError) => {
        showToast({
          status: 'error',
          title: err.body.title,
          description: err.body.detail,
        });
      },
    }
  );

  //   return useMutation(
  //     (body: ProductionDto) =>
  //       ProductionsService.patchApiProductionsReleaseProduction(
  //         id,
  //         released
  //       ).then(response => response),
  //     {
  //       onSuccess: async (res: ProductionDto) => {
  //         queryClient.invalidateQueries([QueryKeysEnum.Projects]);
  //         showToast({
  //           status: 'success',
  //           description: t('Production.SaveReleaseSuccess'),
  //         });
  //       },
  //       onError: async (err: ApiError) => {
  //         showToast({
  //           status: 'error',
  //           title: err.body.title,
  //           description: err.body.detail,
  //         });
  //       },
  //     }
  //   );
  // };
};
