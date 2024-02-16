import { Text, Box } from '@chakra-ui/layout';
import { COLORS, SIZES, SPACE } from '../../../../theme/Constants';
import { Button } from '@chakra-ui/button';
import { useTranslation } from 'react-i18next';
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu';
import { useFormContext, useWatch } from 'react-hook-form';
import { useStatusOptions } from '../../../../app/hooks/useStatus';
import { useUpdateProductDevelopmentWithStatus } from '../../../../app/api/productDevelopment';
import { ChangelogType, Status } from '../../../../app/generate';
import { useToggleChangelog } from '../../../../app/hooks/useChangelog';
import { useModal } from '../../../../app/hooks/useModal';
import ConfirmModal from '../../../../components/Modal/ConfirmModal';
import { useToast } from '../../../../app/hooks/useToast';
import ActionBarTemplate from '../../../../components/ActionBar/ActionBarTemplate';
import { useCurrentUser } from '../../../../app/api/User';
import { ROLES_ALLOWED_TO_CHANGE_CLOSED } from '../../../../app/Permissions/Permissions';
import { useUnsavedChanges } from '../../../../app/hooks/useUnsavedChanges';
import { NavLink } from 'react-router-dom';
type Props = {
  no: string;
  createNew?: boolean;
  disableEdit: boolean;
  hasPriceCalculation: boolean;
  hasProductions: boolean;
};
const ActionBar = ({
  createNew,
  no,
  disableEdit,
  hasPriceCalculation,
  hasProductions,
}: Props) => {
  const { t } = useTranslation();
  const artwork = useWatch({ name: 'artwork' });
  const { getValues, formState, trigger, register } = useFormContext();
  const { statuses } = useStatusOptions();
  const currentStatus = useWatch({ name: 'status' }) as Status;
  const { mutate: updateStatus } = useUpdateProductDevelopmentWithStatus(no);
  const { showToast } = useToast();
  const { data: user } = useCurrentUser();
  const { handleModal } = useModal();
  const { onLeavePage } = useUnsavedChanges();

  async function submitStatus(newStatus: Status): Promise<void> {
    if (currentStatus === newStatus) {
      return;
    }
    if (formState.isDirty) {
      showToast({
        status: 'info',
        description: t('PD.Feedback.Info.NeedToSave'),
      });
      return;
    }
    if (newStatus === Status.NEW) {
      updateStatus(newStatus);
    } else {
      if (currentStatus === Status.NEW) {
        register('itemCategoryCode', {
          required: true,
        });
        register('productGroupCode', {
          required: true,
        });
      }
      const res = await trigger();
      if (res) {
        updateStatus(newStatus);
      }
    }
  }
  const { showChanges, setShowChanges } = useToggleChangelog(
    ChangelogType.PRODUCT_DEVELOPMENT,
    no,
    undefined
  );
  function deleteProductDevelopment() {
    updateStatus(Status.DELETED);
  }
  return (
    <ActionBarTemplate
      artwork={artwork}
      lastModifiedDate={formState?.defaultValues?.lastModified}
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
                onClick={() =>
                  handleModal(
                    <ConfirmModal
                      title={t('PD.DeleteTitle')}
                      description={t('PD.DeleteComfirm', { no: no })}
                      confirmType="DELETE"
                      onConfirm={() => deleteProductDevelopment()}
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
                {t('Common.Delete')}
              </MenuItem>
            )}
            {hasProductions && (
              <MenuItem
                as={NavLink}
                onClick={() =>
                  onLeavePage(
                    `/productions/?productDevelopments=${no}&pageSize=25&pageNumber=1`
                  )
                }
                icon={
                  <Text
                    as={'i'}
                    fontSize={SIZES.ICON.MD}
                    className="ri-arrow-left-right-line"
                  />
                }>
                {t('PD.EditCompareProduction')}
              </MenuItem>
            )}
            {hasPriceCalculation && (
              <MenuItem
                as={NavLink}
                onClick={() =>
                  onLeavePage(
                    `/price-calculations/?productDevelopments=${no}&pageSize=25&pageNumber=1`
                  )
                }
                icon={
                  <Text
                    as={'i'}
                    fontSize={SIZES.ICON.MD}
                    className="ri-line-chart-line"
                  />
                }>
                {t('PD.EditCompareCalculation')}
              </MenuItem>
            )}
          </MenuList>
        ) : undefined
      }
      actionButtons={
        !createNew ? (
          <>
            <Menu>
              <MenuButton
                opacity={
                  disableEdit &&
                  user?.role &&
                  !ROLES_ALLOWED_TO_CHANGE_CLOSED.includes(user?.role)
                    ? '70%'
                    : ''
                }
                as={Button}
                variant={'secondary'}
                padding={SPACE.SM}>
                {currentStatus} <i className="ri-arrow-down-s-line" />
              </MenuButton>
              <MenuList>
                {statuses.map(s => (
                  <MenuItem
                    key={s.value}
                    value={s.value}
                    onClick={() =>
                      !disableEdit ||
                      (user?.role &&
                        ROLES_ALLOWED_TO_CHANGE_CLOSED.includes(user?.role))
                        ? submitStatus(s.value)
                        : ''
                    }
                    bg={
                      getValues('status') === s.value
                        ? COLORS.GRAY[10]
                        : 'transparent'
                    }
                    autoFocus={s.value === 'Design'}
                    icon={
                      <Box
                        w={'6px'}
                        h={'6px'}
                        borderRadius={'2px'}
                        bg={s.color}></Box>
                    }>
                    {s.label}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
            <Button variant={'primary'} isDisabled={disableEdit} type="submit">
              {t('Common.Save')}
            </Button>
          </>
        ) : (
          <Button variant="primary" type="submit">
            {t('PD.CreateNew')}
          </Button>
        )
      }
    />
  );
};
export default ActionBar;
