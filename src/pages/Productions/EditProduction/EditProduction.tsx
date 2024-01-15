import { Box } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import EditProductionTopSection from './EditProductionTopSection';
import { SPACE } from '../../../theme/Constants';

import {
  ProductDevelopmentBriefDto,
  ProductionDto,
  SourcedProductionDto,
} from '../../../app/generate';

import { usePatchProduction } from '../../../app/api/editProduction';
import { useGetVendors } from '../../../app/api/vendors';
import { SelectOption } from '../../../app/types/types';
import { mapVendorsToOptions } from '../../../app/hooks/useFilterOption';
import { useEffect, useState } from 'react';
import { useGetCurrencies } from '../../../app/api/currency';
import EditProductionFormContent from './EditProductionFormContent';
type Props = {
  productDevelopment?: ProductDevelopmentBriefDto;
  sourcedProduction: SourcedProductionDto;
  sourcingCoIndex: number;
  createNew?: boolean;
  production?: ProductionDto;
};
const EditProduction = ({
  productDevelopment,
  sourcedProduction,
  sourcingCoIndex,
  createNew,
  production,
}: Props) => {
  const { t } = useTranslation();
  const form = useForm();

  const vendor = sourcedProduction?.productions
    ? sourcedProduction?.productions[sourcingCoIndex]
    : null;
  const { mutate: saveProduction } = usePatchProduction(
    vendor?.vendorId ?? '',
    vendor?.released ?? false,
    true
  );
  let { data: vendors } = useGetVendors(!createNew);
  let { data: currency } = useGetCurrencies();

  const [vendorOptions, setVendorOptions] = useState<SelectOption[]>([]);

  function submitForm(form: FieldValues) {
    async function onSubmit(form: FieldValues): Promise<void> {
      // updateProductDevelopment(form);
      console.log('save');
      saveProduction(form);
    }
    onSubmit(form);
  }

  useEffect(() => {
    if (vendors) {
      setVendorOptions(mapVendorsToOptions(vendors));
    }
  }, [vendors]);

  return (
    <Box mb={SPACE.LG} px={SPACE.SM}>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(submitForm)}>
          <EditProductionTopSection
            productDevelopment={productDevelopment}
            sourcedProduction={sourcedProduction}
            sourcingCoIndex={sourcingCoIndex}
            production={production}
            createNew={createNew}
            disableEdit={production?.released}
          />
          <EditProductionFormContent
            sourcedProduction={sourcedProduction}
            productDevelopment={productDevelopment}
            sourcingCoIndex={sourcingCoIndex}
            createNew={createNew}
            production={production}
            disableEdit={production?.released}
          />
        </form>
      </FormProvider>
    </Box>
  );
};

export default EditProduction;
