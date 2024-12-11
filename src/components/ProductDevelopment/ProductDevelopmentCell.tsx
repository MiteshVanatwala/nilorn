import { Box, Text, Image, HStack, VStack, Link } from '@chakra-ui/react';
import StatusBadge from '../Status/StatusBadge';
import { ProductDevelopmentDataDto, Status } from '../../app/generate';
import { SPACE } from '../../theme/Constants';
import ArtworkButton from '../Button/ArtworkButton';
import { getCurrentStoredFilter } from '../../app/utils/FilterHelper';
import { useNavigate } from 'react-router-dom';
import { MouseEvent, useEffect, useRef } from 'react';
import { SESSION_STORAGE } from '../../app/utils/constant';
import { useLastVisitedPD } from '../../app/hooks/useLastVisitedPD';

const ProductDevelopmentCell = ({
  no,
  name,
  artwork,
  thumbnailData,
  status,
  projectCode,
}: ProductDevelopmentDataDto) => {
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { lastVisitedPD, setLastVisitedPD } = useLastVisitedPD();

  useEffect(() => {
    if (!!ref?.current && no && no === lastVisitedPD) {
      setTimeout(() => {
        ref?.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
        setLastVisitedPD('');
      }, 100);
    }
  }, [lastVisitedPD, no, ref, setLastVisitedPD]);

  const handleClick = (
    e: MouseEvent<HTMLAnchorElement>,
    url: string,
    id: string
  ) => {
    e.stopPropagation();
    const path = window.location.pathname ?? '/';
    const search = window.location.search;
    const storedFilter = getCurrentStoredFilter();
    sessionStorage.setItem(SESSION_STORAGE.BACK_LINK, path + search);
    sessionStorage.setItem(storedFilter, search);
    navigate(url);
  };

  return (
    <Box w={'100%'} h={'100%'} ref={ref}>
      <VStack py={SPACE.XS} spacing={SPACE.XS} alignItems={'baseline'}>
        <HStack justifyContent={'space-between'} width={'100%'}>
          <VStack
            gap={SPACE.XXS}
            justifyContent={'flex-start'}
            alignItems={'flex-start'}>
            <Link
              variant={'textLink'}
              as={'button'}
              onClick={e => {
                handleClick(e, `/product-development/${no}`, no ?? '');
              }}>
              {no}
            </Link>
            <Text variant={'bodyBold'}>{name}</Text>
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
        {projectCode && <Text>{projectCode}</Text>}
        <StatusBadge status={status as Status} />
      </VStack>
    </Box>
  );
};

export default ProductDevelopmentCell;
