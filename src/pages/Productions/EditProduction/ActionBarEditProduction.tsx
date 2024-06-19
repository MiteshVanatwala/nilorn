import { Button, ButtonGroup, IconButton } from '@chakra-ui/button';
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu';
import { useContext, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { useCurrentUser } from '../../../app/api/User';
import {
  useCreateProduction,
  usePatchProduction,
  useReleaseForSales,
} from '../../../app/api/editProduction';
import { ModalContext } from '../../../app/context/ModalContext';
import {
  MediaFileDto,
  ProductionDto,
  Role,
  Status,
} from '../../../app/generate';
import { NAV_LINK } from '../../../app/hooks/useModalNavigationBlocker';
import { isClosed } from '../../../app/utils/status';
import ActionBarTemplate from '../../../components/ActionBar/ActionBarTemplate';
import RemixIcon from '../../../components/Icon/RemixIcon';
import { COLORS, SIZES, SPACE } from '../../../theme/Constants';

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

  const { mutate: removeFromSales } = useReleaseForSales(
    production ? production?.id?.toString() : undefined,
    false
  );

  function removeFromSalesFunc() {
    removeFromSales();
  }

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
                <RemixIcon
                  component="Text"
                  icon="HISTORY_LINE"
                  fontSize={SIZES.ICON.MD}
                />
              }>
              {showChanges ? t('PD.HideChanges') : t('PD.ShowChanges')}
            </MenuItem>
            {status &&
              !isClosed(status) &&
              !!production?.released &&
              !!production?.vendorId && (
                <MenuItem
                  onClick={removeFromSalesFunc}
                  icon={
                    <RemixIcon
                      component="Text"
                      icon="TOGGLE_LINE"
                      fontSize={SIZES.ICON.MD}
                    />
                  }>
                  {t('Production.Remove')}
                </MenuItem>
              )}
            {showCalculationLink && (
              <MenuItem
                as={NavLink}
                to={`/price-calculations?productDevelopments=${productDevelopmentNo}`}
                state={NAV_LINK}
                icon={
                  <RemixIcon
                    component="Text"
                    icon="CALCULATOR_LINE"
                    fontSize={SIZES.ICON.MD}
                  />
                }>
                {t('PD.ViewCalculation')}
              </MenuItem>
            )}
            {!disableEdit && status && !isClosed(status) && handleDelete && (
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
        <ButtonGroup isAttached variant="primary">
          {status && !isClosed(status) && (
            <>
              <Button
                type="submit"
                rightIcon={
                  !createNew ? (
                    <RemixIcon component="i" icon="SAVE_LINE" />
                  ) : undefined
                }>
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
                      icon={
                        <RemixIcon component="Text" icon="ARROW_DOWN_S_LINE" />
                      }
                    />
                    <MenuList>
                      <MenuItem
                        onClick={() => handleSaveAndRelease()}
                        icon={
                          <RemixIcon
                            component="Text"
                            icon="TOGGLE_LINE"
                            fontSize={SIZES.ICON.MD}
                          />
                        }>
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
