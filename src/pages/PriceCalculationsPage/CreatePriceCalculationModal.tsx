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
import { Box, Button, Skeleton, Text } from '@chakra-ui/react';
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
import BackendErrorBoundary from '../../components/ErrorBoundary/BackendErrorBoundary';
import { priceCalculationCreateDtos } from '../../app/generate/models/CreatePriceCalculationCommand';

import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const outsideRef = useRef(null);
  const { setDirty, leavePageModal, openLeavePageModal, hasUnsavedChanges } = useModalFormHelper(outsideRef);

  const {
    mutate: createCalculation,
    isSuccess: isCreateSuccess,
    isError: isCreateError,
    error: createError,
  } = useCreateCalculation();
  const { close, setCustomCloseHandler, setPreventClose } = useContext(ModalContext);
  const { showChanges, setShowChanges } = useToggleChangelog(
    ChangelogType.PRICE_CALCULATION,
    undefined,
    calculation?.id ?? ''
  );

  const {
    data: defaultValues,
    isLoading: isLoadingDefaultValues,
    isSuccess: isLoadedDefaultValues,
    isError: isDefaultValuesError,
    error: defaultValuesError,
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

  const shouldCrash = Boolean(isDefaultValuesError) || Boolean(isCreateError);
  const shouldCrashRef = useRef(false);
  shouldCrashRef.current = shouldCrash;

  const boundaryError = defaultValuesError ?? createError;
  const errorStatus = (boundaryError as any)?.status;

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

  // Set up the custom close handler
  useEffect(() => {
    const handleCustomClose = () => {
      // If ErrorBoundary fallback is active, always allow closing the modal.
      if (shouldCrashRef.current) {
        close();
        return;
      }

      // Check if there are unsaved changes
      if (hasUnsavedChanges()) {
        // Show unsaved changes modal
        openLeavePageModal();
      } else {
        // No unsaved changes, close modal directly
        close();
      }
    };

    if (setCustomCloseHandler) {
      setCustomCloseHandler(() => handleCustomClose);
    }
    
    // Cleanup: remove custom close handler when component unmounts
    return () => {
      if (setCustomCloseHandler) {
        setCustomCloseHandler(null);
      }
    };
  }, [hasUnsavedChanges, openLeavePageModal, close, setCustomCloseHandler]);

  // Handle Esc key for this modal (including unsaved changes logic)
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();

        if (shouldCrashRef.current) {
          close();
          return;
        }

        // Check if there are unsaved changes
        if (hasUnsavedChanges()) {
          // Show unsaved changes modal
          openLeavePageModal();
        } else {
          // No unsaved changes, close modal directly
          close();
        }
      }
    };

    // Use capture phase to handle before other event listeners
    window.addEventListener('keydown', handleEscKey, true);
    return () => {
      window.removeEventListener('keydown', handleEscKey, true);
    };
  }, [hasUnsavedChanges, openLeavePageModal, close]);

  // Prevent modal from closing when form is dirty
  useEffect(() => {
    setPreventClose(shouldCrash ? false : hasUnsavedChanges());
  }, [hasUnsavedChanges, setPreventClose, shouldCrash]);

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
    const priceCalculationCreateDto: priceCalculationCreateDtos = {
      priceCalculationCreateDtos: [form],
    };

    createCalculation(priceCalculationCreateDto);
  }

  useEffect(() => {
    setDirty(form.formState.isDirty);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.formState.isDirty]);

  useEffect(() => {
    if (isCreateSuccess) {
      setDirty(false);
      close();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [close, isCreateSuccess]);

  return (
    <BackendErrorBoundary
      boundaryName="CreatePriceCalculationModal"
      shouldCrash={shouldCrash}
      errorStatus={errorStatus}
      close={close}>
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
                createNew={true}
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
    </BackendErrorBoundary>
  );
};

export default CreatePriceCalculationModal;
