import { Text } from '@chakra-ui/layout';
import { SIZES } from '../../theme/Constants';
import { Button } from '@chakra-ui/button';
import { useTranslation } from 'react-i18next';
import { MenuItem, MenuList } from '@chakra-ui/menu';
import ActionBarTemplate from '../../components/ActionBar/ActionBarTemplate';
import { MediaFileDto } from '../../app/generate';
import { useDeleteCalculation } from '../../app/api/calculation';

type Props = {
  artwork?: MediaFileDto;
  createNew?: boolean;
  disableEdit?: boolean;
  lastModified?: string;
  id: string;
  setShowChanges: (showChanges: boolean) => void;
  showChanges: boolean;
};

const PriceCalculationActionBar = ({
  artwork,
  createNew,
  disableEdit = false,
  lastModified,
  id,
  setShowChanges,
  showChanges,
}: Props) => {
  const { t } = useTranslation();

  const { mutate: deleteCalculation } = useDeleteCalculation(id);

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
                <Text
                  as={'i'}
                  fontSize={SIZES.ICON.MD}
                  className="ri-history-line"
                />
              }>
              {showChanges ? t('PD.HideChanges') : t('PD.ShowChanges')}
            </MenuItem>
            {!disableEdit && (
              <MenuItem
                onClick={() => deleteCalculation()}
                icon={
                  <Text
                    as={'i'}
                    fontSize={SIZES.ICON.MD}
                    className="ri-delete-bin-line"
                  />
                }>
                {t('Common.Remove')}
              </MenuItem>
            )}
          </MenuList>
        ) : undefined
      }
      actionButtons={
        <Button variant={'primary'} type="submit">
          {createNew ? t('PriceCalc.CreateCalculation') : t('Common.Save')}
        </Button>
      }
    />
  );
};

export default PriceCalculationActionBar;
