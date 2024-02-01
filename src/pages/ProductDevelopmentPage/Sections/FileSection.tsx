import { GridItem } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import File from '../../../components/File/File';
import UploadFile from '../../../components/File/UploadFile';
import { MediaFileDto, MediaFileType } from '../../../app/generate';
import { useUploadFile } from '../../../app/api/mediaFile';
import { useState } from 'react';

import { ARTWORK } from './AttachmentSection';

type FileStatus = 'loading' | 'success' | 'error';

type Props = {
  defaultValue?: MediaFileDto[];
  heading: string;
  type: MediaFileType;
  no: string;
  disableEdit: boolean;
  isClosed: boolean;
};

export type MediaFileWithStatus = MediaFileDto & {
  status?: FileStatus;
};

const FileSection = ({
  no,
  disableEdit,
  heading,
  type,
  isClosed,
  defaultValue = [],
}: Props) => {
  const { setValue } = useFormContext();
  const [mediaFiles, setMediaFiles] =
    useState<MediaFileWithStatus[]>(defaultValue);

  const { mutateAsync } = useUploadFile(no, type);

  const removeFile = (id: string) => {
    if (type === MediaFileType.ARTWORK) {
      setValue(ARTWORK, undefined);
    }
    setMediaFiles(prevMediaFiles => {
      const filteredFiles = prevMediaFiles.filter(prev => !(prev.id === id));
      return [...filteredFiles];
    });
  };

  const handleUpload = async (files: FileList) => {
    const uploadPromises = Array.from(files).map(async file => {
      const filename = file.name;
      setMediaFiles(prevStatus => [
        ...prevStatus,
        {
          id: undefined,
          name: filename,
          status: 'loading',
        },
      ]);

      try {
        const res = await mutateAsync(file);
        setMediaFiles(prevMediaFiles => {
          return prevMediaFiles.map(prev =>
            prev.id === undefined && prev.name === res.name
              ? { ...prev, ...res, status: 'success' }
              : prev
          );
        });
        if (type === MediaFileType.ARTWORK) {
          setValue(ARTWORK, res);
        }
      } catch (err) {
        setMediaFiles(prevMediaFiles => {
          return prevMediaFiles.map(prev =>
            prev.id === undefined && prev.name === filename
              ? { ...prev, status: 'error' }
              : prev
          );
        });
        console.error(err);
      }
    });

    await Promise.all(uploadPromises);
  };

  return (
    <>
      <GridItem colSpan={12}>
        {!disableEdit && (
          <UploadFile
            accept={type === MediaFileType.ARTWORK ? '.pdf' : undefined}
            heading={heading}
            onUpload={handleUpload}
            showAdd={
              type === MediaFileType.ARTWORK && mediaFiles.length > 0
                ? false
                : !disableEdit
            }
            multiple={type === MediaFileType.ATTACHMENT}
          />
        )}
      </GridItem>
      {mediaFiles.map((f, i) => (
        <GridItem
          key={`${f.id}-${i}`}
          colSpan={{
            lg: 2,
          }}>
          <File
            file={f}
            status={f.status ?? 'success'}
            onRemove={(id: string) => removeFile(id)}
          />
        </GridItem>
      ))}
    </>
  );
};

export default FileSection;
