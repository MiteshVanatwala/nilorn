import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { COLORS, SIZES, SPACE } from '../../theme/Constants';
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
        isDisabled={disabled}
      />

      <MenuList lineHeight={1.5} zIndex={9}>
        <MenuItem
          onClick={handleExportClick}
          icon={
            <RemixIcon
              component="Text"
              icon="DOWNLOAD_LINE"
              fontSize={SIZES.ICON.MD}
            />
          }
          isDisabled={disabled}>
          {t('ExcelExport.Menu')}
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default PriceCalculationPageMenu;
