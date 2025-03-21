import { Box, Text, Image, HStack, VStack, Button } from '@chakra-ui/react';
import StatusBadge from '../Status/StatusBadge';
import { ProductDevelopmentDataDto, Status } from '../../app/generate';
import { SPACE } from '../../theme/Constants';
import ArtworkButton from '../Button/ArtworkButton';
import { MouseEvent, useEffect, useRef } from 'react';
import { useLastVisitedPD } from '../../app/hooks/useLastVisitedPD';
import useStoreFilterAndNavigate from '../../app/hooks/useStoreFilterAndNavigate';
import CommentPopup from '../CommentPopup/CommentPopup';

const ProductDevelopmentCell = ({
  no,
  name,
  artwork,
  thumbnailData,
  status,
  projectCode,
  versionSpecification,
}: ProductDevelopmentDataDto) => {
  const ref = useRef<HTMLDivElement>(null);
  const { lastVisitedPD, setLastVisitedPD } = useLastVisitedPD();
  const { storeFilterAndNavigate, storeBackLink } = useStoreFilterAndNavigate();

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

  const handleClick = (e: MouseEvent<HTMLButtonElement>, url: string) => {
    e.stopPropagation();
    storeBackLink();
    storeFilterAndNavigate(url);
  };

  return (
    <Box w={'100%'} h={'100%'} ref={ref}>
      <VStack py={SPACE.XS} spacing={SPACE.XS} alignItems={'baseline'}>
        <HStack justifyContent={'space-between'} width={'100%'}>
          <VStack
            gap={SPACE.XXS}
            justifyContent={'flex-start'}
            alignItems={'flex-start'}>
            <Button
              variant={'textBtn'}
              onClick={e => {
                handleClick(e, `/product-development/${no}`);
              }}>
              <CommentPopup
                icon={<Text>{no}</Text>}
                comment={versionSpecification ?? ''}
                padding="0"
                showIconWithoutComment
              />
            </Button>
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
