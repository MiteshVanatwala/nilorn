import { Text } from '@chakra-ui/layout';
import { COLORS, SIZES, SPACE } from '../../../theme/Constants';
import { Button, ButtonGroup, IconButton } from '@chakra-ui/button';
import { useTranslation } from 'react-i18next';
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu';
import { useFormContext } from 'react-hook-form';
import {
  MediaFileDto,
  ProductionDto,
  Role,
  Status,
} from '../../../app/generate';
import { useContext, useEffect } from 'react';
import {
  useCreateProduction,
  usePatchProduction,
} from '../../../app/api/editProduction';
import { ModalContext } from '../../../app/context/ModalContext';
import { isClosed } from '../../../app/utils/status';
import ActionBarTemplate from '../../../components/ActionBar/ActionBarTemplate';
import { useCurrentUser } from '../../../app/api/User';
import { NavLink } from 'react-router-dom';
import { NAV_LINK } from '../../../app/hooks/useModalNavigationBlocker';

type Props = {
  setShowChanges: (showChanges: boolean) => void;
  showChanges: boolean;
  artwork?: MediaFileDto;
  createNew?: boolean;
  disableEdit?: boolean;
  production?: ProductionDto;
  status?: Status;
  productDevelopmentNo?: string | null;
  handleDelete?: () => void;
};

const ActionBarEditProduction = ({
  artwork,
  createNew,
  disableEdit = false,
  production,
  status,
  setShowChanges,
  showChanges,
  productDevelopmentNo,
  handleDelete,
}: Props) => {
  const { t } = useTranslation();
  const { getValues, setValue } = useFormContext();
  const { close } = useContext(ModalContext);
  const { data: user } = useCurrentUser();
  const showCalculationLink =
    user?.role !== Role.PRODUCT_DEVELOPER &&
    !!production?.released &&
    !!productDevelopmentNo;

  const { mutate: updateProduction, isSuccess: isSuccessPatch } =
    usePatchProduction();
  const { mutate: createProduction, isSuccess: isSuccessCreate } =
    useCreateProduction();

  function handleSaveAndRelease() {
    setValue('released', true);
    if (createNew) {
      createProduction(getValues());
    } else {
      updateProduction(getValues());
    }
  }

  useEffect(() => {
    if (isSuccessPatch || isSuccessCreate) {
      close();
    }
  }, [close, isSuccessPatch, isSuccessCreate]);

  return (
    <ActionBarTemplate
      artwork={artwork}
      lastModifiedDate={production?.lastModified}
      moreMenuList={
        !createNew ? (
          <MenuList>
            <MenuItem
              onClick={() => {
                setShowChanges(!showChanges);
              }}
              icon={
                <Text
                  as={'i'}
                  fontSize={SIZES.ICON.MD}
                  className="ri-history-line"
                />
              }>
              {showChanges ? t('PD.HideChanges') : t('PD.ShowChanges')}
            </MenuItem>
            {showCalculationLink && (
              <MenuItem
                as={NavLink}
                to={`/price-calculations?productDevelopments=${productDevelopmentNo}`}
                state={NAV_LINK}
                icon={
                  <Text
                    as={'i'}
                    fontSize={SIZES.ICON.MD}
                    className="ri-calculator-line"
                  />
                }>
                {t('PD.ViewCalculation')}
              </MenuItem>
            )}
            {!disableEdit && status && !isClosed(status) && handleDelete && (
              <MenuItem
                onClick={handleDelete}
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
        <ButtonGroup isAttached variant="primary">
          {status && !isClosed(status) && (
            <>
              <Button type="submit">
                {createNew
                  ? t('Production.CreateProduction')
                  : t('Common.Save')}
              </Button>
              <>
                {!disableEdit && (
                  <Menu>
                    <MenuButton
                      as={IconButton}
                      padding={SPACE.SM}
                      aria-label={t('Common.MoreOptions')}
                      borderLeft={`1px solid ${COLORS.WHITE}`}
                      icon={<Text as={'i'} className="ri-arrow-down-s-line" />}
                    />
                    <MenuList>
                      <MenuItem onClick={() => handleSaveAndRelease()}>
                        {createNew
                          ? t('Production.CreateAndRelease')
                          : t('Production.SaveAndRelease')}
                      </MenuItem>
                    </MenuList>
                  </Menu>
                )}
              </>
            </>
          )}
        </ButtonGroup>
      }
    />
  );
};

export default ActionBarEditProduction;
