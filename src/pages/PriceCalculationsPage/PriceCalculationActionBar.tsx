import { Text } from '@chakra-ui/layout';
import { SIZES } from '../../theme/Constants';
import { Button } from '@chakra-ui/button';
import { useTranslation } from 'react-i18next';
import { MenuItem, MenuList } from '@chakra-ui/menu';
import ActionBarTemplate from '../../components/ActionBar/ActionBarTemplate';

type Props = {
  artwork?: string | null;
  createNew?: boolean;
  disableEdit?: boolean;
  lastModified?: string;
};

const PriceCalculationActionBar = ({
  artwork,
  createNew,
  disableEdit = false,
  lastModified,
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
              icon={
                <Text
                  as={'i'}
                  fontSize={SIZES.ICON.MD}
                  className="ri-history-line"
                />
              }>
              {t('PD.ShowChanges')}
            </MenuItem>
            {!disableEdit && (
              <MenuItem
                onClick={() => console.log('Delete')}
                icon={
                  <Text
                    as={'i'}
                    fontSize={SIZES.ICON.MD}
                    className="ri-delete-bin-line"
                  />
                }>
                {t('Common.Delete')}
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
