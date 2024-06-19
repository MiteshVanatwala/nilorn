import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ApiError, MediaFileService, MediaFileType, Status } from '../generate';
import QueryKeysEnum from './queryKeys';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { OpenAPI } from '../generate';
import { downloadBlob } from '../utils/file';
import { useToast } from '../hooks/useToast';
import { useUpdateProductDevelopmentWithStatus } from './productDevelopment';

export const useUploadFile = (
  no: string,
  mediaFileType: MediaFileType,
  currentStatus?: Status
) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const { mutate: updateStatus } = useUpdateProductDevelopmentWithStatus(no);

  async function submitStatus(): Promise<void> {
    if (currentStatus !== Status.DESIGN) {
      queryClient.invalidateQueries([QueryKeysEnum.Overview]);
    } else {
      updateStatus(Status.ARTWORK);
    }
  }

  return useMutation(
    ({
      file,
      replaceArtwork = false,
    }: {
      file: File;
      replaceArtwork?: boolean;
    }) =>
      MediaFileService.postApiMediaFileUpload(
        no,
        mediaFileType,
        replaceArtwork,
        { file }
      ).then(res => res),
    {
      onSuccess: async file => {
        showToast({
          status: 'success',
          description: t('PD.Feedback.Success.FileUpdated', {
            name: file?.name,
          }),
        });
        if (mediaFileType === MediaFileType.ARTWORK) {
          submitStatus();
        }
      },
      onError: async (_, { file }) => {
        showToast({
          status: 'error',
          description: t('PD.Feedback.Error.FileUpdated', {
            name: file?.name,
          }),
        });
      },
      retry: 0,
    }
  );
};

export function useDeleteMediaFile(id: string) {
  const { showToast } = useToast();

  return useMutation(
    (keepInSharePoint?: boolean) =>
      MediaFileService.deleteApiMediaFile(id, keepInSharePoint).then(
        res => res
      ),
    {
      onError: async (err: ApiError) => {
        showToast({
          status: 'error',
          title: err.body.title,
        });
      },
    }
  );
}

export function useAttachments(no: string) {
  return useQuery(
    [QueryKeysEnum.ProductDevelopment, no, QueryKeysEnum.Attachments],
    () => MediaFileService.getApiMediaFileAttachments(no).then(res => res),
    {
      retry: 0,
      keepPreviousData: false,
      refetchOnWindowFocus: false,
    }
  );
}
