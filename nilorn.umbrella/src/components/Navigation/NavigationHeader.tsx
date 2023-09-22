import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  HStack,
  Image,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { images } from '../../assets/';
import COLORS from '../../theme/Constants/colors';
import SIZES from '../../theme/Constants/sizes';
// import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
// import ClientSwitcher from '../User/ClientSwitcher';
// import UserMenu from '../User/UserMenu';
import HeaderDivider from './HeaderDivider';
import HeaderLink from './HeaderLink';
import HeaderOrderLink from './HeaderOrderLink';
import React from 'react';

const NavigationHeader = () => {
  const { t } = useTranslation();
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
            base: '1fr',
            lg: 'repeat(2, 1fr)',
            md: 'repeat(1, 1fr)',
          }}>
          <GridItem
            borderBottom={{ base: `solid 1px ${COLORS.GRAY[30]}`, lg: 'none' }}>
            <Flex alignItems="center">
              <Box as={NavLink} to={'/'} minWidth={'7.8rem'} height="6.9rem">
                <Image
                  src={images.logo}
                  height="6.9rem"
                  width="auto"
                  min-width={'100% !important'}
                />
              </Box>
              <HStack m={0} divider={<HeaderDivider />}>
                <HeaderLink title={t('Menu.hyphome')} path="/" />
                <HeaderLink title={t('Menu.hypproducts')} path="/products" />
                {/* <HeaderLink
                  title={t('Menu.hypordertracking')}
                  path="/order-tracking"
                />
                <HeaderLink title={t('Menu.hypreports')} path="/reports" />
                <HeaderLink title={t('Menu.hyphelp')} path="/help" /> */}
              </HStack>
              <HeaderDivider />
            </Flex>
          </GridItem>
          <GridItem>
            <HStack m={0} justifyContent={'end'} divider={<HeaderDivider />}>
              <HeaderOrderLink />
              {/* <UserMenu />
              <LanguageSwitcher />
              <ClientSwitcher /> */}
            </HStack>
          </GridItem>
        </Grid>
      </Box>
    </Container>
  );
};

export default NavigationHeader;
