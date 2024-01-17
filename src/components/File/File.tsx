import { HStack, Text, IconButton, Box, Tooltip, Flex } from '@chakra-ui/react';
import DownloadButton from '../Button/DownloadButton';
import { useTranslation } from 'react-i18next';
import { SPACE } from '../../theme/Constants';

type Props = {
  name: string;
  url: string;
  onRemove?: (name: string) => void;
  icon?: JSX.Element;
};
export const File = ({
  name,
  url,
  onRemove,
  icon = <Text as={'i'} className={'ri-file-3-line'} />,
}: Props) => {
  const { t } = useTranslation();
  return (
    <HStack justifyContent={'space-between'}>
      <Tooltip label={name}>
        <Flex>
          <Box mr={SPACE.XS} display={'inline-block'}>
            {icon}
          </Box>
          <Text noOfLines={1}>{name}</Text>
        </Flex>
      </Tooltip>
      <Box minW={'5rem'}>
        <DownloadButton
          fileName={name}
          url={url}
          tooltipText={t('Common.Download')}
        />
        <Tooltip label={t('Common.Remove')}>
          {onRemove && (
            <IconButton
              variant={'deleteIconBtn'}
              aria-label={t('Common.Remove')}
              icon={<i className={'ri-close-line'} />}
              mr={0}
              onClick={() => onRemove(name)}
            />
          )}
        </Tooltip>
      </Box>
    </HStack>
  );
};

export default File;
