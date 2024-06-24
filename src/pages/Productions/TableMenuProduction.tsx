import { MenuItem } from '@chakra-ui/react';
import { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
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
import { isClosed as isPDClosed } from '../../app/utils/status';
import RemixIcon from '../../components/Icon/RemixIcon';
import ConfirmModal from '../../components/Modal/ConfirmModal';
import { SIZES } from '../../theme/Constants';
import EditProduction from './EditProduction/EditProduction';

type Props = {
  productDevelopment?: ProductDevelopmentDataDto;
  production?: ProductionDto;
  filters: ServerFilter;
};

const TableMenuProduction = ({
  productDevelopment,
  production,
  filters,
}: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { handleModal, close } = useContext(ModalContext);
  const showCalculationLink =
    useAuthorizedSee('calculation') &&
    !!production?.released &&
    !!productDevelopment?.no;
  const isClosed =
    productDevelopment?.status && isPDClosed(productDevelopment?.status);

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
      {!isClosed && (
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
          onClick={() =>
            navigate(
              `/price-calculations?productDevelopments=${productDevelopment?.no}`
            )
          }
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

      {!production?.released && !isClosed && (
        <MenuItem
          onClick={() =>
            handleModal(
              <ConfirmModal
                title={t('PD.DeleteTitle')}
                description={t('PD.DeleteMsg')}
                confirmType={'DELETE'}
                onConfirm={() => deleteProductionFunc()}
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
          {t('Common.Remove')}
        </MenuItem>
      )}
    </>
  );
};

export default TableMenuProduction;
