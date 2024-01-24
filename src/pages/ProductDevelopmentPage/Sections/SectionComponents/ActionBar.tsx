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
import { isEqual } from '../../../../app/utils/common';
import ActionBarTemplate from '../../../../components/ActionBar/ActionBarTemplate';

type Props = {
  no: string;
  createNew?: boolean;
  disableEdit: boolean;
};

const ActionBar = ({ createNew, no, disableEdit }: Props) => {
  const { t } = useTranslation();

  const artwork = useWatch({ name: 'artwork' });
  const { getValues, formState, trigger } = useFormContext();
  const { statuses } = useStatusOptions();
  const currentStatus = getValues('status') as Status;
  const { mutate: updateStatus } = useUpdateProductDevelopmentWithStatus(no);
  const { showToast } = useToast();

  const { handleModal } = useModal();

  async function submitStatus(status: Status): Promise<void> {
    if (currentStatus === status) {
      return;
    }

    if (!isEqual(formState.defaultValues, getValues())) {
      showToast({
        position: 'top-right',
        status: 'info',
        description: t('PD.Feedback.Info.NeedToSave'),
      });
      return;
    }

    const res = await trigger();
    if (res) {
      updateStatus(status);
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
          </MenuList>
        ) : undefined
      }
      actionButtons={
        !createNew ? (
          <>
            <Menu>
              <MenuButton
                opacity={disableEdit ? '70%' : ''}
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
                    onClick={() => (!disableEdit ? submitStatus(s.value) : '')}
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
