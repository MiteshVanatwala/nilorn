import { useMutation, useQueryClient } from 'react-query';
import QueryKeysEnum from './queryKeys';
import { ApiError, ProductionDto, ProductionsService } from '../generate';
import { useTranslation } from 'react-i18next';
import { useToast } from '../hooks/useToast';

export function useDeleteProduction() {
  const queryClient = useQueryClient();
  return useMutation(
    (body: { id: string }) =>
      ProductionsService.deleteApiProductions(body).then(response => response),
    {
      onSuccess: async () => {
        queryClient.invalidateQueries([QueryKeysEnum.Productions]);
      },
    }
  );
}

//TODO THIS IS NOT RIGHT ENDPOINT
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
        queryClient.invalidateQueries([QueryKeysEnum.Productions]);
        showToast({
          status: 'success',
          description: released
            ? t('Production.ReleaseSaleSuccess')
            : t('Production.RemoveSaleSuccess'),
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
