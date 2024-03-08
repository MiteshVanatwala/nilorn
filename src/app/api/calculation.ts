import { useTranslation } from 'react-i18next';
import { useToast } from '../hooks/useToast';
import { useMutation, useQueryClient } from 'react-query';
import QueryKeysEnum from './queryKeys';
import {
  ApiError,
  PriceCalculationDto,
  PriceCalculationService,
  UpdatePriceCalculationCommand,
  UpdateSalesPriceCommand,
} from '../generate';

export const usePatchCalculation = () => {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  return useMutation(
    (body: UpdatePriceCalculationCommand) =>
      PriceCalculationService.patchApiPriceCalculation(body).then(
        response => response
      ),
    {
      onSuccess: async () => {
        queryClient.invalidateQueries([QueryKeysEnum.ProductDevelopmentDeep]);

        showToast({
          status: 'success',
          description: t('PriceCalc.Feedback.Success.Update'),
        });
      },
      onError: async (err: ApiError) => {
        showToast({
          status: 'error',
          description: t('PriceCalc.Feedback.Error.Update'),
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
        queryClient.invalidateQueries([QueryKeysEnum.ProductDevelopmentDeep]);

        showToast({
          status: 'success',
          description: t('PriceCalc.Feedback.Success.Create'),
        });
      },
      onError: async (err: ApiError) => {
        showToast({
          status: 'error',
          description: t('PriceCalc.Feedback.Error.Create'),
        });
      },
    }
  );
};

export const usePatchCalculationSalesPrice = () => {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  return useMutation(
    (body: UpdateSalesPriceCommand) =>
      PriceCalculationService.patchApiPriceCalculationSalesPrice(body).then(
        response => response
      ),
    {
      onSuccess: async () => {
        queryClient.invalidateQueries([QueryKeysEnum.ProductDevelopmentDeep]);

        showToast({
          status: 'success',
          description: t('PriceCalc.Feedback.Success.UpdateRows'),
        });
      },
      onError: async (err: ApiError) => {
        showToast({
          status: 'error',
          description: t('PriceCalc.Feedback.Error.UpdateRows'),
        });
      },
    }
  );
};

export function useDeleteCalculation(id: string) {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const { t } = useTranslation();

  return useMutation(
    () =>
      PriceCalculationService.deleteApiPriceCalculation(id).then(
        response => response
      ),
    {
      onSuccess: async () => {
        queryClient.invalidateQueries([QueryKeysEnum.ProductDevelopmentDeep]);
        showToast({
          status: 'success',
          description: t('PriceCalc.Feedback.Success.Remove'),
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
