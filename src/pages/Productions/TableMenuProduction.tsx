import { MenuItem, Text } from '@chakra-ui/react';
import { SIZES } from '../../theme/Constants';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { ModalContext } from '../../app/context/ModalContext';
import EditProduction from './EditProduction/EditProduction';
import {
  ProductDevelopmentBriefDto,
  ProductionDto,
  SourcedProductionDto,
} from '../../app/generate';
import { useReleaseForSales } from '../../app/api/editProduction';

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
  const { handleModal } = useContext(ModalContext);

  const { mutate: releaseForSales } = useReleaseForSales(
    production ? production?.id?.toString() : undefined,
    !production?.released
  );
  function releaseForSalesFunc(id: string | undefined, release: boolean) {
    if (production?.vendorId !== '') {
      releaseForSales();
    }
  }
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
      <MenuItem
        onClick={() => console.log('Edit')}
        icon={
          <Text
            as={'i'}
            fontSize={SIZES.ICON.MD}
            className="ri-delete-bin-6-line"
          />
        }>
        {t('Common.Remove')}
      </MenuItem>
    </>
  );
};

export default TableMenuProduction;
