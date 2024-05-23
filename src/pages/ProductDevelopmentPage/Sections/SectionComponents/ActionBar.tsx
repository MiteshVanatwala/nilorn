import { Button } from '@chakra-ui/button';
import { Box } from '@chakra-ui/layout';
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu';
import { useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import {
  ROLES_ALLOWED_TO_CHANGE_CLOSED,
  ROLES_ALLOWED_TO_CREATE,
} from '../../../../app/Permissions/Permissions';
import { useAuthorizedSee } from '../../../../app/Permissions/usePremissions';
import { useCurrentUser } from '../../../../app/api/User';
import {
  useCreateCopyProductDevelopment,
  useCreateVersionProductDevelopment,
  useUpdateProductDevelopmentWithStatus,
} from '../../../../app/api/productDevelopment';
import { ChangelogType, Status } from '../../../../app/generate';
import { useToggleChangelog } from '../../../../app/hooks/useChangelog';
import { useModal } from '../../../../app/hooks/useModal';
import { useStatusOptions } from '../../../../app/hooks/useStatus';
import { useToast } from '../../../../app/hooks/useToast';
import { useUnsavedChanges } from '../../../../app/hooks/useUnsavedChanges';
import { scrollNameIntoView } from '../../../../app/utils/common';
import ActionBarTemplate from '../../../../components/ActionBar/ActionBarTemplate';
import RemixIcon from '../../../../components/Icon/RemixIcon';
import ConfirmModal from '../../../../components/Modal/ConfirmModal';
import { COLORS, SIZES, SPACE } from '../../../../theme/Constants';

type Props = {
  no: string;
  name: string;
  createNew?: boolean;
  disableEdit: boolean;
  hasPriceCalculation: boolean;
  hasProductions: boolean;
};
const ActionBar = ({
  createNew,
  no,
  name,
  disableEdit,
  hasPriceCalculation,
  hasProductions,
}: Props) => {
  const { t } = useTranslation();
  const showCalculation = useAuthorizedSee('calculation');

  const {
    getValues,
    formState: { errors, defaultValues },
    trigger,
    register,
  } = useFormContext();
  const { hasUnsavedChanges } = useUnsavedChanges();

  const artwork = useWatch({ name: 'artwork' });
  const { statuses } = useStatusOptions();
  const currentStatus = useWatch({ name: 'status' }) as Status;

  const { mutate: updateStatus } = useUpdateProductDevelopmentWithStatus(no);
  const { mutate: copy } = useCreateCopyProductDevelopment(no, name);
  const { mutate: createVersion } = useCreateVersionProductDevelopment(no);
  const { showToast } = useToast();
  const { data: user } = useCurrentUser();
  const { handleModal } = useModal();

  async function submitStatus(newStatus: Status): Promise<void> {
    const errorKeys = Object.keys(errors);
    if (errorKeys?.length) {
      scrollNameIntoView(errorKeys[0]);
      return;
    }
    if (currentStatus === newStatus) {
      return;
    }

    if (hasUnsavedChanges()) {
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
        register('productGroupCode', {
          required: true,
        });
        register('itemCategoryCode', {
          required: true,
        });
      }
      const res = await trigger();
      if (res) {
        updateStatus(newStatus);
        return;
      }
      showToast({
        status: 'error',
        description: t('PD.Feedback.Error.UpdateStatus'),
      });
      return;
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
  async function copyProductDevelopment() {
    copy();
  }
  async function createVersionProductDevelopment() {
    createVersion();
  }
  return (
    <ActionBarTemplate
      artwork={artwork}
      lastModifiedDate={defaultValues?.lastModified}
      moreMenuList={
        !createNew ? (
          <MenuList>
            <MenuItem
              onClick={() => setShowChanges(!showChanges)}
              icon={
                <RemixIcon
                  component="Text"
                  fontSize={SIZES.ICON.MD}
                  icon="HISTORY_LINE"
                />
              }>
              {showChanges ? t('PD.HideChanges') : t('PD.ShowChanges')}
            </MenuItem>
            {user?.role && ROLES_ALLOWED_TO_CREATE.includes(user.role) && (
              <MenuItem
                disabled={true}
                onClick={() =>
                  handleModal(
                    <ConfirmModal
                      title={t('PD.CreateCopyConfirmModal.Title')}
                      description={t('PD.CreateCopyConfirmModal.Description', {
                        no: no,
                      })}
                      confirmType={'PRIMARY'}
                      onConfirm={copyProductDevelopment}
                    />
                  )
                }
                icon={
                  <RemixIcon
                    component="Text"
                    icon="FILE_COPY_LINE"
                    fontSize={SIZES.ICON.MD}
                  />
                }>
                {t('PD.CreateCopy')}
              </MenuItem>
            )}
            {user?.role && ROLES_ALLOWED_TO_CREATE.includes(user.role) && (
              <MenuItem
                disabled={true}
                onClick={() =>
                  handleModal(
                    <ConfirmModal
                      title={t('PD.CreateVersionConfirmModal.Title')}
                      description={t(
                        'PD.CreateVersionConfirmModal.Description',
                        {
                          no: no,
                        }
                      )}
                      confirmType={'PRIMARY'}
                      onConfirm={createVersionProductDevelopment}
                    />
                  )
                }
                icon={
                  <Text
                    as={'i'}
                    fontSize={SIZES.ICON.MD}
                    className="ri-file-copy-line"
                  />
                }>
                {t('PD.CreateVersion')}
              </MenuItem>
            )}
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
                  <RemixIcon
                    component="Text"
                    icon="DELETE_BIN_LINE"
                    fontSize={SIZES.ICON.MD}
                  />
                }>
                {t('Common.Delete')}
              </MenuItem>
            )}
            {hasProductions && (
              <MenuItem
                as={NavLink}
                to={`/productions?productDevelopments=${no}&pageSize=25&pageNumber=1`}
                icon={
                  <RemixIcon
                    component="Text"
                    icon="ARROW_LEFT_RIGHT_LINE"
                    fontSize={SIZES.ICON.MD}
                  />
                }>
                {t('PD.EditCompareProduction')}
              </MenuItem>
            )}
            {showCalculation && hasPriceCalculation && (
              <MenuItem
                as={NavLink}
                to={`/price-calculations?productDevelopments=${no}&pageSize=25&pageNumber=1`}
                icon={
                  <RemixIcon
                    component="Text"
                    icon="LINE_CHART_LINE"
                    fontSize={SIZES.ICON.MD}
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
                {currentStatus}{' '}
                <RemixIcon component="i" icon="ARROW_DOWN_S_LINE" />
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
            <Button
              variant={'primary'}
              rightIcon={<RemixIcon component="i" icon="SAVE_LINE" />}
              isDisabled={disableEdit}
              type="submit">
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
