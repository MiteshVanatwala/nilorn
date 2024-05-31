import {
  Box,
  Center,
  Container,
  Flex,
  Grid,
  GridItem,
  HStack,
  Image,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import COLORS from '../../theme/Constants/colors';
import SIZES from '../../theme/Constants/sizes';
import HeaderDivider from './HeaderDivider';
import UserMenu from './UserMenu';
import { GRID, SPACE } from '../../theme/Constants';
import { useAuthorizedSee } from '../../app/Permissions/usePremissions';
import HeaderLink from './HeaderLink';
import { SESSION_STORAGE } from '../../app/utils/constant';
import logoSvg from '../../assets/svgs/logo.svg';

const NavigationHeader = () => {
  const { t } = useTranslation();

  const showProduction = useAuthorizedSee('production');
  const showCalculation = useAuthorizedSee('calculation');

  return (
    <Container
      centerContent
      width={'100%'}
      maxW={'100%'}
      zIndex={99}
      borderBottom={`1px solid ${COLORS.GRAY[40]}`}
      p={0}>
      <Box maxW={SIZES.CONTAINER.XL} w={'100%'}>
        <Grid
          templateColumns={{
            base: GRID.TEMPLATE_COLUMNS.base,
            md: GRID.TEMPLATE_COLUMNS.sm,
            sm: GRID.TEMPLATE_COLUMNS.md,
          }}>
          <GridItem
            borderBottom={{ base: `solid 1px ${COLORS.GRAY[40]}`, md: 'none' }}>
            <Flex alignItems="center">
              <HStack m={0}>
                <HeaderLink
                  variant="logo"
                  title={
                    <Center
                      height="6.9rem"
                      w={'max-content'}
                      pr={SPACE.XL}
                      pl={SPACE.LG}>
                      <Image
                        src={logoSvg}
                        height={'3.9rem'}
                        pb={'0.6rem'}
                        width="auto"
                        min-width={'100% !important'}
                      />
                    </Center>
                  }
                  path="/"
                  clickedStoredFilter={SESSION_STORAGE.PREV_FILTER_OVERVIEW}
                />
              </HStack>
              <HeaderDivider />
              <HStack m={0} divider={<HeaderDivider />}>
                <HeaderLink
                  title={t('Common.Title')}
                  path="/"
                  clickedStoredFilter={SESSION_STORAGE.PREV_FILTER_OVERVIEW}
                />
                {showProduction && (
                  <HeaderLink
                    title={t('Menu.HypProduction')}
                    path="/productions"
                    clickedStoredFilter={
                      SESSION_STORAGE.PREV_FILTER_PRODUCTIONS
                    }
                  />
                )}
                {showCalculation && (
                  <HeaderLink
                    title={t('Menu.HypPrice')}
                    path="/price-calculations"
                    clickedStoredFilter={
                      SESSION_STORAGE.PREV_FILTER_CALCULATION
                    }
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
