import {
  HStack,
  Text,
  IconButton,
  Box,
  Tooltip,
  Flex,
  Spinner,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { COLORS, SIZES, SPACE } from '../../theme/Constants';
import { MediaFileDto } from '../../app/generate';
import { useDeleteMediaFile, useDownloadFile } from '../../app/api/mediaFile';
import ConfirmModal from '../Modal/ConfirmModal';
import { useModal } from '../../app/hooks/useModal';

type FileStatus = 'loading' | 'success' | 'error';
type Props = {
  file: MediaFileDto;
  status: FileStatus;
  onRemove?: (id: string) => void;
  icon?: JSX.Element;
};

export const File = ({
  file,
  status,
  onRemove,
  icon = <Text as={'i'} className={'ri-file-3-line'} />,
}: Props) => {
  const id: string = file.id ?? '';
  const { t } = useTranslation();
  const { handleModal, close } = useModal();

  const { mutateAsync: deleteFile, isLoading: isDeleting } =
    useDeleteMediaFile(id);

  const { downloadFile, isLoading: isDownloading } = useDownloadFile(
    id,
    file.name ?? ''
  );

  async function removeFile() {
    const res = await deleteFile();
    if (res) {
      close();
      onRemove && onRemove(id);
    }
  }

  async function download() {
    downloadFile();
  }

  async function preview() {
    alert(`preview ${file.name}`);
  }

  return (
    <HStack justifyContent={'space-between'}>
      <Tooltip label={file.name ?? ''}>
        <Flex>
          <Box mr={SPACE.XS} display={'inline-block'}>
            {status === 'error' ? (
              <Text
                as={'i'}
                fontSize={SIZES.ICON.MD}
                color={COLORS.ERROR}
                className={'ri-error-warning-fill'}
              />
            ) : (
              <>{icon}</>
            )}
          </Box>
          <Text
            noOfLines={1}
            color={status === 'error' ? COLORS.ERROR : 'inherit'}>
            {status === 'error' && <>{t('PD.FailToUpload')}</>}
            {file.name ?? ''}
          </Text>
        </Flex>
      </Tooltip>
      {status === 'loading' && <Spinner />}
      {status === 'success' && (
        <Box minW={'8rem'}>
          <Tooltip label={t('Common.Preview')}>
            <IconButton
              variant={'iconBtn'}
              aria-label={t('Common.Preview')}
              onClick={preview}
              disabled={isDeleting}
              icon={<i className="ri-eye-line" />}
            />
          </Tooltip>
          <Tooltip label={t('Common.Download')}>
            <IconButton
              variant={'iconBtn'}
              aria-label={t('Common.Download')}
              onClick={download}
              isLoading={isDownloading}
              disabled={isDeleting}
              icon={<i className="ri-download-line" />}
            />
          </Tooltip>
          {onRemove && (
            <Tooltip label={t('Common.Remove')}>
              <IconButton
                isLoading={isDeleting}
                disabled={isDownloading}
                variant={'deleteIconBtn'}
                aria-label={t('Common.Remove')}
                icon={<i className={'ri-close-line'} />}
                mr={0}
                onClick={() =>
                  handleModal(
                    <ConfirmModal
                      title={t('PD.DeleteTitle')}
                      description={t('PD.DeleteFile', { name: file.name })}
                      confirmType="DELETE"
                      onConfirm={() => removeFile()}
                    />
                  )
                }
              />
            </Tooltip>
          )}
        </Box>
      )}
    </HStack>
  );
};

export default File;
