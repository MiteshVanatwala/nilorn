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
  usePriceCalculationDefaultValues,
} from '../../app/api/calculation';
import { useContext, useEffect, useRef } from 'react';
import { ModalContext } from '../../app/context/ModalContext';
import { useToggleChangelog } from '../../app/hooks/useChangelog';
import { ServerFilter } from '../../app/types/types';
import useModalFormHelper from '../../app/hooks/useModalFormHelper';

type Props = {
  productDevelopment?: ProductDevelopmentBriefDto;
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
    true
  );
  const margins =
    calculation?.priceDtos !== null && calculation?.priceDtos !== undefined
      ? calculation?.priceDtos.map(item => item.margin)
      : null;

  const form = useForm({
    defaultValues: {
      productionId: production?.id,
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
    if (isLoadedDefaultValues) {
      form.reset({
        productionId: production.id,
        currencyRate: defaultValues?.currencyRate,
        currencyCode: defaultValues?.salesCurrency?.code,
        internalCommission: defaultValues?.internalCommission,
        indirectCost: defaultValues?.indirectCost,
        freightIncluded: defaultValues?.freightIncluded,
        margin: defaultValues?.margin,
      });
    }
  }, [defaultValues, form, isLoadedDefaultValues, production.id]);

  function submitForm(form: FieldValues) {
    createCalculation(form, {
      onSuccess: () => {
        close();
      },
    });
  }

  useEffect(() => {
    setDirty(form.formState.isDirty);
  }, [form.formState.isDirty, setDirty]);

  return (
    <>
      {leavePageModal}
      <Box ref={outsideRef} mb={SPACE.LG} px={SPACE.SM}>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(submitForm)}>
            <ProductDevelopmentModalTopSection
              productDevelopment={productDevelopment}
              sourcingCompanyCode={sourcedProduction?.sourcingCompanyCode}
              vendorName={production?.vendorName}
              actionBar={
                <PriceCalculationActionBar
                  artwork={artwork}
                  createNew={true}
                  lastModified={lastModified}
                  id={calculation?.id ?? ''}
                  showChanges={showChanges}
                  setShowChanges={(s: boolean) => setShowChanges(s)}
                />
              }
            />
            <Skeleton isLoaded={!isLoadingDefaultValues}>
              <PriceCalculationForm
                calculation={calculation}
                currencyCode={
                  defaultValues?.salesCurrency?.code ??
                  calculation?.currencyCode ??
                  undefined
                }
                createNew={true}
                showChanges={showChanges}
                productionId={production.id}
              />
            </Skeleton>
          </form>
        </FormProvider>
      </Box>
    </>
  );
};

export default CreatePriceCalculationModal;
