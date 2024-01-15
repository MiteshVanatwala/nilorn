import { MenuItem, Text } from '@chakra-ui/react';
import { SIZES } from '../../theme/Constants';
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
      icon={<Text as={'i'} fontSize={SIZES.ICON.MD} className="ri-add-line" />}>
      {t('Production.CreateProduction')}
    </MenuItem>
  );
};

export default TableMenuSourcing;
