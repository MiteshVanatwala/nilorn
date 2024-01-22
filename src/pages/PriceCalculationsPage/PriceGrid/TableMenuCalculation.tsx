import { MenuItem, Text } from '@chakra-ui/react';
import { SIZES } from '../../../theme/Constants';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { ModalContext } from '../../../app/context/ModalContext';
import {
  ProductDevelopmentBriefDto,
  SourcedProductionDto,
} from '../../../app/generate';
import TableMenuContainer from '../../../components/Table/TableMenuContainer';
import PriceCalculationModal from '../PriceCalculationModal';

type Props = {
  createNew: boolean;
  productDevelopment?: ProductDevelopmentBriefDto;
  sourcedProduction: SourcedProductionDto;
  onEditInline: () => void;
};

const TableMenuCalculation = ({
  createNew,
  productDevelopment,
  sourcedProduction,
  onEditInline,
}: Props) => {
  const { t } = useTranslation();
  const { handleModal } = useContext(ModalContext);

  function deleteProductionFunc() {
    console.log('Delete');
  }

  return (
    <TableMenuContainer>
      <MenuItem
        onClick={() =>
          handleModal(
            <PriceCalculationModal
              productDevelopment={productDevelopment}
              sourcedProduction={sourcedProduction}
              createNew={createNew}
            />
          )
        }
        icon={
          <Text
            as={'i'}
            fontSize={SIZES.ICON.MD}
            className={createNew ? 'ri-add-line' : 'ri-edit-line'}
          />
        }>
        {createNew
          ? t('PriceCalc.AddCalculation')
          : t('PriceCalc.EditCalculation')}
      </MenuItem>
      {!createNew && (
        <MenuItem
          onClick={onEditInline}
          icon={
            <Text as={'i'} fontSize={SIZES.ICON.MD} className="ri-edit-line" />
          }>
          {t('PriceCalc.EditInline')}
        </MenuItem>
      )}
      {!createNew && (
        <MenuItem
          onClick={() => deleteProductionFunc()}
          icon={
            <Text
              as={'i'}
              fontSize={SIZES.ICON.MD}
              className="ri-delete-bin-6-line"
            />
          }>
          {t('Common.Remove')}
        </MenuItem>
      )}
    </TableMenuContainer>
  );
};

export default TableMenuCalculation;
