import { Box, Text, Image, HStack, VStack, Link } from '@chakra-ui/react';
import StatusBadge from '../Status/StatusBadge';
import { ProductDevelopmentBriefDto, Status } from '../../app/generate';
import { SPACE } from '../../theme/Constants';
import ArtworkButton from '../Button/ArtworkButton';
import { NavLink } from 'react-router-dom';
import { getCurrentStoredFilter } from '../Filter/FilterHelper';

const ProductDevelopmentCell = ({
  no,
  name,
  artworkId,
  thumbnailData,
  status,
  project,
}: ProductDevelopmentBriefDto) => {
  return (
    <Box w={'100%'} h={'100%'}>
      <VStack py={SPACE.XS} spacing={SPACE.XS} alignItems={'baseline'}>
        <HStack justifyContent={'space-between'} width={'100%'}>
          <VStack
            gap={0}
            justifyContent={'flex-start'}
            alignItems={'flex-start'}>
            <Link
              onClick={() => {
                sessionStorage.setItem('backLink', window.location.href);
                const storedFilter = getCurrentStoredFilter();

                sessionStorage.setItem(storedFilter, window.location.search);
              }}
              as={NavLink}
              to={`/product-development/${no}`}>
              #{no}
            </Link>
            <Text variant={'bodyBigBlack'}>{name}</Text>
          </VStack>
          {artworkId && <ArtworkButton size="SMALL" id={artworkId} />}
        </HStack>
        {thumbnailData && (
          <Image
            height={'8rem'}
            width={'8rem'}
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
