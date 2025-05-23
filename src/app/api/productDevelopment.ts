import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  ApiError,
  GetNavigationForProductDevelopmentQuery,
  MembersService,
  ProductDevelopmentDto,
  ProductDevelopmentsService,
  Status,
} from '../generate';
import QueryKeysEnum from './queryKeys';
import { useTranslation } from 'react-i18next';
import { useToast } from '../hooks/useToast';
import { useNavigate } from 'react-router';
import { SESSION_STORAGE } from '../utils/constant';
import { convertQueryStringToFilterObject } from '../utils/FilterHelper';
import { useBackInfo } from '../hooks/useBackInfo';

export const useCreateProductDevelopment = () => {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const navigate = useNavigate();

  return useMutation(
    (body: ProductDevelopmentDto) =>
      ProductDevelopmentsService.postApiProductDevelopments(body).then(
        response => response
      ),
    {
      onSuccess: async (no: string) => {
        showToast({
          status: 'success',
          description: `${t('PD.Feedback.Success.Created', { no: no })}`,
        });
        navigate(`/product-development/${no}`);
      },
      onError: async (err: ApiError) => {
        showToast({
          status: 'error',
          title: `${t('PD.Feedback.Error.Create')}`,
        });
      },
    }
  );
};

export const useUpdateProductDevelopment = (no: string) => {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  return useMutation(
    (body: ProductDevelopmentDto) =>
      ProductDevelopmentsService.patchApiProductDevelopments(no, body).then(
        response => response
      ),
    {
      onSuccess: async () => {
        showToast({
          status: 'success',
          description: `${t('PD.Feedback.Success.Update')}`,
        });
        queryClient.invalidateQueries([QueryKeysEnum.Changes]);
        queryClient.invalidateQueries([QueryKeysEnum.ProductDevelopment, no]);
        queryClient.invalidateQueries([QueryKeysEnum.Members, no]);
      },
      onError: async (err: ApiError) => {
        showToast({
          status: 'error',
          title: `${t('PD.Feedback.Error.Update')}`,
        });
      },
    }
  );
};

export const useUpdateProductDevelopmentWithStatus = (no: string) => {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation(
    (status: Status) =>
      ProductDevelopmentsService.patchApiProductDevelopments1(no, status).then(
        response => response
      ),
    {
      onSuccess: async (res: ProductDevelopmentDto) => {
        if (res.status === Status.DELETED) {
          navigate(
            `/${sessionStorage.getItem(
              SESSION_STORAGE.PREV_FILTER_OVERVIEW
            )}` ?? '/'
          );
        } else {
          showToast({
            status: 'success',
            description: `${t('PD.Feedback.Success.UpdateStatus', {
              status: res.status,
            })}`,
          });
          queryClient.invalidateQueries([QueryKeysEnum.ProductDevelopment, no]);
          queryClient.invalidateQueries([QueryKeysEnum.Overview]);
        }
      },
      onError: async (err: ApiError) => {
        showToast({
          status: 'error',
          title: err.body.title,
        });
      },
    }
  );
};

export const useProductDevelopment = (no: string) => {
  return useQuery(
    [QueryKeysEnum.ProductDevelopment, no],
    () =>
      ProductDevelopmentsService.getApiProductDevelopments(no).then(res => res),
    {
      retry: 0,
      staleTime: Infinity,
      cacheTime: Infinity,
      enabled: no !== '',
      keepPreviousData: false,
    }
  );
};

export const useMembers = (no: string) => {
  return useQuery(
    [QueryKeysEnum.Members, no],
    () => MembersService.getApiMembersFilter(no).then(res => res),
    {
      retry: 0,
      enabled: no !== '',
    }
  );
};

export const useProductDevelopmentNavigation = (no: string) => {
  const { backInfo } = useBackInfo();

  const filters: GetNavigationForProductDevelopmentQuery =
    convertQueryStringToFilterObject(backInfo?.filter ?? '');

  return useQuery(
    [
      QueryKeysEnum.ProductDevelopment,
      QueryKeysEnum.Navigation,
      no,
      backInfo?.filter,
    ],
    () =>
      ProductDevelopmentsService.postApiProductDevelopmentsNavigation({
        ...filters,
        includeOnlyWithSourcings: backInfo?.view !== 'overview',
        productDevelopmentNo: no,
      }).then(res => res),
    {
      retry: 0,
      enabled: no !== '' || !!backInfo,
      cacheTime: 100,
      staleTime: 100,
    }
  );
};

export const useCreateCopyProductDevelopment = (no: string) => {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation(
    () =>
      ProductDevelopmentsService.postApiProductDevelopmentsCopy(no).then(
        response => response
      ),
    {
      onSuccess: async (no: string) => {
        showToast({
          status: 'success',
          description: `${t('PD.Feedback.Success.Created', { no: no })}`,
        });
        navigate(`/product-development/${no}`);
        queryClient.invalidateQueries([QueryKeysEnum.Overview]);
        queryClient.invalidateQueries([QueryKeysEnum.Navigation]);
      },
      onError: async (err: ApiError) => {
        showToast({
          status: 'error',
          title: `${t('PD.Feedback.Error.CreateCopy')}`,
        });
      },
    }
  );
};

export const useCreateVersionProductDevelopment = (no: string) => {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation(
    () =>
      ProductDevelopmentsService.postApiProductDevelopmentsVersion1(no).then(
        response => response
      ),
    {
      onSuccess: async (no: string) => {
        navigate(`/product-development/${no}`);
        showToast({
          status: 'success',
          description: `${t('PD.Feedback.Success.Created', {
            no: no,
          })}`,
        });
        queryClient.invalidateQueries([QueryKeysEnum.Overview]);
        queryClient.invalidateQueries([QueryKeysEnum.Navigation]);
      },
      onError: async (err: ApiError) => {
        showToast({
          status: 'error',
          title: `${t('PD.Feedback.Error.CreateVersion')}`,
        });
      },
    }
  );
};
