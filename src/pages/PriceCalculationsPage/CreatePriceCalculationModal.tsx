import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import {
  ChangelogType,
  GetFilteredProductDevelopmentDeepWithPaginationQuery as ServerFilter,
  MediaFileDto,
  PriceCalculationDto,
  ProductDevelopmentDataDto,
  ProductionDto,
  SourcedProductionDto,
} from '../../app/generate';
import { Box, Skeleton } from '@chakra-ui/react';
import { SIZES, SPACE } from '../../theme/Constants';
import ProductDevelopmentModalTopSection from '../../components/ProductDevelopment/ProductDevelopmentModalTopSection';
import PriceCalculationForm from './PriceCalculationForm';
import PriceCalculationActionBar from './PriceCalculationActionBar';
import {
  useCreateCalculation,
  usePriceCalculationDefaultValues,
} from '../../app/api/calculation';
import { useContext, useEffect, useRef } from 'react';
import { ModalContext } from '../../app/context/ModalContext';
import { useToggleChangelog } from '../../app/hooks/useChangelog';
import useModalFormHelper from '../../app/hooks/useModalFormHelper';
import Form from '../../components/Form/Form';

type Props = {
  productDevelopment?: ProductDevelopmentDataDto;
  sourcedProduction: SourcedProductionDto;
  lastModified?: string;
  artwork?: MediaFileDto;
  production: ProductionDto;
  calculation: PriceCalculationDto | undefined;
  filters?: ServerFilter;
};

const CreatePriceCalculationModal = ({
  productDevelopment,
  sourcedProduction,
  lastModified,
  artwork,
  production,
  calculation,
}: Props) => {
  const outsideRef = useRef(null);
  const { setDirty, leavePageModal } = useModalFormHelper(outsideRef);

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
    production?.vendorId ?? '',
    production.currencyCode ?? ''
  );
  const margins =
    calculation?.priceDtos !== null && calculation?.priceDtos !== undefined
      ? calculation?.priceDtos.map(item => item.margin)
      : null;

  const form = useForm({
    mode: 'onChange',
    defaultValues: {
      productionId: production?.id,
      purchaseCurrency: production.currencyCode,
      currencyRate: calculation?.currencyRate,
      currencyCode: calculation?.currency?.code,
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
    if (isLoadedDefaultValues) {
      form.reset({
        productionId: production.id,
        purchaseCurrency: production.currencyCode,
        currencyRate: defaultValues?.currencyRate,
        currencyCode: defaultValues?.salesCurrency?.code,
        internalCommission: defaultValues?.internalCommission,
        indirectCost: defaultValues?.indirectCost,
        freightIncluded: defaultValues?.freightIncluded,
        margin: defaultValues?.margin,
      });
    }
  }, [
    defaultValues,
    form,
    isLoadedDefaultValues,
    production.currencyCode,
    production.id,
  ]);

  function submitForm(form: FieldValues) {
    createCalculation([form], {
      onSuccess: () => {
        setDirty(false);
        close();
      },
    });
  }

  useEffect(() => {
    setDirty(form.formState.isDirty);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.formState.isDirty]);

  return (
    <>
      {leavePageModal}
      <Box
        ref={outsideRef}
        mb={SPACE.LG}
        px={SPACE.SM}
        maxW={SIZES.CONTAINER.LG}>
        <FormProvider {...form}>
          <Form onSubmit={form.handleSubmit(submitForm)}>
            <ProductDevelopmentModalTopSection
              productDevelopment={productDevelopment}
              sourcingCompanyCode={sourcedProduction?.sourcingCompanyCode}
              vendorName={production?.vendorName}
              actionBar={
                <PriceCalculationActionBar
                  artwork={artwork}
                  createNew={true}
                  lastModified={lastModified}
                  showChanges={showChanges}
                  setShowChanges={(s: boolean) => setShowChanges(s)}
                />
              }
            />
            <Skeleton isLoaded={!isLoadingDefaultValues}>
              <PriceCalculationForm
                calculation={calculation}
                currency={
                  defaultValues?.salesCurrency ??
                  calculation?.currency ??
                  undefined
                }
                createNew={true}
                showChanges={showChanges}
                productionId={production.id}
              />
            </Skeleton>
          </Form>
        </FormProvider>
      </Box>
    </>
  );
};

export default CreatePriceCalculationModal;
