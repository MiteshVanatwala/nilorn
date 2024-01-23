import { Grid, GridItem, Image } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { GRID, SIZES, SPACE } from '../../../theme/Constants';
import { useFormContext } from 'react-hook-form';
import File from '../../../components/File/File';
import UploadFile from '../../../components/File/UploadFile';
import AccordionItem from '../../../components/AccordionItem/AccordionItem';
import { images } from '../../../assets';
import { MediaFileDto, MediaFileType } from '../../../app/generate';
import { useUploadFile } from '../../../app/api/mediaFile';
import { useEffect, useMemo, useState } from 'react';
import { forEach, isError } from 'lodash';
import { useMutation } from 'react-query';

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
  const [mediaFiles, setMediaFiles] =
    useState<MediaFileWithStatus[]>(defaultValue);

  const { mutateAsync } = useUploadFile(no, type);

  const removeFile = (id: string) => {
    // TODO: Call API
    // Remove from list
    console.log('removeFile', mediaFiles, id);
    setMediaFiles(prevMediaFiles => {
      const filteredFiles = prevMediaFiles.filter(prev => !(prev.id === id));

      // Add the updated object with status: 'success'
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
      } catch (err) {
        setMediaFiles(prevMediaFiles => {
          return prevMediaFiles.map(prev =>
            prev.id === undefined && prev.name === filename
              ? { ...prev, status: 'error' }
              : prev
          );
        });
        console.error('Failed to upload file: ', filename);
      }
    });

    await Promise.all(uploadPromises);
  };

  return (
    <>
      <GridItem colSpan={12}>
        {!disableEdit && (
          <UploadFile
            no={no}
            type={type}
            heading={heading}
            onUpload={handleUpload}
            showAdd={
              type === MediaFileType.ARTWORK && mediaFiles.length === 0
                ? true
                : !disableEdit
            }
            multiple={type === MediaFileType.ATTACHMENT}
          />
        )}
      </GridItem>
      {mediaFiles.map(f => (
        <GridItem
          key={f.id}
          colSpan={{
            lg: 2,
          }}>
          <File
            key={f.id}
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
