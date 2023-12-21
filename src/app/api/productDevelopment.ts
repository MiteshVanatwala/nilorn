import { useMutation, useQuery } from 'react-query';
import {
  ApiError,
  ProductDevelopmentDto,
  ProductDevelopmentsService,
  Status,
} from '../generate';
import QueryKeysEnum from './queryKeys';
import { useTranslation } from 'react-i18next';
import { useToast } from '../hooks/useToast';
import { useNavigate } from 'react-router';

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
          title: err.body.title,
        });
      },
    }
  );
};

export const useUpdateProductDevelopment = (no: string) => {
  const { t } = useTranslation();
  const { showToast } = useToast();
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

export const useUpdateProductDevelopmentWithStatus = (no: string) => {
  const { t } = useTranslation();
  const { showToast } = useToast();
  return useMutation(
    (status: Status) =>
      ProductDevelopmentsService.patchApiProductDevelopments1(no, status).then(
        response => response
      ),
    {
      onSuccess: async (res: ProductDevelopmentDto) => {
        showToast({
          status: 'success',
          description: `${t('PD.Feedback.Success.UpdateStatus', {
            status: res.status,
          })}`,
        });
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
    [QueryKeysEnum.ProductDevelopment],
    () =>
      ProductDevelopmentsService.getApiProductDevelopments1(no).then(
        res => res
      ),
    {
      retry: 0,
      enabled: no !== '',
    }
  );
};
