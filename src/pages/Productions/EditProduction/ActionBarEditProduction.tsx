import { Text } from '@chakra-ui/layout';
import { COLORS, SIZES, SPACE } from '../../../theme/Constants';
import { Button, ButtonGroup, IconButton } from '@chakra-ui/button';
import { useTranslation } from 'react-i18next';
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu';
import { useFormContext } from 'react-hook-form';
import {
  MediaFileDto,
  ProductDevelopmentBriefDto,
  ProductionDto,
  Role,
  Status,
} from '../../../app/generate';
import { useContext, useEffect } from 'react';
import {
  useCreateProduction,
  useDeleteProduction,
  usePatchProduction,
} from '../../../app/api/editProduction';
import { ModalContext } from '../../../app/context/ModalContext';
import { isClosed } from '../../../app/utils/status';
import ActionBarTemplate from '../../../components/ActionBar/ActionBarTemplate';
import ConfirmModal from '../../../components/Modal/ConfirmModal';
import { useNavigate } from 'react-router';
import { useCurrentUser } from '../../../app/api/User';

type Props = {
  setShowChanges: (showChanges: boolean) => void;
  showChanges: boolean;
  artwork?: MediaFileDto;
  createNew?: boolean;
  disableEdit?: boolean;
  production?: ProductionDto;
  status?: Status;
  productDevelopment?: ProductDevelopmentBriefDto;
};

const ActionBarEditProduction = ({
  artwork,
  createNew,
  disableEdit = false,
  production,
  status,
  setShowChanges,
  showChanges,
  productDevelopment,
}: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { getValues, setValue } = useFormContext();
  const { handleModal, close } = useContext(ModalContext);
  const { data: user } = useCurrentUser();
  const showCalculationLink =
    user?.role !== Role.PRODUCT_DEVELOPER &&
    !!production?.released &&
    !!productDevelopment?.no;

  const { mutate: deleteProduction, isSuccess: isSuccessDelete } =
    useDeleteProduction();

  const { mutate: updateProduction, isSuccess: isSuccessPatch } =
    usePatchProduction();
  const { mutate: createProduction, isSuccess: isSuccessCreate } =
    useCreateProduction();
  function deleteProductionFunc() {
    deleteProduction({ id: production?.id ?? '' });
  }
  function handleSaveAndRelease() {
    setValue('released', true);
    if (createNew) {
      createProduction(getValues());
    } else {
      updateProduction(getValues());
    }
  }
  useEffect(() => {
    if (isSuccessDelete || isSuccessPatch || isSuccessCreate) {
      close();
    }
  }, [close, isSuccessPatch, isSuccessDelete, isSuccessCreate]);

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
                onClick={() => {
                  navigate(
                    `/price-calculations?productDevelopments=${productDevelopment?.no}`
                  );
                }}
                icon={
                  <Text
                    as={'i'}
                    fontSize={SIZES.ICON.MD}
                    className="ri-calculator-line"
                  />
                }>
                {t('Production.ViewCalculation')}
              </MenuItem>
            )}
            {!disableEdit && status && !isClosed(status) && (
              <MenuItem
                onClick={() =>
                  handleModal(
                    <ConfirmModal
                      title={t('PD.DeleteTitle')}
                      description={t('PD.DeleteMsg')}
                      onConfirm={() => deleteProductionFunc()}
                      cancelText={t('Common.No')}
                      confirmText={t('Common.Yes')}
                    />
                  )
                }
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
