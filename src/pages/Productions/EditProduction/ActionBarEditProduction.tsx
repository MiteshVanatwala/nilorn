import { HStack, Text, VStack } from '@chakra-ui/layout';
import { COLORS, SIZES, SPACE } from '../../../theme/Constants';
import { Button, ButtonGroup, IconButton } from '@chakra-ui/button';
import { useTranslation } from 'react-i18next';
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu';
import { Image } from '@chakra-ui/react';
import { images } from '../../../assets';
import { useFormContext, useWatch } from 'react-hook-form';

const ActionBarEditProduction = () => {
  const { t } = useTranslation();
  const { getValues } = useFormContext();

  const artwork = useWatch({ name: 'artwork' });
  function handleSave() {
    console.log('save', getValues());
  }
  function handleSaveAndRelease() {
    console.log('save and release', getValues());
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
              <Text color={COLORS.WHITE} as={'i'} className="ri-more-line" />
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
        <ButtonGroup isAttached variant="primary">
          <Button type="submit" onClick={() => handleSave()}>
            {t('Common.Save')}
          </Button>
          <Menu>
            <MenuButton
              as={IconButton}
              padding={SPACE.SM}
              aria-label={t('Common.ChangeStatus')}
              borderLeft={`1px solid ${COLORS.WHITE}`}
              icon={<Text as={'i'} className="ri-arrow-down-s-line" />}
            />
            <MenuList>
              <MenuItem onClick={() => handleSaveAndRelease()}>
                Save and release
              </MenuItem>
            </MenuList>
          </Menu>
        </ButtonGroup>
      </HStack>
      <Text
        align={{
          base: 'left',
          lg: 'right',
        }}>
        Last edited [DATETIME]
      </Text>
    </VStack>
  );
};

export default ActionBarEditProduction;
