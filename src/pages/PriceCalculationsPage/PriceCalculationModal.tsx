import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import {
  ProductDevelopmentBriefDto,
  SourcedProductionDto,
} from '../../app/generate';
import { Box } from '@chakra-ui/react';
import { SPACE } from '../../theme/Constants';
import ProductDevelopmentModalTopSection from '../../components/ProductDevelopment/ProductDevelopmentModalTopSection';
import PriceCalculationForm from './PriceCalculationForm';
import PriceCalculationActionBar from './PriceCalculationActionBar';

type Props = {
  createNew?: boolean;
  productDevelopment?: ProductDevelopmentBriefDto;
  sourcedProduction: SourcedProductionDto;
};

const PriceCalculationModal = ({
  createNew,
  productDevelopment,
  sourcedProduction,
}: Props) => {
  const form = useForm({
    defaultValues: {},
  });
  function submitForm(form: FieldValues) {
    async function onSubmit(form: FieldValues): Promise<void> {
      if (createNew) {
        //POST
      } else {
        // PATCH
      }
    }
    onSubmit(form);
  }

  return (
    <Box mb={SPACE.LG} px={SPACE.SM}>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(submitForm)}>
          <ProductDevelopmentModalTopSection
            productDevelopment={productDevelopment}
            sourcedProduction={sourcedProduction}
            actionBar={
              <PriceCalculationActionBar artwork={'#'} createNew={createNew} />
            }
          />
          <PriceCalculationForm />
        </form>
      </FormProvider>
    </Box>
  );
};

export default PriceCalculationModal;
