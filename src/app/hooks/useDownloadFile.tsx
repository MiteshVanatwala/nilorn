import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useToast } from './useToast';
import { OpenAPI } from '../generate';
import { downloadBlob } from '../utils/file';
import { DownloadFileType, Method } from '../types/types';

export function useDownloadFile() {
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const { t } = useTranslation();
  const { showToast } = useToast();

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        setSuccess(false);
      }, 800);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      setTimeout(() => {
        setError(false);
      }, 800);
    }
  }, [isError]);

  const downloadFile = async (
    filetype: DownloadFileType,
    id: string,
    fileName: string,
    method: Method = Method.GET,
    body: any = {}
  ) => {
    const isPost = method === Method.POST;
    const header: HeadersInit = {
      ...OpenAPI.HEADERS,
    };

    if (isPost) {
      header['Content-Type'] = 'application/json';
    }
    const url = `${OpenAPI.BASE}/api/${
      filetype === 'media' ? 'MediaFile' : 'Excel/GetExcel'
    }/${id}`;
    try {
      setLoading(true);
      setError(false);
      setSuccess(false);
      const data = await fetch(url, {
        method: method,
        headers: header,
        body: isPost ? JSON.stringify(body) : undefined,
      }).then(res => {
        if (!res.ok) {
          throw new Error(t('Common.DownloadErrorMsg'));
        }
        return res.blob();
      });
      downloadBlob(data, fileName);
      setSuccess(true);
    } catch (err) {
      setError(true);
      const error = err as Error;
      showToast({
        status: 'error',
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return { downloadFile, isLoading, isError, isSuccess };
}
