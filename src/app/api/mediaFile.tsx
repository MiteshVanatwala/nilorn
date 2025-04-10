import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ApiError, MediaFileService, MediaFileType, Status } from '../generate';
import QueryKeysEnum from './queryKeys';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { OpenAPI } from '../generate';
import { downloadBlob } from '../utils/file';
import { useToast } from '../hooks/useToast';
import { useUpdateProductDevelopmentWithStatus } from './productDevelopment';
import { useUnsavedChanges } from '../hooks/useUnsavedChanges';

export const useUploadFile = (
  no: string,
  mediaFileType: MediaFileType,
  currentStatus?: Status
) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const { mutate: updateStatus } = useUpdateProductDevelopmentWithStatus(no);
  const { hasUnsavedChanges } = useUnsavedChanges();

  async function submitStatus(): Promise<void> {
    if (currentStatus === Status.DESIGN) {
      if (hasUnsavedChanges()) {
        showToast({
          status: 'info',
          description: t('PD.Feedback.Info.NeedToSave'),
        });
        return;
      }
      await updateStatus(Status.ARTWORK);
    } else {
      queryClient.invalidateQueries([QueryKeysEnum.Overview]);
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
          description: t('PD.File.Feedback.Success.FileUpdated', {
            name: file?.name,
          }),
        });
        if (mediaFileType === MediaFileType.ARTWORK) {
          submitStatus();
        }
      },
      onError: async (error: ApiError, { file }) => {
        if (error.status === 404) {
          if (error?.body?.detail === 'All') {
            showToast({
              status: 'error',
              description: t('PD.File.Feedback.Error.EnteredNameInDBMissing', {
                name: file?.name,
              }),
            });
          } else {
            showToast({
              status: 'error',
              description: t(
                'PD.File.Feedback.Error.EnteredNameInDBIncorrect',
                {
                  name: file?.name,
                  level1: error?.body?.detail.split(';')[0],
                  level2:
                    error?.body?.detail.split(';').length > 1
                      ? error?.body?.detail.split(';')[1]
                      : '',
                }
              ),
            });
          }
        }
        if (
          (error as any).body?.indexOf(
            t('PD.File.Feedback.Error.FileLocationMissingBackendMessage')
          ) > 0
        ) {
          showToast({
            status: 'error',
            description: t('PD.File.Feedback.Error.FileLocationMissing', {
              name: file?.name,
            }),
          });
        } else {
          showToast({
            status: 'error',
            description: t('PD.File.Feedback.Error.FileUpdated', {
              name: file?.name,
            }),
          });
        }
      },
      retry: 0,
    }
  );
};

export function useDeleteMediaFile(id: string) {
  const { t } = useTranslation();
  const { showToast } = useToast();

  return useMutation(
    (keepInSharePoint?: boolean) =>
      MediaFileService.deleteApiMediaFile(id, keepInSharePoint).then(
        res => res
      ),
    {
      onError: async (err: ApiError, keepInSharePoint: boolean) => {
        if (err.status !== 410) {
          showToast({
            status: 'error',
            title: keepInSharePoint
              ? t('PD.File.Feedback.Error.FileRemoveLink')
              : t('PD.File.Feedback.Error.FileDelete'),
          });
        }
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
      const error = err as ApiError;
      console.log(error);

      if (error.status === 410) {
        showToast({
          status: 'info',
          description: t('PD.File.Feedback.Info.DownloadLinkMissing'),
        });
      } else {
        showToast({
          status: 'error',
          description: t('PD.File.Feedback.Error.FileDownload'),
        });
      }
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
