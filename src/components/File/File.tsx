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

  const { mutateAsync: deleteFile, isLoading: isDeleting } =
    useDeleteMediaFile(id);

  const { downloadFile, isLoading: isDownloading } = useDownloadFile(
    id,
    file.name ?? ''
  );

  async function removeFile() {
    const res = await deleteFile();
    if (res) {
      onRemove && onRemove(id);
    }
  }

  async function getFile() {
    downloadFile();
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
        <Box minW={'5rem'}>
          <Tooltip label={t('Common.Download')}>
            <IconButton
              variant={'iconBtn'}
              aria-label={t('Common.Download')}
              onClick={getFile}
              isLoading={isDownloading}
              disabled={isDeleting}
              icon={<i className="ri-download-line" />}
            />
          </Tooltip>
          <Tooltip label={t('Common.Remove')}>
            {onRemove && (
              <IconButton
                isLoading={isDeleting}
                disabled={isDownloading}
                variant={'deleteIconBtn'}
                aria-label={t('Common.Remove')}
                icon={<i className={'ri-close-line'} />}
                mr={0}
                onClick={removeFile}
              />
            )}
          </Tooltip>
        </Box>
      )}
    </HStack>
  );
};

export default File;
