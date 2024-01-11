import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { COLORS, SIZES, SPACE } from '../../theme/Constants';
import { useTranslation } from 'react-i18next';
import { useContext, useState } from 'react';
import { ModalContext } from '../../app/context/ModalContext';
import EditProduction from './EditProduction/EditProduction';
import {
  ProductDevelopmentBriefDto,
  SourcedProductionDto,
} from '../../app/generate';
import { useReleaseForSales } from '../../app/api/editProduction';

type Props = {
  productDevelopment?: ProductDevelopmentBriefDto;
  sourcedProduction: SourcedProductionDto;
  vendorIndex: number;
};

const TableMenu = ({
  productDevelopment,
  sourcedProduction,
  vendorIndex,
}: Props) => {
  const { t } = useTranslation();
  const { handleModal } = useContext(ModalContext);

  const { mutate: releaseForSales } = useReleaseForSales(
    sourcedProduction?.productions
      ? sourcedProduction.productions[vendorIndex]?.vendorId?.toString()
      : undefined,
    !sourcedProduction?.productions?.[vendorIndex]?.released
  );

  function releaseForSalesFunc(id: string | undefined, release: boolean) {
    releaseForSales();
  }
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        variant={'ghost'}
        padding={SPACE.SM}
        _hover={{
          background: COLORS.GRAY[20],
        }}
        aria-label={t('Common.More')}
        icon={<Text as={'i'} className="ri-more-line" />}
      />
      <MenuList lineHeight={1.5}>
        <MenuItem
          onClick={() =>
            handleModal(
              <EditProduction
                productDevelopment={productDevelopment}
                sourcedProduction={sourcedProduction}
                vendorIndex={vendorIndex}
              />
            )
          }
          icon={
            <Text as={'i'} fontSize={SIZES.ICON.MD} className="ri-edit-line" />
          }>
          {t('Common.Edit')}
        </MenuItem>
        <MenuItem
          onClick={() =>
            releaseForSalesFunc(
              sourcedProduction?.productions
                ? sourcedProduction.productions[
                    vendorIndex
                  ]?.vendorId?.toString()
                : undefined,
              sourcedProduction?.productions?.[vendorIndex]?.released ?? false
            )
          }
          icon={
            <Text
              as={'i'}
              fontSize={SIZES.ICON.MD}
              className="ri-toggle-line"
            />
          }>
          {!sourcedProduction?.productions?.[vendorIndex]?.released
            ? t('Production.Release')
            : t('Production.Remove')}
        </MenuItem>
        <MenuItem
          onClick={() => console.log('Edit')}
          icon={
            <Text
              as={'i'}
              fontSize={SIZES.ICON.MD}
              className="ri-delete-bin-6-line"
            />
          }>
          {t('Common.Remove')}
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default TableMenu;
