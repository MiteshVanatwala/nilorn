import { Box, Text, Image, IconButton, HStack, VStack } from '@chakra-ui/react';
import StatusBadge from '../../components/Status/StatusBadge';
import { ProductDevelopmentBriefDto, Status } from '../../app/generate';
import { images } from '../../assets';
import { useTranslation } from 'react-i18next';
import { SPACE } from '../../theme/Constants';

const ProductDevelopmentCell = ({
  no,
  name,
  artworkUrl,
  thumbnailData,
  status,
  project,
}: ProductDevelopmentBriefDto) => {
  const { t } = useTranslation();

  return (
    <Box h={'100%'}>
      <VStack spacing={SPACE.MD} alignItems={'baseline'}>
        <HStack justifyContent={'space-between'} width={'100%'}>
          <Text>#{no}</Text>

          {artworkUrl && (
            <IconButton
              variant={'ghost'}
              aria-label={t('PD.Artwork')}
              onClick={() => console.log('Download')}
              icon={
                <Image
                  src={images.pdf}
                  height="2.5rem"
                  objectFit={'contain'}
                  width="auto"
                />
              }
            />
          )}
        </HStack>
        <Text variant={'bodyBigBlack'}>{name}</Text>
        {thumbnailData && (
          <Image
            height={'8rem'}
            objectFit={'cover'}
            src={`data:image/jpeg;base64,${thumbnailData}`}
          />
        )}
        {project && <Text>{project}</Text>}
        <StatusBadge status={status as Status} />
      </VStack>
    </Box>
  );
};

export default ProductDevelopmentCell;
