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
  handleAddPriceCalculation?: () => void;
  handleEditPriceCalculation?: () => void;
  enableEditCalculation: boolean;
};

const PriceCalculationPageMenu = ({
  disabled = false,
  handleExportClick,
  enableEditCalculation = false,
  handleAddPriceCalculation = () => {},
  handleEditPriceCalculation = () => {},
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
      />

      <MenuList lineHeight={1.5} zIndex={9}>
        <MenuItem
          onClick={handleAddPriceCalculation}
          icon={
            <RemixIcon
              component="Text"
              fontSize={SIZES.ICON.MD}
              icon={'ADD_LINE'}
            />
          }>
          {t('PriceCalc.AddCalculation')}
        </MenuItem>
        <MenuItem
          onClick={handleEditPriceCalculation}
          icon={
            <RemixIcon
              component="Text"
              fontSize={SIZES.ICON.MD}
              icon={'EDIT_LINE'}
            />
          }
          isDisabled={enableEditCalculation}>
          {t('PriceCalc.EditCalculation')}
        </MenuItem>
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
