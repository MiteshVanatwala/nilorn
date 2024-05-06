import {
  HStack,
  Text,
  IconButton,
  Box,
  Tooltip,
  Flex,
  Spinner,
  Link,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { COLORS, SIZES, SPACE } from '../../theme/Constants';
import { MediaFileDto } from '../../app/generate';
import { useDownloadFile } from '../../app/api/mediaFile';
import RemoveFileModal from './RemoveFileModal';
import { useRef } from 'react';
import { ModalRef } from '../Modal/IsolatedModal';

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
  const modalRef = useRef<ModalRef>(null);

  const { downloadFile, isLoading: isDownloading } = useDownloadFile(
    id,
    file.name ?? ''
  );

  const openDeleteModal = () => {
    modalRef.current?.onOpen();
  };

  const removeFile = (id: string) => {
    onRemove && onRemove(id);
  };

  return (
    <HStack justifyContent={'space-between'}>
      <Tooltip
        label={`${status === 'success' && t('Common.Preview')} ${file.name}`}>
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
          {status === 'error' ? (
            <Text noOfLines={1} color={COLORS.ERROR}>
              {t('PD.FailToUpload')}
            </Text>
          ) : (
            <Link target="_blank" href={`${file?.webUrl}`} noOfLines={1}>
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
              onClick={downloadFile}
              isLoading={isDownloading}
              icon={<i className="ri-download-line" />}
            />
          </Tooltip>
          {onRemove && (
            <Tooltip label={t('Common.Remove')}>
              <IconButton
                disabled={isDownloading}
                variant={'deleteIconBtn'}
                aria-label={t('Common.Remove')}
                icon={<i className={'ri-close-line'} />}
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
