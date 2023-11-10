import { HStack, Text, IconButton, Box, Tooltip } from '@chakra-ui/react';
import DownloadButton from '../../components/Button/DownloadButton';
import { useTranslation } from 'react-i18next';
import { SPACE } from '../../theme/Constants';

type Props = {
  name: string;
  url: string;
  onRemove: (name: string) => void;
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
        <Text noOfLines={1}>
          <Box mr={SPACE.XS} display={'inline-block'}>
            {icon}
          </Box>
          {name}
        </Text>
      </Tooltip>
      <Box minW={'5rem'}>
        <DownloadButton
          fileName={name}
          url={url}
          tooltipText={t('Common.Download')}
        />
        <Tooltip label={t('Common.Remove')}>
          <IconButton
            variant={'deleteBtn'}
            aria-label={t('Common.Remove')}
            icon={<i className={'ri-close-line'} />}
            mr={0}
            onClick={() => onRemove(name)}
          />
        </Tooltip>
      </Box>
    </HStack>
  );
};

export default File;
