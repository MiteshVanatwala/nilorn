import { MenuItem, Text } from '@chakra-ui/react';
import { SIZES } from '../../../theme/Constants';
import { useTranslation } from 'react-i18next';
import { useContext, useEffect } from 'react';
import { ModalContext } from '../../../app/context/ModalContext';
import {
  MediaFileDto,
  PriceCalculationDto,
  ProductDevelopmentBriefDto,
  ProductionDto,
  SourcedProductionDto,
} from '../../../app/generate';
import TableMenuContainer from '../../../components/Table/TableMenuContainer';
import { useDeleteCalculation } from '../../../app/api/calculation';
import ConfirmModal from '../../../components/Modal/ConfirmModal';
import { ServerFilter } from '../../../app/types/types';
import EditPriceCalculationModal from '../EditPriceCalculationModal';
import CreatePriceCalculationModal from '../CreatePriceCalculationModal';

type Props = {
  createNew: boolean;
  productDevelopment?: ProductDevelopmentBriefDto;
  sourcedProduction: SourcedProductionDto;
  onEditInline: () => void;
  lastModified?: string;
  artwork?: MediaFileDto;
  production: ProductionDto;
  calculation: PriceCalculationDto | undefined;
  filters: ServerFilter;
};

const TableMenuCalculation = ({
  createNew,
  productDevelopment,
  sourcedProduction,
  onEditInline,
  lastModified,
  artwork,
  production,
  calculation,
  filters,
}: Props) => {
  const { t } = useTranslation();
  const { handleModal, close } = useContext(ModalContext);

  const { mutate: deleteCalculation, isSuccess } = useDeleteCalculation(
    calculation?.id ?? ''
  );

  useEffect(() => {
    if (isSuccess) {
      close();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <TableMenuContainer>
      <MenuItem
        onClick={() =>
          handleModal(
            createNew ? (
              <CreatePriceCalculationModal
                productDevelopment={productDevelopment}
                sourcedProduction={sourcedProduction}
                lastModified={lastModified}
                artwork={artwork}
                production={production}
                calculation={calculation}
                filters={filters}
              />
            ) : (
              <EditPriceCalculationModal
                calculationId={calculation?.id ?? ''}
                filters={filters}
              />
            )
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
          onClick={() =>
            handleModal(
              <ConfirmModal
                title={t('PD.DeleteTitle')}
                description={t('PD.DeleteMsg')}
                confirmType={'DELETE'}
                onConfirm={() => deleteCalculation()}
              />
            )
          }
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
