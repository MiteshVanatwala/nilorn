import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import {
  ChangelogType,
  MediaFileDto,
  PriceCalculationDto,
  ProductDevelopmentBriefDto,
  ProductionDto,
  SourcedProductionDto,
} from '../../app/generate';
import { Box, Skeleton } from '@chakra-ui/react';
import { SPACE } from '../../theme/Constants';
import ProductDevelopmentModalTopSection from '../../components/ProductDevelopment/ProductDevelopmentModalTopSection';
import PriceCalculationForm from './PriceCalculationForm';
import PriceCalculationActionBar from './PriceCalculationActionBar';
import {
  useCreateCalculation,
  usePatchCalculation,
  usePriceCalculationDefaultValues,
} from '../../app/api/calculation';
import { useContext, useEffect } from 'react';
import { ModalContext } from '../../app/context/ModalContext';
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
  const { mutate: updateCalculation } = usePatchCalculation();
  const { mutate: createCalculation } = useCreateCalculation();
  const { close } = useContext(ModalContext);
  const { showChanges, setShowChanges } = useToggleChangelog(
    ChangelogType.PRICE_CALCULATION,
    undefined,
    calculation?.id ?? ''
  );

  const {
    data: defaultValues,
    isLoading: isLoadingDefaultValues,
    isSuccess: isLoadedDefaultValues,
  } = usePriceCalculationDefaultValues(
    productDevelopment?.no ?? '',
    sourcedProduction.sourcingCompanyCode ?? '',
    createNew
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
      indirectCost: calculation?.indirectCost,
      freightIncluded: calculation?.freightIncluded,
      margin:
        margins !== null && margins.every(m => m === margins[0])
          ? margins[0]
          : null,
    },
  });

  useEffect(() => {
    if (createNew && isLoadedDefaultValues) {
      form.reset({
        currencyRate: defaultValues?.currencyRate,
        currencyCode: defaultValues?.salesCurrency?.code,
        internalCommission: defaultValues?.internalCommission,
        indirectCost: defaultValues?.indirectCost,
        freightIncluded: defaultValues?.freightIncluded,
        margin: defaultValues?.margin,
      });
    }
  }, [createNew, defaultValues, form, isLoadedDefaultValues]);

  function submitForm(form: FieldValues) {
    if (createNew) {
      createCalculation(form, {
        onSuccess: () => {
          close();
        },
      });
    } else {
      updateCalculation(form, {
        onSuccess: () => {
          close();
        },
      });
    }
  }

  return (
    <Box mb={SPACE.LG} px={SPACE.SM}>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(submitForm)}>
          <ProductDevelopmentModalTopSection
            productDevelopment={productDevelopment}
            sourcingCompanyCode={sourcedProduction?.sourcingCompanyCode}
            vendorName={production?.vendorName}
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
          <Skeleton
            isLoaded={(createNew && !isLoadingDefaultValues) || !createNew}>
            <PriceCalculationForm
              calculation={calculation}
              currencyCode={
                defaultValues?.salesCurrency?.code ??
                calculation?.currencyCode ??
                undefined
              }
              production={production}
              createNew={createNew ?? false}
              showChanges={showChanges}
            />
          </Skeleton>
        </form>
      </FormProvider>
    </Box>
  );
};

export default PriceCalculationModal;
