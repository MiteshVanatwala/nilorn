import { useMutation } from 'react-query';
import { MediaFileService, MediaFileType } from '../generate';

export const useUploadFile = (no: string, mediaFileType: MediaFileType) => {
  return useMutation(
    (file: Blob) =>
      MediaFileService.postApiMediaFile(no, mediaFileType, { file }).then(
        res => res
      ),
    {
      retry: 0,
    }
  );
};
