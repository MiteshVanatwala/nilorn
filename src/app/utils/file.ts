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

// TODO: Draft of workaround
export const previewBlob = (
  data: Blob,
  filename: string,
  contentType: string
) => {
  const blobUrl = window.URL.createObjectURL(
    new Blob([data], { type: contentType })
  );
  const newTab = window.open();
  if (newTab) {
    newTab.document.write(
      `<iframe src="${blobUrl}" style="width: 100%; height: 100%; border: none;"></iframe>`
    );
    newTab.document.title = filename;
  } else {
    console.error(
      'Failed to open preview in new tab. Please check your browser settings.'
    );
  }
};
