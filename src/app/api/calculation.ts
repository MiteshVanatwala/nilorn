import { useTranslation } from 'react-i18next';
import { useToast } from '../hooks/useToast';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import QueryKeysEnum from './queryKeys';
import {
  ApiError,
  GetFilteredProductDevelopmentDeepWithPaginationQuery,
  PriceCalculationService,
  ProductionsService,
  UpdateSalesPriceCommand,
} from '../generate';
import {
  priceCalculationCreateDtos,
  PriceCalculationUpdateDtos,
} from '../generate/models/CreatePriceCalculationCommand';

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
    (body: PriceCalculationUpdateDtos) =>
      PriceCalculationService.patchApiPriceCalculation(body).then(
        response => response
      ),
    {
      onSuccess: async (_, variables) => {
        // Store information about which calculation was just updated
        // This helps the grid components know to close inline edit for this specific calculation
        const calculationForm = variables.priceCalculationUpdateDtos?.[0] as any;
        const calculationId = calculationForm?.id;
        if (calculationId) {
          queryClient.setQueryData(['lastUpdatedCalculation'], calculationId);
        }
        
        // Only invalidate specific queries, don't remove all cached data
        queryClient.invalidateQueries([QueryKeysEnum.PriceCalculation, calculationId]);
        queryClient.invalidateQueries([QueryKeysEnum.ProductDevelopmentDeep]);

        showToast({
          status: 'success',
          description: t('PriceCalc.Feedback.Success.Update'),
        });
      },
      onError: async () => {
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
    (body: priceCalculationCreateDtos) =>
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
      onError: async () => {
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
      onError: async () => {
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
      cacheTime: 250,
      staleTime: 250,
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

export const useIncludeSalesPrice = (id: string, isValid: boolean) => {
  const { t } = useTranslation();
  const { showToast } = useToast();
  return useMutation(
    (include: boolean) =>
      PriceCalculationService.patchApiPriceCalculationIncludeSalesPrice(
        id,
        include
      ).then(res => res),
    {
      onSuccess: async res => {
        if (!isValid && res.valid) {
          showToast({
            status: 'success',
            description: t('PriceCalc.Feedback.Success.UpdateValid'),
          });
        } else {
          showToast({
            status: 'success',
            description: res.included
              ? t('PriceCalc.Feedback.Success.UpdateIncluded')
              : t('PriceCalc.Feedback.Success.UpdateNotIncluded'),
          });
        }
      },
      onError: async () => {
        showToast({
          status: 'error',
          description: t('PriceCalc.Error.UpdateIncluded'),
        });
      },
    }
  );
};

export const useBulkPriceCalculations = (ids: string[]) => {
  return useQuery(
    [QueryKeysEnum.PriceCalculation, 'bulk', ...ids],
    async () => {
      // Fetch all price calculations in parallel
      const promises = ids.map(id => 
        PriceCalculationService.getApiPriceCalculation(id).then(res => res)
      );
      return Promise.all(promises);
    },
    {
      enabled: ids.length > 0,
      retry: 0,
      cacheTime: 0,
      staleTime: 0,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );
};

export const useBulkProductions = (ids: string[]) => {
  return useQuery(
    [QueryKeysEnum.Productions, 'bulk', ...ids],
    async () => {
      // Fetch all productions in parallel
      const promises = ids.map(id => 
        ProductionsService.getApiProductions(id).then(res => res)
      );
      return Promise.all(promises);
    },
    {
      enabled: ids.length > 0,
      retry: 0,
      cacheTime: 0,
      staleTime: 0,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );
};

export const useBulkPriceCalculationsBatch = (ids: string[]) => {
  // Create a stable query key by sorting the IDs
  const stableIds = [...ids].sort();
  const queryKey = [QueryKeysEnum.PriceCalculation, 'batch', stableIds.join(',')];
  
  return useQuery(
    queryKey,
    async () => {
      // Use the new batch API instead of individual calls
      return PriceCalculationService.postApiPriceCalculationBatch({ ids: stableIds });
    },
    {
      enabled: stableIds.length > 0,
      retry: 0,
      cacheTime: 5 * 60 * 1000, // 5 minutes
      staleTime: 2 * 60 * 1000, // 2 minutes
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      refetchOnMount: false, // Prevent refetch on mount if data exists
    }
  );
};

export const useBulkProductionsBatch = (ids: string[]) => {
  // Create a stable query key by sorting the IDs
  const stableIds = [...ids].sort();
  const queryKey = [QueryKeysEnum.Productions, 'batch', stableIds.join(',')];
  
  return useQuery(
    queryKey,
    async () => {
      // Use the new batch API instead of individual calls
      return ProductionsService.postApiProductionsBatch({ ids: stableIds });
    },
    {
      enabled: stableIds.length > 0,
      retry: 0,
      cacheTime: 5 * 60 * 1000, // 5 minutes
      staleTime: 2 * 60 * 1000, // 2 minutes
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      refetchOnMount: false, // Prevent refetch on mount if data exists
    }
  );
};
