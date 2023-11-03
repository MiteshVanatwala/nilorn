import { HStack, Text, VStack } from '@chakra-ui/layout';
import { COLORS, SIZES, SPACE } from '../../theme/Constants';
import { Button, ButtonGroup, IconButton } from '@chakra-ui/button';
import { Status } from '../../app/types/types';
import { useTranslation } from 'react-i18next';
import { useToast } from '../../app/hooks/useToast';
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu';

const ActionBar = () => {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const handleToast = (status: Status) => {
    showToast({
      status: status,
      title: 'Toaster title',
      description: 'Toaster messages',
    });
  };
  return (
    <VStack align={'left'}>
      <HStack>
        <IconButton
          variant={'ghost'}
          aria-label={t('PD.Artwork')}
          icon={
            <Text
              as={'i'}
              fontSize={SIZES.ICON.LG}
              className="ri-file-pdf-line"
            />
          }
        />
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
              {t('PD.Delete')}
            </MenuItem>
          </MenuList>
        </Menu>
        <Button variant={'secondary'} onClick={() => handleToast('success')}>
          {t('Common.Save')}
        </Button>
        <ButtonGroup isAttached variant="primary">
          <Button>{t('Common.SendTo')} [NEXT-STATUS]</Button>
          <Menu>
            <MenuButton
              as={IconButton}
              padding={SPACE.SM}
              aria-label={t('Common.CahngeStatus')}
              borderLeft={`1px solid ${COLORS.WHITE}`}
              icon={<Text as={'i'} className="ri-arrow-down-s-line" />}
            />
            <MenuList>
              {new Array(5).fill(null).map(_ => (
                <MenuItem
                  icon={
                    <Text
                      as={'i'}
                      className="ri-checkbox-blank-fill"
                      color={'blue'}
                    />
                  }>
                  [STATUS]
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </ButtonGroup>
      </HStack>
      <Text>{t('Common.LastChanged')} [DATE-TIME]</Text>
    </VStack>
  );
};

export default ActionBar;
