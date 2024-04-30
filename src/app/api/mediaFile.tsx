import { useMutation, useQuery } from 'react-query';
import { ApiError, MediaFileService, MediaFileType } from '../generate';
import QueryKeysEnum from './queryKeys';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { OpenAPI } from '../generate';
import { downloadBlob } from '../utils/file';
import { useToast } from '../hooks/useToast';

export const useUploadFile = (no: string, mediaFileType: MediaFileType) => {
  return useMutation(
    (file: Blob) =>
      MediaFileService.postApiMediaFileUpload(no, mediaFileType, { file }).then(
        res => res
      ),
    {
      retry: 0,
    }
  );
};

export function useDeleteMediaFile(id: string) {
  const { showToast } = useToast();

  return useMutation(
    () => MediaFileService.deleteApiMediaFile(id).then(res => res),
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

export function useDownloadFile(id: string, fileName: string) {
  const [isLoading, setLoading] = useState(false);
  const { t } = useTranslation();
  const { showToast } = useToast();

  const downloadFile = async () => {
    const url = `${OpenAPI.BASE}/api/MediaFile/${id}`;
    const header: HeadersInit = {
      ...OpenAPI.HEADERS,
    };

    try {
      setLoading(true);
      const data = await fetch(url, {
        method: 'GET',
        headers: header,
      }).then(res => {
        if (!res.ok) {
          throw new Error(t('Common.DownloadErrorMsg'));
        }
        return res.blob();
      });
      downloadBlob(data, fileName);
    } catch (err) {
      const error = err as Error;
      console.log(error);
      showToast({
        status: 'error',
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return { isLoading, downloadFile };
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
