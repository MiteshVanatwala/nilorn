import { MenuItem } from '@chakra-ui/react';
import { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDeleteCalculation } from '../../../app/api/calculation';
import { ModalContext } from '../../../app/context/ModalContext';
import {
  MediaFileDto,
  PriceCalculationDto,
  ProductDevelopmentDataDto,
  ProductionDto,
  GetFilteredProductDevelopmentDeepWithPaginationQuery as ServerFilter,
  SourcedProductionDto,
} from '../../../app/generate';
import RemixIcon from '../../../components/Icon/RemixIcon';
import ConfirmModal from '../../../components/Modal/ConfirmModal';
import TableMenuContainer from '../../../components/Table/TableMenuContainer';
import { SIZES } from '../../../theme/Constants';
import CreatePriceCalculationModal from '../CreatePriceCalculationModal';
import EditPriceCalculationModal from '../EditPriceCalculationModal';
import { isClosed } from '../../../app/utils/status';

type Props = {
  createNew: boolean;
  productDevelopment?: ProductDevelopmentDataDto;
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

  const isPDClosed =
    productDevelopment?.status && isClosed(productDevelopment?.status);

  if (createNew && isPDClosed) {
    return <></>;
  }

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
          <RemixIcon
            component="Text"
            fontSize={SIZES.ICON.MD}
            icon={createNew ? 'ADD_LINE' : 'EDIT_LINE'}
          />
        }>
        {createNew
          ? t('PriceCalc.AddCalculation')
          : t('PriceCalc.EditCalculation')}
      </MenuItem>
      {!createNew && !isPDClosed && (
        <>
          <MenuItem
            onClick={onEditInline}
            icon={
              <RemixIcon
                component="Text"
                fontSize={SIZES.ICON.MD}
                icon="EDIT_LINE"
              />
            }>
            {t('PriceCalc.EditInline')}
          </MenuItem>
          <MenuItem
            onClick={() =>
              handleModal(
                <ConfirmModal
                  title={t('PD.DeleteTitle')}
                  description={t('PD.DeleteMsg')}
                  confirmType={'DELETE'}
                  onConfirm={() => deleteCalculation()}
                  onClose={() => close()}
                />
              )
            }
            icon={
              <RemixIcon
                component="Text"
                fontSize={SIZES.ICON.MD}
                icon="DELETE_BIN_6_LINE"
              />
            }>
            {t('Common.Delete')}
          </MenuItem>
        </>
      )}
    </TableMenuContainer>
  );
};

export default TableMenuCalculation;
