import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  HStack,
  Heading,
  Image,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { images } from '../../assets/';
import COLORS from '../../theme/Constants/colors';
import SIZES from '../../theme/Constants/sizes';
import HeaderDivider from './HeaderDivider';
import HeaderLink from './HeaderLink';
import UserMenu from './UserMenu';
import { GRID } from '../../theme/Constants';
import { useAuthorized } from '../../app/Permissions/usePremissions';

const NavigationHeader = () => {
  const { t } = useTranslation();

  const showProduction = useAuthorized('production');
  const showCalculation = useAuthorized('calculation');

  return (
    <Container
      centerContent
      width={'100%'}
      maxW={'100%'}
      bgColor={COLORS.GRAY[5]}
      zIndex={99}>
      <Box maxW={SIZES.CONTAINER.XL} w={'100%'}>
        <Grid
          templateColumns={{
            base: GRID.TEMPLATE_COLUMNS.base,
            lg: GRID.TEMPLATE_COLUMNS.sm,
            md: GRID.TEMPLATE_COLUMNS.md,
          }}>
          <GridItem
            borderBottom={{ base: `solid 1px ${COLORS.GRAY[30]}`, lg: 'none' }}>
            <Flex alignItems="center">
              <HStack m={0}>
                <Box as={NavLink} to={'/'} width={'auto'} height="6.9rem">
                  <Image
                    src={images.logo}
                    height="6.9rem"
                    width="auto"
                    min-width={'100% !important'}
                  />
                </Box>
              </HStack>
              <HStack m={0} divider={<HeaderDivider />}>
                <HeaderLink
                  title={<Heading variant={'h5'}>{t('Common.Title')}</Heading>}
                  path={'/'}
                />
                {showProduction && (
                  <HeaderLink
                    title={t('Menu.HypProduction')}
                    path="/productions"
                  />
                )}
                {showCalculation && (
                  <HeaderLink
                    title={t('Menu.HypPrice')}
                    path="/price-calculations"
                  />
                )}
              </HStack>
              <HeaderDivider />
            </Flex>
          </GridItem>
          <GridItem>
            <HStack m={0} justifyContent={'end'} divider={<HeaderDivider />}>
              <UserMenu />
            </HStack>
          </GridItem>
        </Grid>
      </Box>
    </Container>
  );
};

export default NavigationHeader;
