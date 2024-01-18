import { Box } from '@chakra-ui/react';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import EditProductionTopSection from './EditProductionTopSection';
import { SPACE } from '../../../theme/Constants';
import {
  ProductDevelopmentBriefDto,
  ProductionDto,
  SourcedProductionDto,
} from '../../../app/generate';

import {
  useCreateProduction,
  usePatchProduction,
} from '../../../app/api/editProduction';
import { useGetVendors } from '../../../app/api/vendors';
import { SelectOption } from '../../../app/types/types';
import { mapVendorsToOptions } from '../../../app/hooks/useFilterOption';
import { useContext, useEffect, useState } from 'react';
import EditProductionFormContent from './EditProductionFormContent';
import { ModalContext } from '../../../app/context/ModalContext';
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
  const form = useForm({
    defaultValues: {
      ...production,
    },
  });
  const { close } = useContext(ModalContext);
  let { data: vendors } = useGetVendors(!createNew);
  const [, setVendorOptions] = useState<SelectOption[]>([]);

  const { mutate: createProduction, isSuccess: isSuccessCreate } =
    useCreateProduction();
  const { mutate: updateProduction, isSuccess: isSuccessPatch } =
    usePatchProduction(
      production?.id ?? '',
      production?.released ? false : true
    );

  function submitForm(form: FieldValues) {
    async function onSubmit(form: FieldValues): Promise<void> {
      if (createNew) {
        createProduction(form);
      } else {
        if (production?.id !== undefined) {
          updateProduction(form);
        }
      }
    }
    onSubmit(form);
  }
  useEffect(() => {
    if (vendors) {
      setVendorOptions(mapVendorsToOptions(vendors));
    }
  }, [vendors]);
  useEffect(() => {
    if (isSuccessCreate || isSuccessPatch) {
      close();
    }
  }, [close, isSuccessCreate, isSuccessPatch]);
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
