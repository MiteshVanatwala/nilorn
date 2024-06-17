import { Box, GridItem, HStack } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import File from '../../../components/File/File';
import UploadFile from '../../../components/File/UploadFile';
import { MediaFileDto, MediaFileType, Status } from '../../../app/generate';
import { useUploadFile } from '../../../app/api/mediaFile';
import { useState } from 'react';
import { ARTWORK } from './AttachmentSection';
import { SPACE } from '../../../theme/Constants';

type FileStatus = 'loading' | 'success' | 'error';

type Props = {
  defaultValue?: MediaFileDto[];
  heading: string;
  type: MediaFileType;
  no: string;
  disableEdit: boolean;
};

export type MediaFileWithStatus = MediaFileDto & {
  status?: FileStatus;
};

const FileSection = ({
  no,
  disableEdit,
  heading,
  type,
  defaultValue = [],
}: Props) => {
  const { setValue, getValues } = useFormContext();
  const [mediaFiles, setMediaFiles] =
    useState<MediaFileWithStatus[]>(defaultValue);
  const currentStatus = getValues('status') as Status;

  const { mutateAsync } = useUploadFile(no, type, currentStatus);

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

      const match = mediaFiles.find(mf => mf.name === filename);
      if (!match) {
        setMediaFiles(prevStatus => [
          ...prevStatus,
          {
            id: undefined,
            name: filename,
            status: 'loading',
          },
        ]);
      } else {
        setMediaFiles(prevMediaFiles => {
          return prevMediaFiles.map(prev =>
            prev.name === filename
              ? {
                  ...prev,
                  status: 'loading',
                }
              : prev
          );
        });
      }

      try {
        const res = await mutateAsync({ file: file });
        setMediaFiles(prevMediaFiles => {
          return prevMediaFiles.map(prev =>
            prev.name === res.name
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
            prev.name === filename ? { ...prev, status: 'error' } : prev
          );
        });
        console.error(err);
      }
    });

    await Promise.all(uploadPromises);
  };

  return (
    <GridItem colSpan={12}>
      <Box pb={SPACE.XS}>
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
      </Box>
      <HStack flexWrap={'wrap'}>
        {mediaFiles.map((f, i) => (
          <Box key={`${f?.id}-${i}`} pb={SPACE.XS} pr={SPACE.XL}>
            <File
              file={f}
              status={f?.status ?? 'success'}
              onRemove={
                disableEdit ? undefined : (id: string) => removeFile(id)
              }
            />
          </Box>
        ))}
      </HStack>
    </GridItem>
  );
};

export default FileSection;
