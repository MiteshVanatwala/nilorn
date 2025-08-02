import { Box, Grid, GridItem, HStack, Heading } from '@chakra-ui/layout';
import { COLORS, GRID, SIZES, SPACE } from '../../theme/Constants';
import { Image, Link, VStack, Text, Tooltip } from '@chakra-ui/react';
import TRANSITION from '../../theme/Constants/transition';
import StatusBadge from '../../components/Status/StatusBadge';
import { NavLink, useLocation } from 'react-router-dom';
import { ProductDevelopmentDataDto } from '../../app/generate';
import useFilterOptions from '../../app/hooks/useFilterOption';
import { NAV_LINK } from '../../app/hooks/useModalNavigationBlocker';
import { isClosed } from '../../app/utils/status';
import text from '../../theme/text';
import useStoreFilterAndNavigate from '../../app/hooks/useStoreFilterAndNavigate';
import { useTranslation } from 'react-i18next';

type Props = {
  productDevelopment?: ProductDevelopmentDataDto;
  sourcingCompanyCode?: string | null;
  vendorName?: string | null;
  actionBar: JSX.Element;
  isBulkEdit?: boolean;
  totalPriceCalculations?: number;
};
const ProductDevelopmentModalTopSection = ({
  productDevelopment,
  sourcingCompanyCode,
  vendorName,
  actionBar,
  isBulkEdit = false,
  totalPriceCalculations = 0,
}: Props) => {
  const { t } = useTranslation();
  const location = useLocation();
  const vendorOptions = useFilterOptions('vendors');

  const { storeFilter, storeBackLink } = useStoreFilterAndNavigate();

  const handleClick = () => {
    storeBackLink();
    storeFilter();
  };

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
          {!isBulkEdit && (
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
                  {location.pathname.includes('productions') ? (
                    <Text>{vendorName}</Text>
                  ) : (
                    <Link
                      as={NavLink}
                      state={NAV_LINK}
                      onClick={handleClick}
                      to={`/productions?vendors=${
                        vendorOptions.find(
                          option => option.label === vendorName
                        )?.value
                      }&productDevelopments=${productDevelopment?.no}${
                        isClosed(productDevelopment?.status!)
                          ? `&statuses=${productDevelopment?.status}`
                          : ''
                      }`}
                      fontWeight={text.variants.bodyRegular.fontWeight}>
                      {vendorName}
                    </Link>
                  )}
                  {vendorName && sourcingCompanyCode && <>{' - '}</>}
                  <Text>{sourcingCompanyCode}</Text>
                </HStack>
                <HStack gap={SPACE.SM}>
                  <Text>
                    {productDevelopment?.no && (
                      <Link
                        as={NavLink}
                        state={NAV_LINK}
                        onClick={handleClick}
                        to={`/product-development/${productDevelopment?.no}`}
                        fontWeight={text.variants.bodyRegular.fontWeight}>
                        {productDevelopment?.no}
                      </Link>
                    )}
                  </Text>
                  <StatusBadge status={productDevelopment?.status} />
                </HStack>
              </VStack>
            </HStack>
          )}
          {totalPriceCalculations > 1 && (
            <Text mb={1} fontWeight={'bold'}>
              {totalPriceCalculations} {t('PriceCalc.selectedRowsArray')}
            </Text>
          )}
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
          {!isBulkEdit && (
            <>
              <Text>
                {productDevelopment?.clientName}{' '}
                {productDevelopment?.clientRequirement && (
                  <Tooltip
                    label={
                      <Box
                        dangerouslySetInnerHTML={{
                          __html: productDevelopment?.clientRequirement,
                        }}
                      />
                    }
                    placement="right-start">
                    <Text as="span" color="red" cursor="pointer" ml="1">
                      <i className="ri-information-line"></i>
                    </Text>
                  </Tooltip>
                )}
              </Text>
              <Text minH={'22px'}>{productDevelopment?.projectCode}</Text>
              <Text>{productDevelopment?.versionSpecification}</Text>
            </>
          )}
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
