import { HStack, Text, VStack } from '@chakra-ui/layout';
import { COLORS, SIZES, SPACE } from '../../../theme/Constants';
import { Button, ButtonGroup, IconButton } from '@chakra-ui/button';
import { useTranslation } from 'react-i18next';
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu';
import { useFormContext } from 'react-hook-form';
import ArtworkButton from '../../../components/Button/ArtworkButton';

import { SourcedProductionDto } from '../../../app/generate';
import { useState } from 'react';
import { usePatchProduction } from '../../../app/api/editProduction';
type Props = {
  artwork?: string | null;
  sourcedProduction?: SourcedProductionDto;
  vendorIndex: number;
  createNew?: boolean;
};
const ActionBarEditProduction = ({
  artwork,
  sourcedProduction,
  vendorIndex,
  createNew,
}: Props) => {
  const { t } = useTranslation();
  const { getValues } = useFormContext();

  // const { mutate: deleteVendor } = useDeleteVendor();
  const vendor = sourcedProduction?.productions
    ? sourcedProduction?.productions[vendorIndex]
    : null;
  const [released, setReleased] = useState<boolean>(vendor?.released ?? false);
  const { mutate: updateProduction } = usePatchProduction(
    vendor?.vendorId ?? '',
    released,
    false
  );

  function deleteVendorFunc() {
    // deleteVendor({ id: vendorId });

    console.log('delete');
  }
  function handleSaveAndRelease() {
    setReleased(true);
    updateProduction(getValues());
    console.log('save and release', getValues(), released);
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
        {artwork && <ArtworkButton url="TBD" />}
        {!createNew && (
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
                    className="ri-history-line"
                  />
                }>
                {t('PD.ShowChanges')}
              </MenuItem>
              <MenuItem
                onClick={() => deleteVendorFunc()}
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
        )}

        <ButtonGroup isAttached variant="primary">
          <Button type="submit">
            {createNew ? t('Production.CreateProduction') : t('Common.Save')}
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
                {createNew
                  ? t('Production.CreateAndRelease')
                  : t('Production.SaveAndRelease')}
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
        {t('Production.LastEdited')} [DATETIME]
      </Text>
    </VStack>
  );
};

export default ActionBarEditProduction;
