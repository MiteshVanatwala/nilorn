import { ChangeEvent } from 'react';

export const downloadBlob = (data: Blob, filename: string) => {
  const blobUrl = window.URL.createObjectURL(data);
  const link = window.document.createElement('a');
  window.document.body.appendChild(link);
  link.href = blobUrl;
  link.setAttribute('download', filename);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(blobUrl);
};

export const downloadFromUrl = (url: string) => {
  const filename = url.substring(url.lastIndexOf('/') + 1);

  const link = window.document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};

export const handleFileUpload = (
  e: ChangeEvent<HTMLInputElement>
): string[] => {
  const { files } = e?.currentTarget;
  const uploadedFileNames: string[] = [];

  if (files && files.length) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const filename = file.name;

      uploadedFileNames.push(filename);
    }
  }
  return uploadedFileNames;
};
