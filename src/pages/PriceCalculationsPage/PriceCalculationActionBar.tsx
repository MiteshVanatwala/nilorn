import { Button } from '@chakra-ui/button';
import { MenuItem, MenuList } from '@chakra-ui/menu';
import { useTranslation } from 'react-i18next';
import { MediaFileDto } from '../../app/generate';
import ActionBarTemplate from '../../components/ActionBar/ActionBarTemplate';
import RemixIcon from '../../components/Icon/RemixIcon';
import { SIZES } from '../../theme/Constants';

type Props = {
  artwork?: MediaFileDto;
  createNew?: boolean;
  disableEdit?: boolean;
  lastModified?: string;
  id: string;
  setShowChanges: (showChanges: boolean) => void;
  showChanges: boolean;
  handleDelete?: () => void;
};

const PriceCalculationActionBar = ({
  artwork,
  createNew,
  disableEdit = false,
  lastModified,
  id,
  setShowChanges,
  showChanges,
  handleDelete,
}: Props) => {
  const { t } = useTranslation();

  return (
    <ActionBarTemplate
      artwork={artwork}
      lastModifiedDate={lastModified}
      moreMenuList={
        !createNew ? (
          <MenuList>
            <MenuItem
              onClick={() => setShowChanges(!showChanges)}
              icon={
                <RemixIcon
                  component="Text"
                  icon="HISTORY_LINE"
                  fontSize={SIZES.ICON.MD}
                />
              }>
              {showChanges ? t('PD.HideChanges') : t('PD.ShowChanges')}
            </MenuItem>
            {!disableEdit && handleDelete && (
              <MenuItem
                onClick={handleDelete}
                icon={
                  <RemixIcon
                    component="Text"
                    icon="DELETE_BIN_LINE"
                    fontSize={SIZES.ICON.MD}
                  />
                }>
                {t('Common.Remove')}
              </MenuItem>
            )}
          </MenuList>
        ) : undefined
      }
      actionButtons={
        <Button
          variant={'primary'}
          type="submit"
          rightIcon={
            !createNew ? (
              <RemixIcon component="i" icon="SAVE_LINE" />
            ) : undefined
          }>
          {createNew ? t('PriceCalc.CreateCalculation') : t('Common.Save')}
        </Button>
      }
    />
  );
};

export default PriceCalculationActionBar;
