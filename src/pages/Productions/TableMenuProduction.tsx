import { MenuItem, Text } from '@chakra-ui/react';
import { SIZES } from '../../theme/Constants';
import { useTranslation } from 'react-i18next';
import { useContext, useEffect } from 'react';
import { ModalContext } from '../../app/context/ModalContext';
import EditProduction from './EditProduction/EditProduction';
import {
  GetFilteredProductDevelopmentDeepWithPaginationQuery as ServerFilter,
  ProductDevelopmentDataDto,
  ProductionDto,
} from '../../app/generate';
import {
  useDeleteProduction,
  useReleaseForSales,
} from '../../app/api/editProduction';
import { isClosed } from '../../app/utils/status';
import ConfirmModal from '../../components/Modal/ConfirmModal';
import { useNavigate } from 'react-router-dom';
import { useAuthorizedSee } from '../../app/Permissions/usePremissions';

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
  const { mutate: deleteProduction, isSuccess } = useDeleteProduction();
  const { mutate: releaseForSales } = useReleaseForSales(
    production ? production?.id?.toString() : undefined,
    !production?.released
  );

  function releaseForSalesFunc(id: string | undefined, release: boolean) {
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
          <Text as={'i'} fontSize={SIZES.ICON.MD} className="ri-edit-line" />
        }>
        {t('Common.Edit')}
      </MenuItem>
      {productDevelopment?.status && !isClosed(productDevelopment?.status) && (
        <MenuItem
          onClick={() =>
            releaseForSalesFunc(
              production?.vendorId?.toString(),
              production?.released ?? false
            )
          }
          icon={
            <Text
              as={'i'}
              fontSize={SIZES.ICON.MD}
              className="ri-toggle-line"
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
            <Text
              as={'i'}
              fontSize={SIZES.ICON.MD}
              className="ri-calculator-line"
            />
          }>
          {t('PD.ViewCalculation')}
        </MenuItem>
      )}

      {!production?.released && (
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
            <Text
              as={'i'}
              fontSize={SIZES.ICON.MD}
              className="ri-delete-bin-6-line"
            />
          }>
          {t('Common.Remove')}
        </MenuItem>
      )}
    </>
  );
};

export default TableMenuProduction;
