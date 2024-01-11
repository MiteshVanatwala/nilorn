import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { SIZES, SPACE } from '../../theme/Constants';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { ModalContext } from '../../app/context/ModalContext';
import EditProduction from './EditProduction/EditProduction';
import {
  ProductDevelopmentBriefDto,
  SourcingCompanyDto,
} from '../../app/generate';

type Props = {
  productDevelopment?: ProductDevelopmentBriefDto;
  sourcedProduction: SourcingCompanyDto;
  vendorIndex: number;
};

const TableMenuClient = ({
  productDevelopment,
  sourcedProduction,
  vendorIndex,
}: Props) => {
  const { t } = useTranslation();
  const { handleModal } = useContext(ModalContext);

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        variant={'ghost'}
        padding={SPACE.SM}
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
          {t('Production.AddVendor')}
        </MenuItem>
        <MenuItem
          onClick={() => console.log('Edit')}
          icon={
            <Text
              as={'i'}
              fontSize={SIZES.ICON.MD}
              className="ri-toggle-line"
            />
          }>
          {t('Production.Release')}
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

export default TableMenuClient;
