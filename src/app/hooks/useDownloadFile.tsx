import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useToast } from './useToast';
import { OpenAPI } from '../generate';
import { downloadBlob } from '../utils/file';

export function useDownloadFile() {
  const [isLoading, setLoading] = useState(false);
  const { t } = useTranslation();
  const { showToast } = useToast();

  const downloadFile = async (
    url: string,
    fileName: string,
    method: 'GET' | 'POST' | 'PUT' = 'GET',
    body: any = {}
  ) => {
    const isPost = method === 'POST';
    const header: HeadersInit = {
      ...OpenAPI.HEADERS,
    };

    if (isPost) {
      header['Content-Type'] = 'application/json';
    }
    try {
      setLoading(true);
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
    } catch (err) {
      const error = err as Error;
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
