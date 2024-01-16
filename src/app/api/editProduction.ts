import { useMutation, useQueryClient } from 'react-query';
import QueryKeysEnum from './queryKeys';
import { ApiError, ProductionDto, ProductionsService } from '../generate';
import { useTranslation } from 'react-i18next';
import { useToast } from '../hooks/useToast';

export function useDeleteProduction() {
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

export const usePatchProduction = (
  id: string | undefined,
  released: boolean = false
) => {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  return useMutation(
    [QueryKeysEnum.ProductDevelopmentImage, id, released],

    (body: ProductionDto) =>
      ProductionsService.patchApiProductions(id ?? '', body).then(
        response => response
      ),
    {
      onSuccess: async () => {
        queryClient.invalidateQueries([QueryKeysEnum.Productions]);
        showToast({
          status: 'success',
          description: released
            ? t('Production.SaveReleaseSuccess')
            : t('Production.SaveSuccess'),
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
export const useCreateProduction = (released: boolean = false) => {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  return useMutation(
    (body: ProductionDto) =>
      ProductionsService.postApiProductions(body).then(response => response),
    {
      onSuccess: async () => {
        queryClient.invalidateQueries([QueryKeysEnum.Productions]);

        showToast({
          status: 'success',
          description: released
            ? t('Production.CreateAndReleaseSuccess')
            : t('Production.CreateSuccess'),
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
        queryClient.invalidateQueries([QueryKeysEnum.Productions]);
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
};
