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
  sourcingCoIndex: number;
};

const TableMenuSourcing = ({
  productDevelopment,
  sourcedProduction,
  sourcingCoIndex,
}: Props) => {
  const { t } = useTranslation();
  const { handleModal } = useContext(ModalContext);

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
                sourcingCoIndex={sourcingCoIndex}
                createNew={true}
              />
            )
          }
          icon={
            <Text as={'i'} fontSize={SIZES.ICON.MD} className="ri-add-line" />
          }>
          {t('Production.CreateProduction')}
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default TableMenuSourcing;
