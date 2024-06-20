import { Box } from '@chakra-ui/layout';
import { COLORS, SIZES, SPACE } from '../../../../../theme/Constants';
import { Button } from '@chakra-ui/button';
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu';
import { useFormContext, useWatch } from 'react-hook-form';
import { useStatusOptions } from '../../../../../app/hooks/useStatus';
import { useUpdateProductDevelopmentWithStatus } from '../../../../../app/api/productDevelopment';
import { ChangelogType, Status } from '../../../../../app/generate';
import { useToggleChangelog } from '../../../../../app/hooks/useChangelog';
import { useModal } from '../../../../../app/hooks/useModal';
import ConfirmModal from '../../../../../components/Modal/ConfirmModal';
import { useToast } from '../../../../../app/hooks/useToast';
import ActionBarTemplate from '../../../../../components/ActionBar/ActionBarTemplate';
import { useCurrentUser } from '../../../../../app/api/User';
import { useUnsavedChanges } from '../../../../../app/hooks/useUnsavedChanges';
import { NavLink } from 'react-router-dom';
import { scrollNameIntoView } from '../../../../../app/utils/common';
import {
  useAuthorizedSee,
  useAuthorizedToChangeStatus,
} from '../../../../../app/Permissions/usePremissions';
import MenuItemCreate from './MenuItemCreate';
import { useTranslation } from 'react-i18next';
import RemixIcon from '../../../../../components/Icon/RemixIcon';
import { READ_ONLY_OPACITY } from '../../../../../app/utils/constant';

type Props = {
  name: string;
  no: string;
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
  const isAuthorizedToCahangeStatus = useAuthorizedToChangeStatus();

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

            <MenuItemCreate no={no} createType={'copy'} name={name} />
            <MenuItemCreate no={no} createType={'version'} name={name} />

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
                  disableEdit && !isAuthorizedToCahangeStatus(currentStatus)
                    ? READ_ONLY_OPACITY
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
                      (user?.role && isAuthorizedToCahangeStatus(currentStatus))
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
