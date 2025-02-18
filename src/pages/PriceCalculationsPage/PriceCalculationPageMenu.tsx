import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { COLORS, SPACE } from '../../theme/Constants';
import RemixIcon from '../../components/Icon/RemixIcon';

const PriceCalculationPageMenu = () => {
  const { t } = useTranslation();

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        variant={'secondary'}
        padding={SPACE.SM}
        aria-label={t('Common.More')}
        icon={
          <RemixIcon component="Text" icon="MORE_LINE" color={COLORS.WHITE} />
        }
        zIndex={50}
      />

      <MenuList bg={COLORS.GRAY[5]} border="none" minW={'20rem'}>
        <MenuItem onClick={() => {}} icon={<></>}>
          {t('PriceCalc.ExportSelected')}
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default PriceCalculationPageMenu;
