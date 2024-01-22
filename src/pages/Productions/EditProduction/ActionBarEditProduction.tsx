import { Text } from '@chakra-ui/layout';
import { COLORS, SIZES, SPACE } from '../../../theme/Constants';
import { Button, ButtonGroup, IconButton } from '@chakra-ui/button';
import { useTranslation } from 'react-i18next';
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu';
import { useFormContext } from 'react-hook-form';
import { ProductionDto, Status } from '../../../app/generate';
import { useContext, useEffect } from 'react';
import {
  useCreateProduction,
  useDeleteProduction,
  usePatchProduction,
} from '../../../app/api/editProduction';
import { ModalContext } from '../../../app/context/ModalContext';
import { isClosed } from '../../../app/utils/status';
import ActionBarTemplate from '../../../components/ActionBar/ActionBarTemplate';

type Props = {
  artwork?: string | null;
  createNew?: boolean;
  disableEdit?: boolean;
  production?: ProductionDto;
  status?: Status;
};

const ActionBarEditProduction = ({
  artwork,
  createNew,
  disableEdit = false,
  production,
  status,
}: Props) => {
  const { t } = useTranslation();
  const { getValues, setValue } = useFormContext();
  const { close } = useContext(ModalContext);

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
              icon={
                <Text
                  as={'i'}
                  fontSize={SIZES.ICON.MD}
                  className="ri-history-line"
                />
              }>
              {t('PD.ShowChanges')}
            </MenuItem>
            {!disableEdit && status && !isClosed(status) && (
              <MenuItem
                onClick={() => deleteProductionFunc()}
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
