import { MenuItem, Text } from '@chakra-ui/react';
import { SIZES } from '../../theme/Constants';
import { useTranslation } from 'react-i18next';
import { useContext, useEffect, useState } from 'react';
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
  const { mutate: deleteProduction } = useDeleteProduction();
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
  const [closeModal, setCloseModal] = useState<boolean>(false);
  useEffect(() => {
    if (closeModal) {
      close();
    }
  }, [close, closeModal]);
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
              closeModal={setCloseModal}
            />
          )
        }
        icon={
          <Text as={'i'} fontSize={SIZES.ICON.MD} className="ri-edit-line" />
        }>
        {t('Common.Edit')}
      </MenuItem>
      <MenuItem
        onClick={() =>
          releaseForSalesFunc(
            production?.vendorId?.toString(),
            production?.released ?? false
          )
        }
        icon={
          <Text as={'i'} fontSize={SIZES.ICON.MD} className="ri-toggle-line" />
        }>
        {!production?.released
          ? t('Production.Release')
          : t('Production.Remove')}
      </MenuItem>
      {!production?.released && (
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
    </>
  );
};

export default TableMenuProduction;
