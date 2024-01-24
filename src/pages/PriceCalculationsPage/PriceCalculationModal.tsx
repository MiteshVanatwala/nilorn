import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import {
  PriceCalculationDto,
  ProductDevelopmentBriefDto,
  ProductionDto,
  SourcedProductionDto,
} from '../../app/generate';
import { Box } from '@chakra-ui/react';
import { SPACE } from '../../theme/Constants';
import ProductDevelopmentModalTopSection from '../../components/ProductDevelopment/ProductDevelopmentModalTopSection';
import PriceCalculationForm from './PriceCalculationForm';
import PriceCalculationActionBar from './PriceCalculationActionBar';
import {
  useCreateCalculation,
  usePatchCalculation,
} from '../../app/api/calculation';
import { useContext, useEffect } from 'react';
import { ModalContext } from '../../app/context/ModalContext';

type Props = {
  createNew?: boolean;
  productDevelopment?: ProductDevelopmentBriefDto;
  sourcedProduction: SourcedProductionDto;
  lastModified?: string;
  artworkUrl?: string;
  production: ProductionDto;
  calculation: PriceCalculationDto | undefined;
};

const PriceCalculationModal = ({
  createNew,
  productDevelopment,
  sourcedProduction,
  lastModified,
  artworkUrl,
  production,
  calculation,
}: Props) => {
  const form = useForm({
    defaultValues: {
      ...calculation,
    },
  });
  const { mutate: updateCalculation, isSuccess: isSuccessPatch } =
    usePatchCalculation(calculation?.id ?? '');
  const { mutate: createCalculation, isSuccess: isSuccessCreate } =
    useCreateCalculation();
  const { close } = useContext(ModalContext);

  function submitForm(form: FieldValues) {
    async function onSubmit(form: FieldValues): Promise<void> {
      if (createNew) {
        createCalculation(form);
      } else {
        updateCalculation(form);
      }
    }
    onSubmit(form);
  }
  useEffect(() => {
    if (isSuccessPatch || isSuccessCreate) {
      close();
    }
  }, [close, isSuccessPatch, isSuccessCreate]);

  return (
    <Box mb={SPACE.LG} px={SPACE.SM}>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(submitForm)}>
          <ProductDevelopmentModalTopSection
            productDevelopment={productDevelopment}
            sourcedProduction={sourcedProduction}
            actionBar={
              <PriceCalculationActionBar
                artwork={artworkUrl}
                createNew={createNew}
                lastModified={lastModified}
              />
            }
          />
          <PriceCalculationForm
            calculation={calculation}
            production={production}
            createNew={createNew ?? false}
          />
        </form>
      </FormProvider>
    </Box>
  );
};

export default PriceCalculationModal;
