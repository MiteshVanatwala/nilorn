import { Box, Grid, GridItem, HStack, Heading, Text } from '@chakra-ui/layout';
import { COLORS, GRID, SIZES, SPACE } from '../../../theme/Constants';
import { Image, Link, VStack } from '@chakra-ui/react';
import TRANSITION from '../../../theme/Constants/transition';
import StatusBadge from '../../../components/Status/StatusBadge';
import {
  ProductDevelopmentBriefDto,
  ProductionDto,
  SourcedProductionDto,
} from '../../../app/generate';
import ActionBarEditProduction from './ActionBarEditProduction';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { ModalContext } from '../../../app/context/ModalContext';

type Props = {
  productDevelopment?: ProductDevelopmentBriefDto;
  sourcedProduction: SourcedProductionDto;
  production?: ProductionDto;
  actionBar: JSX.Element;
};
const ProductDevelopmentModalTopSection = ({
  productDevelopment,
  sourcedProduction,
  production,
  actionBar,
}: Props) => {
  const { close } = useContext(ModalContext);

  return (
    <Box
      py={{
        base: SPACE.XS,
        md: SPACE.MD,
      }}
      top={0}
      zIndex={89}
      bgColor={COLORS.WHITE}
      boxShadow={'none'}>
      <Grid
        overflow={'visible'}
        templateColumns={{
          base: GRID.TEMPLATE_COLUMNS.base,
          md: GRID.TEMPLATE_COLUMNS.lg,
          lg: GRID.TEMPLATE_COLUMNS.xl,
        }}
        gap={{
          base: SPACE.XXS,
          md: SPACE.SM,
        }}>
        <GridItem
          colSpan={{
            base: 1,
            md: 6,
            lg: 5,
          }}>
          <HStack
            flexDir={{
              base: 'column',
              md: 'row',
            }}
            gap={{
              base: SPACE.XXS,
              md: SPACE.MD,
            }}
            alignItems={'top'}>
            {productDevelopment?.thumbnailData && (
              <Image
                width={'40'}
                height={'40'}
                objectFit={'cover'}
                src={`data:image/jpeg;base64,${productDevelopment?.thumbnailData}`}
              />
            )}

            <VStack
              transition={TRANSITION.EASEOUT}
              gap={{
                base: SPACE.XXS,
                md: SPACE.XS,
              }}
              flexDir={'column'}
              py={{
                base: '0',
                lg: SPACE.MD,
              }}
              alignItems={'flex-start'}>
              <Heading fontSize={SIZES.FONT.SM}>
                {productDevelopment?.name}
              </Heading>
              <HStack>
                <Text variant={'bodyBold'}>{production?.vendorName}</Text>
                {production && sourcedProduction?.sourcingCompanyCode && (
                  <>{' - '}</>
                )}
                <Text>{sourcedProduction?.sourcingCompanyCode}</Text>
              </HStack>
              <HStack gap={SPACE.SM}>
                <Text>
                  {productDevelopment?.no && (
                    <Link
                      as={NavLink}
                      to={`/product-development/${productDevelopment?.no}`}
                      onClick={() => close()}>
                      #{productDevelopment?.no}
                    </Link>
                  )}
                </Text>
                <StatusBadge status={productDevelopment?.status} />
              </HStack>
            </VStack>
          </HStack>
        </GridItem>
        <GridItem
          py={{
            base: SPACE.XXS,
            md: SPACE.SM,
            lg: SPACE.MD,
          }}
          display={'flex'}
          flexDir={'column'}
          gap={{
            base: SPACE.XXS,
            md: SPACE.XS,
          }}
          alignItems={'flex-start'}
          colSpan={{
            base: 1,
            md: 3,
            lg: 4,
          }}>
          <Text>{productDevelopment?.client}</Text>
          <Text>{productDevelopment?.project}</Text>
        </GridItem>
        <GridItem
          colSpan={{
            base: 1,
            md: 10,
            lg: 3,
          }}>
          {actionBar}
        </GridItem>
      </Grid>
    </Box>
  );
};

export default ProductDevelopmentModalTopSection;
