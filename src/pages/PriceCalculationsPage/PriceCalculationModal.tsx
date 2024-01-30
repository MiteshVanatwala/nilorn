import { FieldValues, FormProvider, useForm, useWatch } from 'react-hook-form';
import {
  PriceCalculationDto,
  PriceDto,
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
import { useContext, useEffect, useState } from 'react';
import { ModalContext } from '../../app/context/ModalContext';
import { calculateSalesPrice } from './PriceGrid/PriceHelper';

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
  const [calculationItems, setCalculationItems] = useState<
    PriceDto[] | null | undefined
  >(calculation?.priceDtos);
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
  const [updatedCalculationItems, setUpdatedCalculationItems] = useState<
    PriceDto[] | null | undefined
  >();

  const freightIncluded = form.watch('freightIncluded');

  useEffect(() => {
    const freightIncludedInt = freightIncluded
      ? parseInt(freightIncluded?.toString() ?? '')
      : 0;
    const updatedItems = calculationItems?.map(item => {
      const salesPrice = calculateSalesPrice(
        item?.cost ?? 0,
        freightIncludedInt,
        item.margin ?? 0
      );
      item.salesPrice = salesPrice;
      return item;
    });
    setUpdatedCalculationItems(updatedItems);
  }, [calculationItems, freightIncluded]);
  console.log(calculation);
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
                id={calculation?.id ?? ''}
              />
            }
          />
          <PriceCalculationForm
            calculation={calculation}
            key={updatedCalculationItems?.length}
            production={production}
            createNew={createNew ?? false}
            calculationPrice={updatedCalculationItems ?? calculationItems}
          />
        </form>
      </FormProvider>
    </Box>
  );
};

export default PriceCalculationModal;
