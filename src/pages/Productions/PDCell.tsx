import { Box, Text, Image, IconButton, HStack, VStack } from '@chakra-ui/react';
import StatusBadge from '../../components/Status/StatusBadge';
import { Status } from '../../app/generate';
import { images } from '../../assets/';
import { useTranslation } from 'react-i18next';
import { SPACE } from '../../theme/Constants';

type Props = { no: string };

const PDCell = ({ no }: Props) => {
  const { t } = useTranslation();

  return (
    <>
      <Box minH={'220px'}>
        <VStack spacing={SPACE.MD} alignItems={'baseline'}>
          <HStack justifyContent={'space-between'} width={'100%'}>
            <Text>#{no}</Text>
            <IconButton
              variant={'ghost'}
              aria-label={t('PD.Artwork')}
              icon={
                <Image
                  src={images.pdf}
                  height="2.5rem"
                  objectFit={'contain'}
                  width="auto"
                />
              }
            />
          </HStack>
          <Text variant={'bodyBigBlack'}>Wowen label text</Text>
          <Image
            height={'8rem'}
            objectFit={'cover'}
            src="https://static-cdn.sr.se/images/99/83d9ce09-41ea-4197-951e-48e2c17a7c81.jpg"></Image>
          <Text>Project X</Text>
          <StatusBadge status={Status.SOURCING} />
        </VStack>
      </Box>
    </>
  );
};

export default PDCell;
