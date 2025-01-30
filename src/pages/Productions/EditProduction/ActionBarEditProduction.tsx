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
import { useToast } from '../../../app/hooks/useToast';
import useFilterOptions from '../../../app/hooks/useFilterOption';

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
  isDirty?: boolean;
  submitForm: () => void;
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
  isDirty = false,
  submitForm,
}: Props) => {
  const { t } = useTranslation();
  const { setValue } = useFormContext();
  const { showToast } = useToast();
  const { close } = useContext(ModalContext);
  const { data: user } = useCurrentUser();
  const vendorOptions = useFilterOptions('vendors');
  const showCalculationLink =
    user?.role !== Role.PRODUCT_DEVELOPER &&
    !!production?.released &&
    !!productDevelopmentNo;

  const { isSuccess: isSuccessPatch } = usePatchProduction();
  const { isSuccess: isSuccessCreate } = useCreateProduction();

  function handleSaveAndRelease() {
    setValue('released', true);
    submitForm();
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
    if (isDirty) {
      showToast({
        status: 'error',
        description: t('PD.UnsavedProductionChanges'),
      });
    } else removeFromSales();
  }

  function toggleShowChanges() {
    setShowChanges(!showChanges);
  }

  return (
    <ActionBarTemplate
      artwork={artwork}
      lastModifiedDate={production?.lastModified}
      moreMenuList={
        !createNew ? (
          <MenuList>
            <MenuItem
              onClick={toggleShowChanges}
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
                to={`/price-calculations?productDevelopments=${productDevelopmentNo}&vendors=${
                  vendorOptions.find(
                    option => option.label === production.vendorName
                  )?.value
                }${isClosed(status!) ? `&statuses=${status}` : ''}`}
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
                {t('Common.Delete')}
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
                type="button"
                rightIcon={
                  !createNew ? (
                    <RemixIcon component="i" icon="SAVE_LINE" />
                  ) : undefined
                }
                onClick={submitForm}>
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
