import { Box, Text, Tooltip } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
// import { useInMemoryOrder } from '../../app/hooks/useInMemoryOrder';
import { SIZES } from '../../theme/Constants';
import HeaderLink from './HeaderLink';
import React from 'react';

const HeaderOrderLink = () => {
  const { t } = useTranslation();
  // const inMemoryOrder = useInMemoryOrder();

  const { tooltip, icon, path } = useMemo(() => {
    // if (inMemoryOrder?.status === 'current') {
    //   return {
    //     tooltip: t('Order.GoToCurrentOrderLink'),
    //     icon: 'ri-shopping-cart-line',
    //     path: '/orders/order/' + inMemoryOrder?.webOrderId,
    //   };
    // } else if (inMemoryOrder?.status === 'unfinished') {
    //   return {
    //     tooltip: t('Order.RecoverUnfinishedLink'),
    //     icon: 'ri-device-recover-line',
    //     path: '/orders/order/' + inMemoryOrder?.webOrderId,
    //   };
    // }
    // return {
    //   tooltip: t('Order.CreateOrderLink'),
    //   icon: 'ri-add-line',
    //   path: '/orders/order',
    // };
    return {
      tooltip: t('Order.GoToCurrentOrderLink'),
      icon: 'ri-shopping-cart-line',
      path: '/orders/order/',
    };
    // }, [inMemoryOrder, t]);
  }, []);

  return (
    <Tooltip label={tooltip}>
      <Box as={'span'}>
        <HeaderLink
          path={path}
          title={
            <Text
              as={'i'}
              fontSize={SIZES.ICON.MD}
              fontWeight={100}
              className={icon}></Text>
          }
        />
      </Box>
    </Tooltip>
  );
};

export default HeaderOrderLink;
