import { MenuItem, Text } from '@chakra-ui/react';
import { SIZES } from '../../theme/Constants';
import { useTranslation } from 'react-i18next';
import { useContext, useEffect, useState } from 'react';
import { ModalContext } from '../../app/context/ModalContext';
import EditProduction from './EditProduction/EditProduction';
import {
  ProductDevelopmentBriefDto,
  PurchasePriceDto,
  SourcedProductionDto,
} from '../../app/generate';
import { useGetSourcingQuantities } from '../../app/api/SourcingQuantities';

type Props = {
  productDevelopment?: ProductDevelopmentBriefDto;
  sourcedProduction: SourcedProductionDto;
  sourcingCoIndex: number;
};

const TableMenuSourcing = ({
  productDevelopment,
  sourcedProduction,
  sourcingCoIndex,
}: Props) => {
  const { t } = useTranslation();
  const { handleModal } = useContext(ModalContext);
  const [defaultQuantities, setDefaultQuantities] = useState<
    PurchasePriceDto[]
  >([]);

  let { data } = useGetSourcingQuantities(
    sourcedProduction?.sourcingId ? sourcedProduction?.sourcingId : '',
    sourcedProduction?.sourcingId ? true : false
  );

  useEffect(() => {
    const mappedDefaultQuantities = data?.map(q => ({
      id: undefined,
      quantity: q || undefined,
      price: null,
    }));
    if (mappedDefaultQuantities !== undefined) {
      setDefaultQuantities(mappedDefaultQuantities);
    }
  }, [data]);
  return (
    <MenuItem
      onClick={() =>
        handleModal(
          <EditProduction
            productDevelopment={productDevelopment}
            sourcedProduction={sourcedProduction}
            sourcingCoIndex={sourcingCoIndex}
            createNew={true}
            production={{
              purchasePrices: defaultQuantities,
            }}
          />
        )
      }
      icon={<Text as={'i'} fontSize={SIZES.ICON.MD} className="ri-add-line" />}>
      {t('Production.CreateProduction')}
    </MenuItem>
  );
};

export default TableMenuSourcing;
