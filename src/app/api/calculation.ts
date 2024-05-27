import { useTranslation } from 'react-i18next';
import { useToast } from '../hooks/useToast';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import QueryKeysEnum from './queryKeys';
import {
  ApiError,
  CreatePriceCalculationCommand,
  GetFilteredProductDevelopmentDeepWithPaginationQuery,
  PriceCalculationService,
  UpdatePriceCalculationCommand,
  UpdateSalesPriceCommand,
} from '../generate';

export const usePriceCalculation = (id: string) => {
  return useQuery(
    [QueryKeysEnum.PriceCalculation, id],
    () => PriceCalculationService.getApiPriceCalculation(id).then(res => res),
    {
      retry: 0,
      cacheTime: 0,
      staleTime: 0,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );
};

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
        queryClient.invalidateQueries([QueryKeysEnum.PriceCalculation]);
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
    (body: CreatePriceCalculationCommand) =>
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

  return useMutation(
    (body: UpdateSalesPriceCommand) =>
      PriceCalculationService.patchApiPriceCalculationSalesPrice(body).then(
        response => response
      ),
    {
      onSuccess: async () => {
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

export const usePriceCalculationDefaultValues = (
  productDevelopmentNo: string,
  sourcingCompanycode: string,
  vendorId: string,
  purchaseCurrencyCode: string
) => {
  return useQuery(
    [
      QueryKeysEnum.PriceCalculation,
      QueryKeysEnum.DefaultValues,
      productDevelopmentNo,
      sourcingCompanycode,
      vendorId,
      purchaseCurrencyCode,
    ],
    () =>
      PriceCalculationService.getApiPriceCalculationDefaultValues(
        productDevelopmentNo,
        sourcingCompanycode,
        vendorId,
        purchaseCurrencyCode
      ).then(res => res),
    {
      retry: 0,
    }
  );
};

export const usePriceCalculationNavigation = (
  id: string,
  filters: GetFilteredProductDevelopmentDeepWithPaginationQuery
) => {
  return useQuery(
    [
      QueryKeysEnum.PriceCalculation,
      QueryKeysEnum.Navigation,
      id,
      JSON.stringify(filters),
    ],
    () =>
      PriceCalculationService.postApiPriceCalculationNavigation({
        ...filters,
        id: id,
      }).then(res => res),
    {
      retry: 0,
    }
  );
};
