import { MenuItem } from '@chakra-ui/react';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { ModalContext } from '../../app/context/ModalContext';
import {
  ProductDevelopmentDataDto,
  SourcedProductionDto,
} from '../../app/generate';
import RemixIcon from '../../components/Icon/RemixIcon';
import { SIZES } from '../../theme/Constants';
import CreateProduction from './CreateProduction/CreateProduction';

type Props = {
  productDevelopment?: ProductDevelopmentDataDto;
  sourcedProduction: SourcedProductionDto;
  disableEdit: boolean;
};

const TableMenuSourcing = ({
  productDevelopment,
  sourcedProduction,
  disableEdit = false,
}: Props) => {
  const { t } = useTranslation();
  const { handleModal } = useContext(ModalContext);

  if (disableEdit) {
    return <></>;
  }

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
      icon={
        <RemixIcon component="Text" fontSize={SIZES.ICON.MD} icon="ADD_LINE" />
      }>
      {t('Production.CreateProduction')}
    </MenuItem>
  );
};

export default TableMenuSourcing;
