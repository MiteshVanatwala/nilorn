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
import { useCreateCalculation } from '../../app/api/calculation';
import { useContext, useEffect, useRef } from 'react';
import { ModalContext } from '../../app/context/ModalContext';
import useModalFormHelper from '../../app/hooks/useModalFormHelper';
import Form from '../../components/Form/Form';
import { useTranslation } from 'react-i18next';
import { priceCalculationCreateDtos } from '../../app/generate/models/CreatePriceCalculationCommand';
import BackendErrorBoundary from '../../components/ErrorBoundary/BackendErrorBoundary';

type Props = {
  isLoading: boolean;
  production: ProductionDto[];
  calculation: PriceCalculationDto[] | undefined[];
  hasLoadError?: boolean;
  loadError?: unknown;
};

const BulkCreatePriceCalculationModal = ({
  isLoading,
  production,
  calculation,
  hasLoadError = false,
  loadError,
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

  const shouldCrash = Boolean(hasLoadError) || Boolean(isCreateError);
  const shouldCrashRef = useRef(false);
  shouldCrashRef.current = shouldCrash;

  const errorStatus =
    (loadError as any)?.status ?? (createError as any)?.status;

  const form = useForm({
    mode: 'onChange',
    defaultValues: {
      productionId: null,
      purchaseCurrency: production?.every(
        p => p.currencyCode === production[0]?.currencyCode
      )
        ? production[0]?.currencyCode
        : t('PriceCalc.VariesBetweenEntries'),
      currencyRate: null,
      currencyCode: null,
      internalCommission: null,
      indirectCost: null,
      freightIncluded: null,
      margin: null,
    },
  });

  // Set up the custom close handler
  useEffect(() => {
    const handleCustomClose = () => {
      // If the ErrorBoundary fallback is active, always allow closing.
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
    form.reset({
      productionId: null,
      purchaseCurrency: production?.every(
        p => p.currencyCode === production[0]?.currencyCode
      )
        ? production[0]?.currencyCode
        : t('PriceCalc.VariesBetweenEntries'),
      currencyRate: null,
      currencyCode: null,
      internalCommission: null,
      indirectCost: null,
      freightIncluded: null,
      margin: null,
    });
  }, [form, production]);

  function submitForm(form: FieldValues) {
    const priceCalculationCreateDto: priceCalculationCreateDtos = {
      priceCalculationCreateDtos: production.map(p => ({
        productionId: p.id,
        currencyRate: form.currencyRate || 0,
        currencyCode: form.currencyCode || null,
        internalCommission: form.internalCommission || null,
        indirectCost: form.indirectCost || null,
        freightIncluded: form.freightIncluded || null,
        margin: form.margin === '' || form.margin === null || form.margin === undefined ? 0 : form.margin,
        distributionCompanyCode: typeof form.distributionCompany === 'object' ? form.distributionCompany?.value : form.distributionCompany || null,
      })),
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
      boundaryName="BulkCreatePriceCalculationModal"
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
                productDevelopment={undefined}
                sourcingCompanyCode={null}
                vendor={null}
                isBulkEdit={true}
                totalPriceCalculations={production.length}
                createNew={true}
                actionBar={
                  <PriceCalculationActionBar
                    artwork={undefined}
                    createNew={true}
                    lastModified={undefined}
                    showChanges={false}
                    setShowChanges={() => {}}
                    isBulkEdit={true}
                  />
                }
              />
              <Skeleton isLoaded={!isLoading}>
                <PriceCalculationForm
                  calculation={undefined}
                  currency={undefined}
                  createNew={true}
                  showChanges={false}
                  productionId={undefined}
                />
              </Skeleton>
            </Form>
          </FormProvider>
        </Box>
      </>
    </BackendErrorBoundary>
  );
};

export default BulkCreatePriceCalculationModal;
