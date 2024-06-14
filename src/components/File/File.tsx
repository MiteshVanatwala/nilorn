import {
  Box,
  Flex,
  HStack,
  IconButton,
  Link,
  Spinner,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useDownloadFile } from '../../app/hooks/useDownloadFile';
import { MediaFileDto } from '../../app/generate';
import { COLORS, SIZES, SPACE } from '../../theme/Constants';
import RemixIcon from '../Icon/RemixIcon';
import { ModalRef } from '../Modal/IsolatedModal';
import RemoveFileModal from './RemoveFileModal';
import { DownloadFileType, Method } from '../../app/types/types';

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
  icon = <RemixIcon component="Text" icon="FILE_3_LINE" />,
}: Props) => {
  const id: string = file.id ?? '';
  const { t } = useTranslation();
  const modalRef = useRef<ModalRef>(null);

  const { downloadFile, isLoading: isDownloading } = useDownloadFile();

  const openDeleteModal = () => {
    modalRef.current?.onOpen();
  };

  const removeFile = (id: string) => {
    onRemove && onRemove(id);
  };

  const onDownloadFile = () => {
    downloadFile(DownloadFileType.MEDIA, id, file.name ?? '', Method.GET);
  };

  return (
    <HStack spacing={SPACE.MD}>
      <Tooltip
        label={`${status === 'success' && t('Common.Preview')} ${file.name}`}>
        <Flex>
          <Box mr={SPACE.XS} display={'inline-block'}>
            {status === 'error' ? (
              <RemixIcon
                component="Text"
                fontSize={SIZES.ICON.MD}
                color={COLORS.ERROR}
                icon="ERROR_WARNING_FILL"
              />
            ) : (
              <>{icon}</>
            )}
          </Box>
          {status === 'error' ? (
            <Text noOfLines={1} color={COLORS.ERROR}>
              {t('PD.FailToUpload')}
            </Text>
          ) : (
            <Link
              maxW={'35ch'}
              target="_blank"
              href={`${file?.webUrl}`}
              noOfLines={1}>
              <>{file.name ?? ''}</>
            </Link>
          )}
        </Flex>
      </Tooltip>
      {status === 'loading' && <Spinner />}
      {status === 'success' && (
        <Box minW={'5rem'}>
          <Tooltip label={t('Common.Download')}>
            <IconButton
              variant={'iconBtn'}
              aria-label={t('Common.Download')}
              onClick={onDownloadFile}
              isLoading={isDownloading}
              icon={<RemixIcon component="i" icon="DOWNLOAD_LINE" />}
            />
          </Tooltip>
          {onRemove && (
            <Tooltip label={t('Common.Remove')}>
              <IconButton
                disabled={isDownloading}
                variant={'deleteIconBtn'}
                aria-label={t('Common.Remove')}
                icon={<RemixIcon component="i" icon="CLOSE_LINE" />}
                mr={0}
                onClick={openDeleteModal}
              />
            </Tooltip>
          )}
        </Box>
      )}
      <RemoveFileModal ref={modalRef} id={id} onRemove={removeFile} />
    </HStack>
  );
};

export default File;
