import { Box, Text, Image, HStack, VStack, Link } from '@chakra-ui/react';
import StatusBadge from '../Status/StatusBadge';
import { ProductDevelopmentBriefDto, Status } from '../../app/generate';
import { SPACE } from '../../theme/Constants';
import ArtworkButton from '../Button/ArtworkButton';
import { getCurrentStoredFilter } from '../../app/utils/FilterHelper';
import { useLocation, useNavigate } from 'react-router-dom';
import { MouseEvent, useEffect, useRef } from 'react';

const ProductDevelopmentCell = ({
  no,
  name,
  artwork,
  thumbnailData,
  status,
  project,
}: ProductDevelopmentBriefDto) => {
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!!ref?.current && no && location.hash === `#${no}`) {
      ref.current.scrollIntoView({ block: 'start', inline: 'center' });
      location.hash = '';
    }
  }, [location, no]);

  const handleClick = (
    e: MouseEvent<HTMLAnchorElement>,
    url: string,
    id: string
  ) => {
    e.stopPropagation();
    const path = window.location.pathname ?? '/';
    const search = window.location.search;
    const anchor = id ? `#${id}` : '';
    const storedFilter = getCurrentStoredFilter();
    sessionStorage.setItem('backLink', path + search + anchor);
    sessionStorage.setItem(storedFilter, search);
    navigate(url);
  };

  return (
    <Box w={'100%'} h={'100%'} ref={ref}>
      <VStack py={SPACE.XS} spacing={SPACE.XS} alignItems={'baseline'}>
        <HStack justifyContent={'space-between'} width={'100%'}>
          <VStack
            gap={0}
            justifyContent={'flex-start'}
            alignItems={'flex-start'}>
            <Link
              as={Text}
              onClick={e => {
                handleClick(e, `/product-development/${no}`, no ?? '');
              }}>
              #{no}
            </Link>
            <Text variant={'bodyBigBlack'}>{name}</Text>
          </VStack>
          {artwork && <ArtworkButton artwork={artwork} />}
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
