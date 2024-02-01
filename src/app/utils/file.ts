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
