import { Box, Text, Image, HStack, VStack } from '@chakra-ui/react';
import StatusBadge from '../../components/Status/StatusBadge';
import { ProductDevelopmentBriefDto, Status } from '../../app/generate';
import { SPACE } from '../../theme/Constants';
import ArtworkButton from '../../components/Button/ArtworkButton';

const ProductDevelopmentCell = ({
  no,
  name,
  artworkUrl,
  thumbnailData,
  status,
  project,
}: ProductDevelopmentBriefDto) => {
  return (
    <Box h={'100%'}>
      <VStack spacing={SPACE.MD} alignItems={'baseline'}>
        <HStack justifyContent={'space-between'} width={'100%'}>
          <Text>#{no}</Text>
          {artworkUrl && <ArtworkButton size="SMALL" url={artworkUrl} />}
        </HStack>
        <Text variant={'bodyBigBlack'}>{name}</Text>
        {thumbnailData && (
          <Image height={'8rem'} objectFit={'cover'} src={thumbnailData} />
        )}
        {project && <Text>{project}</Text>}
        <StatusBadge status={status as Status} />
      </VStack>
    </Box>
  );
};

export default ProductDevelopmentCell;
