import { IconButton, Menu, MenuButton, MenuList, Text } from '@chakra-ui/react';
import { SPACE } from '../../theme/Constants';
import { useTranslation } from 'react-i18next';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const TableMenuPriceContainer = ({ children }: Props) => {
  const { t } = useTranslation();

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        variant={'ghost'}
        padding={SPACE.SM}
        aria-label={t('Common.More')}
        icon={<Text as={'i'} className="ri-more-line" />}
      />
      <MenuList lineHeight={1.5}>
        {/* {isProduction && (
          <TableMenuProduction
            productDevelopment={productDevelopment}
            sourcedProduction={sourcedProduction}
            sourcingCoIndex={sourcingCoIndex}
            production={production}
          />
        )}
        {!isProduction && (
          <TableMenuSourcing
            productDevelopment={productDevelopment}
            sourcedProduction={sourcedProduction}
            sourcingCoIndex={sourcingCoIndex}
          />
        )} */}
        {children}
      </MenuList>
    </Menu>
  );
};

export default TableMenuPriceContainer;
