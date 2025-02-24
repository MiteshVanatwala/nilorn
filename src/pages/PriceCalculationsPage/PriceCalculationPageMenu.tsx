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

type Props = {
  disabled: boolean;
  handleExportClick: () => void;
};

const PriceCalculationPageMenu = ({
  disabled = false,
  handleExportClick,
}: Props) => {
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
        mb={5}
        disabled={disabled}
      />

      <MenuList bg={COLORS.GRAY[5]} border="none" minW={'20rem'} zIndex={9}>
        <MenuItem onClick={handleExportClick}>
          {t('PriceCalc.ExportSelected')}
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default PriceCalculationPageMenu;
