import { Box, Grid, GridItem, HStack, Heading, Text } from '@chakra-ui/layout';
import { COLORS, GRID, SIZES, SPACE } from '../../../theme/Constants';
import { Image, VStack } from '@chakra-ui/react';
import TRANSITION from '../../../theme/Constants/transition';
import { useTranslation } from 'react-i18next';
import ActionBarEditProduction from './ActionBarEditProduction';
import StatusBadge from '../../../components/Status/StatusBadge';
import { Status } from '../../../app/generate';

type Props = {
  productNo: string;
};
const EditProductionTopSection = ({ productNo }: Props) => {
  const { t } = useTranslation();

  //TODO remove hard coded status
  const status = Status.NEW;

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
            lg: 4,
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
            <Image
              width={'40'}
              height={'40'}
              objectFit={'cover'}
              src="https://static-cdn.sr.se/images/99/83d9ce09-41ea-4197-951e-48e2c17a7c81.jpg"
            />
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
                Lorem ipsum dolor sit ametets
              </Heading>
              <HStack gap={SPACE.SM}>
                <Text variant={'bodyBold'}>Woven Label Text</Text>
                <Text>NEA</Text>
              </HStack>
              <HStack gap={SPACE.SM}>
                <StatusBadge status={status as Status} />
                <Text>
                  {'#'}
                  {productNo}
                </Text>
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
          <Text>Athletique Recreation Club Limited dolor sit amett</Text>
          <Box zIndex={8} width={'100%'}>
            {t('PD.Project')}
          </Box>
        </GridItem>
        <GridItem
          colSpan={{
            base: 1,
            md: 10,
            lg: 4,
          }}>
          <ActionBarEditProduction />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default EditProductionTopSection;
