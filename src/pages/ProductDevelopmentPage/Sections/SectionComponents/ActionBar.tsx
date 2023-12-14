import { HStack, Text, VStack, Box } from '@chakra-ui/layout';
import { COLORS, SIZES, SPACE } from '../../../../theme/Constants';
import { Button, ButtonGroup, IconButton } from '@chakra-ui/button';
import { useTranslation } from 'react-i18next';
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu';
import { Image } from '@chakra-ui/react';
import { images } from '../../../../assets';
import { useFormContext, useWatch } from 'react-hook-form';
import { useStatusOptions } from '../../../../app/hooks/useStatus';
import { useUpdateProductDevelopmentWithStatus } from '../../../../app/api/productDevelopment';
import { Status } from '../../../../app/generate';

type Props = {
  no: string;
  createNew?: boolean;
  showingChanges: boolean;
};

const ActionBar = ({ createNew, showingChanges, no }: Props) => {
  const { t } = useTranslation();
  const artwork = useWatch({ name: 'artwork' });
  const { trigger, getValues } = useFormContext();
  const { status, getNextStatus } = useStatusOptions(true);
  const nextStatus = getNextStatus(getValues('status') as Status);
  const { mutate: updateStatus } = useUpdateProductDevelopmentWithStatus(no);

  async function submitStatus(status: Status): Promise<void> {
    const res = await trigger();
    if (!res) {
      updateStatus(status);
    }
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
            {artwork && (
              <IconButton
                variant={'ghost'}
                aria-label={t('PD.Artwork')}
                icon={
                  <Image
                    src={images.pdf}
                    height="3.2rem"
                    objectFit={'contain'}
                    width="auto"
                  />
                }
              />
            )}
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
                  icon={
                    <Text
                      as={'i'}
                      fontSize={SIZES.ICON.MD}
                      className="ri-history-line"
                    />
                  }>
                  {showingChanges ? t('PD.HideChanges') : t('PD.ShowChanges')}
                </MenuItem>
                <MenuItem
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
                  {status.map(s => (
                    <MenuItem
                      key={s.value}
                      onClick={() => submitStatus(s.value)}
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
