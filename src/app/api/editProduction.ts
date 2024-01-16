import { useMutation, useQueryClient } from 'react-query';
import QueryKeysEnum from './queryKeys';
import { ApiError, ProductionDto, ProductionsService } from '../generate';
import { useTranslation } from 'react-i18next';
import { useToast } from '../hooks/useToast';
import { useDisclosure } from '@chakra-ui/react';

export function useDeleteProduction() {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const { t } = useTranslation();

  return useMutation(
    (body: { id: string }) =>
      ProductionsService.deleteApiProductions(body).then(response => response),
    {
      onSuccess: async () => {
        queryClient.invalidateQueries([QueryKeysEnum.Productions]);
        showToast({
          status: 'success',
          description: t('Production.Deleted'),
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
}

export const usePatchProduction = (
  id: string | undefined,
  released?: boolean
) => {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  return useMutation(
    [QueryKeysEnum.ProductDevelopmentImage, id],

    (body: ProductionDto) =>
      ProductionsService.patchApiProductions(id ?? '', body).then(
        response => response
      ),
    {
      onSuccess: async (body: ProductionDto) => {
        queryClient.invalidateQueries([QueryKeysEnum.Productions]);

        showToast({
          status: 'success',
          description:
            body?.released && released !== false
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
export const useCreateProduction = () => {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const queryClient = useQueryClient();
  const { onClose } = useDisclosure();

  return useMutation(
    (body: ProductionDto) =>
      ProductionsService.postApiProductions(body).then(response => response),
    {
      onSuccess: async (body: ProductionDto) => {
        queryClient.invalidateQueries([QueryKeysEnum.Productions]);
        onClose();

        showToast({
          status: 'success',
          description: body?.released
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
  const { onClose } = useDisclosure();

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
        onClose();

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
