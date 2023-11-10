import { HStack, Text, IconButton, Box, Tooltip } from '@chakra-ui/react';
import DownloadButton from '../../components/Button/DownloadButton';
import { useTranslation } from 'react-i18next';
import { SPACE } from '../../theme/Constants';

type Props = {
  name: string;
  url: string;
  onRemove: (name: string) => void;
  iconClass?: string;
};
export const File = ({
  name,
  url,
  onRemove,
  iconClass = 'ri-file-3-line',
}: Props) => {
  const { t } = useTranslation();
  return (
    <HStack justifyContent={'space-between'}>
      <Tooltip label={name}>
        <Text noOfLines={1}>
          <Text as={'i'} className={iconClass} mr={SPACE.XS} />
          {name}
        </Text>
      </Tooltip>
      <Box minW={'5rem'}>
        <Tooltip label={t('Common.Remove')}>
          <IconButton
            variant={'deleteBtn'}
            aria-label={t('Common.Remove')}
            icon={<i className={'ri-close-line'} />}
            mr={0}
            onClick={() => onRemove(name)}
          />
        </Tooltip>
        <DownloadButton
          fileName={name}
          url={url}
          tooltipText={t('Common.Download')}
        />
      </Box>
    </HStack>
  );
};

export default File;
