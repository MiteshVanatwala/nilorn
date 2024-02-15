import { MenuItem, Text } from '@chakra-ui/react';
import { SIZES } from '../../theme/Constants';
import { useTranslation } from 'react-i18next';
import { useContext, useEffect } from 'react';
import { ModalContext } from '../../app/context/ModalContext';
import EditProduction from './EditProduction/EditProduction';
import {
  ProductDevelopmentBriefDto,
  ProductionDto,
  SourcedProductionDto,
} from '../../app/generate';
import {
  useDeleteProduction,
  useReleaseForSales,
} from '../../app/api/editProduction';
import { isClosed } from '../../app/utils/status';
import ConfirmModal from '../../components/Modal/ConfirmModal';

type Props = {
  productDevelopment?: ProductDevelopmentBriefDto;
  sourcedProduction: SourcedProductionDto;
  sourcingCoIndex: number;
  production?: ProductionDto;
};

const TableMenuProduction = ({
  productDevelopment,
  sourcedProduction,
  sourcingCoIndex,
  production,
}: Props) => {
  const { t } = useTranslation();
  const { handleModal, close } = useContext(ModalContext);
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
              productDevelopment={productDevelopment}
              sourcedProduction={sourcedProduction}
              sourcingCoIndex={sourcingCoIndex}
              production={production}
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

      {!production?.released && (
        <MenuItem
          onClick={() =>
            handleModal(
              <ConfirmModal
                title={t('PD.DeleteTitle')}
                description={t('PD.DeleteMsg')}
                onConfirm={() => deleteProductionFunc()}
                cancelText={t('Common.No')}
                confirmText={t('Common.Yes')}
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
