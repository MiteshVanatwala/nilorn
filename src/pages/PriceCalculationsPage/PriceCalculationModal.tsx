import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import {
  ChangelogType,
  MediaFileDto,
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
import { useToggleChangelog } from '../../app/hooks/useChangelog';

type Props = {
  createNew?: boolean;
  productDevelopment?: ProductDevelopmentBriefDto;
  sourcedProduction: SourcedProductionDto;
  lastModified?: string;
  artwork?: MediaFileDto;
  production: ProductionDto;
  calculation: PriceCalculationDto | undefined;
};

const PriceCalculationModal = ({
  createNew,
  productDevelopment,
  sourcedProduction,
  lastModified,
  artwork,
  production,
  calculation,
}: Props) => {
  const { showChanges, setShowChanges } = useToggleChangelog(
    ChangelogType.PRICE_CALCULATION,
    undefined,
    calculation?.id ?? ''
  );

  const margins =
    calculation?.priceDtos !== null && calculation?.priceDtos !== undefined
      ? calculation?.priceDtos.map(item => item.margin)
      : null;

  const form = useForm({
    defaultValues: {
      id: calculation?.id,
      currencyRate: calculation?.currencyRate,
      currencyCode: calculation?.currencyCode,
      internalCommission: calculation?.internalCommission,
      indirectCost: calculation?.freightIncluded,
      freightIncluded: calculation?.freightIncluded,
      margin:
        margins !== null && margins.every(m => m === margins[0])
          ? margins[0]
          : null,
    },
  });
  const { mutate: updateCalculation, isSuccess: isSuccessPatch } =
    usePatchCalculation();
  const { mutate: createCalculation, isSuccess: isSuccessCreate } =
    useCreateCalculation();
  const { close } = useContext(ModalContext);
  const [calculationItems, setCalculationItems] = useState<PriceDto[] | null>(
    calculation?.priceDtos ?? null
  );

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

  const freightIncluded = form.watch('freightIncluded');
  const marginValue = form.watch('margin');

  const freightIncludedInt = freightIncluded
    ? parseInt(freightIncluded?.toString() ?? '')
    : 0;
  const marginValueInt = marginValue
    ? parseInt(marginValue?.toString() ?? '')
    : null;

  useEffect(() => {
    const updatedItems = calculationItems?.map(item => {
      const salesPrice = calculateSalesPrice(
        item?.cost ?? 0,
        freightIncludedInt,
        marginValueInt ? marginValueInt : item.margin ? item.margin : 0
      );

      item.salesPrice = salesPrice;
      item.margin = marginValueInt ?? item.margin;
      return item;
    });
    setCalculationItems(updatedItems ?? null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [freightIncludedInt, marginValueInt]);

  useEffect(() => {
    setCalculationItems(calculation?.priceDtos ?? null);
  }, [calculation]);

  return (
    <Box mb={SPACE.LG} px={SPACE.SM}>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(submitForm)}>
          <ProductDevelopmentModalTopSection
            productDevelopment={productDevelopment}
            sourcedProduction={sourcedProduction}
            actionBar={
              <PriceCalculationActionBar
                artwork={artwork}
                createNew={createNew}
                lastModified={lastModified}
                id={calculation?.id ?? ''}
                showChanges={showChanges}
                setShowChanges={(s: boolean) => setShowChanges(s)}
              />
            }
          />
          <PriceCalculationForm
            calculation={calculation}
            production={production}
            createNew={createNew ?? false}
            calculationPrice={calculationItems}
            showChanges={showChanges}
          />
        </form>
      </FormProvider>
    </Box>
  );
};

export default PriceCalculationModal;
