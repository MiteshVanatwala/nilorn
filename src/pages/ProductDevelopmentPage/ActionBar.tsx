import { HStack, Text, VStack, Box } from '@chakra-ui/layout';
import { COLORS, SIZES, SPACE } from '../../theme/Constants';
import { Button, ButtonGroup, IconButton } from '@chakra-ui/button';
import { Status } from '../../app/types/types';
import { useTranslation } from 'react-i18next';
import { useToast } from '../../app/hooks/useToast';
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu';
import { Image } from '@chakra-ui/react';
import { images } from '../../assets/';
import { useWatch } from 'react-hook-form';
import { useStatusOptions } from '../../app/hooks/useStatus';

type Props = {
  createNew?: boolean;
};

const ActionBar = ({ createNew }: Props) => {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const handleToast = (status: Status) => {
    showToast({
      status: status,
      title: 'Toaster title',
      description: 'Toaster messages',
    });
  };
  const artwork = useWatch({ name: 'artwork' });
  const statusOptions = useStatusOptions(true);

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
                      className="ri-delete-bin-line"
                    />
                  }>
                  {t('PD.ShowChanges')}
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
            <Button
              variant={'secondary'}
              onClick={() => handleToast('success')}>
              {t('Common.Save')}
            </Button>
            <ButtonGroup isAttached variant="primary">
              <Button>{t('Common.SendTo')} </Button>
              <Menu>
                <MenuButton
                  as={IconButton}
                  padding={SPACE.SM}
                  aria-label={t('Common.ChangeStatus')}
                  borderLeft={`1px solid ${COLORS.WHITE}`}
                  icon={<Text as={'i'} className="ri-arrow-down-s-line" />}
                />
                <MenuList>
                  {statusOptions.map(s => (
                    <MenuItem
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
