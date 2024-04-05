import { MenuItem, Text } from '@chakra-ui/react';
import { SIZES } from '../../theme/Constants';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { ModalContext } from '../../app/context/ModalContext';
import {
  ProductDevelopmentBriefDto,
  SourcedProductionDto,
} from '../../app/generate';
import CreateProduction from './CreateProduction/CreateProduction';

type Props = {
  productDevelopment?: ProductDevelopmentBriefDto;
  sourcedProduction: SourcedProductionDto;
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
          <CreateProduction
            productDevelopment={productDevelopment}
            sourcedProduction={sourcedProduction}
          />
        )
      }
      icon={<Text as={'i'} fontSize={SIZES.ICON.MD} className="ri-add-line" />}>
      {t('Production.CreateProduction')}
    </MenuItem>
  );
};

export default TableMenuSourcing;
