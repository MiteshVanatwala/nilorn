import { GridItem } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import File from '../../../components/File/File';
import UploadFile from '../../../components/File/UploadFile';
import { MediaFileDto, MediaFileType, Status } from '../../../app/generate';
import { useUploadFile } from '../../../app/api/mediaFile';
import { useState } from 'react';

import { ARTWORK } from './AttachmentSection';
import { useToast } from '../../../app/hooks/useToast';
import { useUpdateProductDevelopmentWithStatus } from '../../../app/api/productDevelopment';
import { useTranslation } from 'react-i18next';
import { useUnsavedChanges } from '../../../app/hooks/useUnsavedChanges';

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
  const { setValue, trigger, getValues } = useFormContext();
  const { mutate: updateStatus } = useUpdateProductDevelopmentWithStatus(no);
  const [mediaFiles, setMediaFiles] =
    useState<MediaFileWithStatus[]>(defaultValue);
  const { t } = useTranslation();
  const currentStatus = getValues('status') as Status;
  const { hasUnsavedChanges } = useUnsavedChanges();

  const { mutateAsync } = useUploadFile(no, type);
  const { showToast } = useToast();
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
          submitStatus(Status.ARTWORK);
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
  async function submitStatus(status: Status): Promise<void> {
    if (currentStatus === status) {
      return;
    }
    if (hasUnsavedChanges()) {
      showToast({
        status: 'info',
        description: t('PD.Feedback.Info.NeedToSave'),
      });
      return;
    }
    const res = await trigger();
    if (res) {
      updateStatus(status);
    }
  }

  return (
    <>
      <GridItem colSpan={12}>
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
            onRemove={disableEdit ? undefined : (id: string) => removeFile(id)}
          />
        </GridItem>
      ))}
    </>
  );
};

export default FileSection;
