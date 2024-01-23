import { HStack, Text, IconButton, Box, Tooltip, Flex } from '@chakra-ui/react';
import DownloadButton from '../Button/DownloadButton';
import { useTranslation } from 'react-i18next';
import { SPACE } from '../../theme/Constants';
import { MediaFileDto } from '../../app/generate';
import Spinner from '../Spinner/Spinner';

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
  const { t } = useTranslation();

  return (
    <HStack justifyContent={'space-between'}>
      <Tooltip label={file.name ?? ''}>
        <Flex>
          <Box mr={SPACE.XS} display={'inline-block'}>
            {icon}
          </Box>
          <Text noOfLines={1}>{file.name ?? ''}</Text>
        </Flex>
      </Tooltip>
      {status === 'loading' && <Spinner />}
      {status === 'error' && <>xxx</>}
      {status === 'success' && (
        <Box minW={'5rem'}>
          <DownloadButton
            fileName={file.name ?? ''}
            url={'url'} // Id
            tooltipText={t('Common.Download')}
          />
          <Tooltip label={t('Common.Remove')}>
            {onRemove && (
              <IconButton
                variant={'deleteIconBtn'}
                aria-label={t('Common.Remove')}
                icon={<i className={'ri-close-line'} />}
                mr={0}
                onClick={() => onRemove(file.id ?? '')}
              />
            )}
          </Tooltip>
        </Box>
      )}
    </HStack>
  );
};

export default File;
