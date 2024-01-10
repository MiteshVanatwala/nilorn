import { HStack, Text, VStack, Box } from '@chakra-ui/layout';
import { COLORS, SIZES, SPACE } from '../../../../theme/Constants';
import { Button, ButtonGroup, IconButton } from '@chakra-ui/button';
import { useTranslation } from 'react-i18next';
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu';
import { useFormContext, useWatch } from 'react-hook-form';
import { useStatusOptions } from '../../../../app/hooks/useStatus';
import { useUpdateProductDevelopmentWithStatus } from '../../../../app/api/productDevelopment';
import { Status } from '../../../../app/generate';
import { useToggleProductDevelopmentChanges } from '../../../../app/hooks/useChangelog';
import { useModal } from '../../../../app/hooks/useModal';
import ConfirmModal from '../../../../components/Modal/ConfirmModal';
import ArtworkButton from '../../../../components/Button/ArtworkButton';

type Props = {
  no: string;
  createNew?: boolean;
};

const ActionBar = ({ createNew, no }: Props) => {
  const { t } = useTranslation();

  const artwork = useWatch({ name: 'artwork' });
  const { trigger, getValues, register } = useFormContext();
  const { statuses, getNextStatus } = useStatusOptions();
  const currentStatus = getValues('status') as Status;
  const nextStatus = getNextStatus(currentStatus);
  const { mutate: updateStatus } = useUpdateProductDevelopmentWithStatus(no);

  const { handleModal } = useModal();

  async function submitStatus(status: Status): Promise<void> {
    if (currentStatus === status) {
      return;
    }

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
      updateStatus(status);
    }
  }

  const { showChanges, setShowChanges } =
    useToggleProductDevelopmentChanges(no);

  function deleteProductDevelopment() {
    updateStatus(Status.DELETED);
  }

  return (
    <VStack align={'left'}>
      <HStack
        justifyContent={{
          base: 'start',
          md: 'end',
        }}
        flexWrap={{
          base: 'wrap',
          md: 'nowrap',
        }}
        gap={{
          base: SPACE.XXS,
          lg: SPACE.XS,
        }}>
        {!createNew && (
          <>
            {artwork && <ArtworkButton url="TBD" />}
            <Menu>
              <MenuButton
                as={IconButton}
                variant={'secondary'}
                padding={SPACE.SM}
                aria-label={t('Common.More')}
                icon={
                  <Text
                    color={COLORS.WHITE}
                    as={'i'}
                    className="ri-more-line"
                  />
                }
              />
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
              </MenuList>
            </Menu>
            <Button variant={'secondary'} type="submit">
              {t('Common.Save')}
            </Button>
            <ButtonGroup isAttached variant="primary">
              {nextStatus && (
                <Button onClick={() => submitStatus(nextStatus)}>
                  {t('Common.SendTo')} {nextStatus}
                </Button>
              )}
              <Menu>
                <MenuButton
                  as={IconButton}
                  padding={SPACE.SM}
                  aria-label={t('Common.ChangeStatus')}
                  borderLeft={`1px solid ${COLORS.WHITE}`}
                  icon={<Text as={'i'} className="ri-arrow-down-s-line" />}
                />
                <MenuList>
                  {statuses.map(s => (
                    <MenuItem
                      key={s.value}
                      value={s.value}
                      onClick={() => submitStatus(s.value)}
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
            </ButtonGroup>
          </>
        )}
        {createNew && (
          <Button variant="primary" type="submit">
            {t('PD.CreateNew')}
          </Button>
        )}
      </HStack>
    </VStack>
  );
};

export default ActionBar;
