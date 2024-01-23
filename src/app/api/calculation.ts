import { useTranslation } from 'react-i18next';
import { useToast } from '../hooks/useToast';
import { useMutation, useQueryClient } from 'react-query';
import QueryKeysEnum from './queryKeys';
import {
  ApiError,
  PriceCalculationDto,
  PriceCalculationService,
} from '../generate';

export const usePatchCalculation = (id: string) => {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  return useMutation(
    (body: PriceCalculationDto) =>
      PriceCalculationService.patchApiPriceCalculation(id, body).then(
        response => response
      ),
    {
      onSuccess: async () => {
        queryClient.invalidateQueries([QueryKeysEnum.Productions]);

        showToast({
          status: 'success',
          description: t('PriceCalc.SaveSuccess'),
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
export const useCreateCalculation = () => {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  return useMutation(
    (body: PriceCalculationDto) =>
      PriceCalculationService.postApiPriceCalculation(body).then(
        response => response
      ),
    {
      onSuccess: async () => {
        queryClient.invalidateQueries([QueryKeysEnum.Productions]);

        showToast({
          status: 'success',
          description: t('PriceCalc.CreateSuccess'),
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
