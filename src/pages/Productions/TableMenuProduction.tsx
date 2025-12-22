import { MenuItem } from '@chakra-ui/react';
import { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthorizedSee } from '../../app/Permissions/usePremissions';
import {
  useDeleteProduction,
  useReleaseForSales,
} from '../../app/api/editProduction';
import { ModalContext } from '../../app/context/ModalContext';
import {
  ProductDevelopmentDataDto,
  ProductionDto,
  GetFilteredProductDevelopmentDeepWithPaginationQuery as ServerFilter,
} from '../../app/generate';
import RemixIcon from '../../components/Icon/RemixIcon';
import ConfirmModal from '../../components/Modal/ConfirmModal';
import { SIZES } from '../../theme/Constants';
import EditProduction from './EditProduction/EditProduction';
import useFilterOptions from '../../app/hooks/useFilterOption';
import { isClosed } from '../../app/utils/status';
import useStoreFilterAndNavigate from '../../app/hooks/useStoreFilterAndNavigate';

type Props = {
  productDevelopment?: ProductDevelopmentDataDto;
  production?: ProductionDto;
  filters: ServerFilter;
  disableEdit?: boolean;
};

const TableMenuProduction = ({
  productDevelopment,
  production,
  filters,
  disableEdit = false,
}: Props) => {
  const { t } = useTranslation();
  const { storeFilterAndNavigate } = useStoreFilterAndNavigate();
  const { handleModal, close } = useContext(ModalContext);
  const vendorOptions = useFilterOptions('vendors');
  const showCalculationLink =
    useAuthorizedSee('price-calculation') &&
    !!production?.released &&
    !!productDevelopment?.no;
  const isPDClosed =
    productDevelopment?.status && isClosed(productDevelopment?.status);

  const { mutate: deleteProduction, isSuccess } = useDeleteProduction();
  const { mutate: releaseForSales } = useReleaseForSales(
    production ? production?.id?.toString() : undefined,
    !production?.released
  );

  function releaseForSalesFunc() {
    if (production?.vendorId !== '') {
      releaseForSales();
    }
  }

  function deleteProductionFunc() {
    deleteProduction({ id: production?.id ?? '' });
  }

  useEffect(() => {
    if (isSuccess) {
      close();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  const navigateToPriceCalculation = () => {
    storeFilterAndNavigate(
      `/price-calculations?productDevelopments=${
        productDevelopment?.no
      }&vendors=${
        vendorOptions.find(option => option.label === production?.vendorName)
          ?.value
      }${
        isPDClosed
          ? `&statuses=${filters?.statuses || productDevelopment?.status}`
          : ''
      }`
    );
  };

  return (
    <>
      <MenuItem
        onClick={() =>
          handleModal(
            <EditProduction
              productionId={production?.id ?? ''}
              filters={filters}
            />
          )
        }
        icon={
          <RemixIcon
            component="Text"
            icon="EDIT_LINE"
            fontSize={SIZES.ICON.MD}
          />
        }>
        {t('Common.Edit')}
      </MenuItem>
      {!disableEdit && (
        <MenuItem
          onClick={releaseForSalesFunc}
          icon={
            <RemixIcon
              component="Text"
              icon="TOGGLE_LINE"
              fontSize={SIZES.ICON.MD}
            />
          }>
          {!production?.released
            ? t('Production.Release')
            : t('Production.Remove')}
        </MenuItem>
      )}

      {showCalculationLink && (
        <MenuItem
          onClick={navigateToPriceCalculation}
          icon={
            <RemixIcon
              component="Text"
              icon="CALCULATOR_LINE"
              fontSize={SIZES.ICON.MD}
            />
          }>
          {t('PD.ViewCalculation')}
        </MenuItem>
      )}

      {!production?.released && !disableEdit && (
        <MenuItem
          onClick={() =>
            handleModal(
              <ConfirmModal
                title={t('PD.DeleteTitle')}
                description={t('PD.DeleteMsg')}
                confirmType={'DELETE'}
                onConfirm={() => deleteProductionFunc()}
                onClose={() => close()}
              />
            )
          }
          icon={
            <RemixIcon
              component="Text"
              icon="DELETE_BIN_6_LINE"
              fontSize={SIZES.ICON.MD}
            />
          }>
          {t('Common.Delete')}
        </MenuItem>
      )}
    </>
  );
};

export default TableMenuProduction;
