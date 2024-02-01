import { Text } from '@chakra-ui/layout';
import { SIZES } from '../../theme/Constants';
import { Button } from '@chakra-ui/button';
import { useTranslation } from 'react-i18next';
import { MenuItem, MenuList } from '@chakra-ui/menu';
import ActionBarTemplate from '../../components/ActionBar/ActionBarTemplate';
import { useToggleChangelog } from '../../app/hooks/useChangelog';
import { ChangelogType } from '../../app/generate';
import { useDeleteCalculation } from '../../app/api/calculation';

type Props = {
  artwork?: string | null;
  createNew?: boolean;
  disableEdit?: boolean;
  lastModified?: string;
  id: string;
};

const PriceCalculationActionBar = ({
  artwork,
  createNew,
  disableEdit = false,
  lastModified,
  id,
}: Props) => {
  const { t } = useTranslation();
  const { showChanges, setShowChanges } = useToggleChangelog(
    ChangelogType.PRICE_CALCULATION,
    undefined,
    id
  );

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
