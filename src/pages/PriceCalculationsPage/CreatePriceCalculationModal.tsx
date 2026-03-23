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
import { useContext, useEffect, useRef, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useOpCompOption } from '../../app/api/FilterInfo';
import { useGetDistributionCompaniesOption } from '../../app/api/distributionCompanies';
import { ModalContext } from '../../app/context/ModalContext';
import { useToggleChangelog } from '../../app/hooks/useChangelog';
import useModalFormHelper from '../../app/hooks/useModalFormHelper';
import Form from '../../components/Form/Form';
import { priceCalculationCreateDtos } from '../../app/generate/models/CreatePriceCalculationCommand';
import { useGetVendors } from '../../app/api/vendors';

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

  const { mutate: createCalculation, isSuccess: isCreateSuccess } = useCreateCalculation();
  const { close, setCustomCloseHandler, setPreventClose } = useContext(ModalContext);
  const { showChanges, setShowChanges } = useToggleChangelog(
    ChangelogType.PRICE_CALCULATION,
    undefined,
    calculation?.id ?? ''
  );
  const { data: vendors } = useGetVendors(false);

  const { data: sourcingCompanies } = useOpCompOption(true, true);
  const { data: distributionCompanies } = useGetDistributionCompaniesOption(true);
  
  const sourcingCompanyName = useMemo(() => {
    if (!sourcedProduction?.sourcingCompanyCode || !sourcingCompanies) return undefined;
    const company = sourcingCompanies.find(
      (c: any) => c.value === sourcedProduction.sourcingCompanyCode
    );
    return company?.label;
  }, [sourcedProduction?.sourcingCompanyCode, sourcingCompanies]);

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

  const distributionCompanyName = useMemo(() => {
    if (!defaultValues?.distributionCompanyCode || !distributionCompanies) return undefined;
    const company = distributionCompanies.find(
      (c: any) => c.value === defaultValues.distributionCompanyCode
    );
    return company?.label;
  }, [defaultValues?.distributionCompanyCode, distributionCompanies]);

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
      distributionCompany: undefined as string | undefined,
    },
  });

  // Set up the custom close handler
  useEffect(() => {
    const handleCustomClose = () => {
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
    setPreventClose(hasUnsavedChanges());
  }, [hasUnsavedChanges, setPreventClose]);

  useEffect(() => {
    if (isLoadedDefaultValues) {
      const shouldSetDefault = (production.priceCalculations === undefined || production.priceCalculations?.length === 0) && defaultValues?.distributionCompanyCode;
      form.reset({
        productionId: production.id,
        purchaseCurrency: production.currencyCode,
        currencyRate: defaultValues?.currencyRate,
        currencyCode: defaultValues?.salesCurrency?.code,
        internalCommission: defaultValues?.internalCommission,
        indirectCost: defaultValues?.indirectCost,
        freightIncluded: defaultValues?.freightIncluded,
        margin: defaultValues?.margin,
        distributionCompany: shouldSetDefault
          ? {
              label: distributionCompanyName ?? defaultValues.distributionCompanyCode,
              value: defaultValues.distributionCompanyCode,
            }
          : null,
      } as any);
    }
  }, [
    defaultValues,
    form,
    isLoadedDefaultValues,
    production.currencyCode,
    production.id,
    production.priceCalculations?.length,
    distributionCompanyName,
  ]);

  function submitForm(formData: FieldValues) {
    const isBulkEdit = false;
    const distributionCompanyPlaceholder = null;
    
    // Check if distributionCompany has a value
    const hasValue = typeof formData.distributionCompany === 'object' 
      ? formData.distributionCompany?.value 
      : formData.distributionCompany;
    
    if (!hasValue && (!isBulkEdit || !distributionCompanyPlaceholder)) {
      form.setError('distributionCompany', {
        type: 'required',
        message: t('Errors.Required')
      });
      return;
    }

    const priceCalculationCreateDto: priceCalculationCreateDtos = {
      priceCalculationCreateDtos: [{
        ...formData,
        distributionCompanyCode: typeof formData.distributionCompany === 'object' ? formData.distributionCompany?.value : formData.distributionCompany,
        margin: formData.margin === '' || formData.margin === null || formData.margin === undefined ? 0 : formData.margin
      }],
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
              vendor={vendors?.find(vendor => vendor.id === production?.vendorId) ?? null}
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
                calculation={{
                  ...calculation,
                  distributionCompanyCode: (production.priceCalculations === undefined || production.priceCalculations?.length === 0) && defaultValues?.distributionCompanyCode ? defaultValues?.distributionCompanyCode : undefined,
                  distributionCompanyName: (production.priceCalculations === undefined || production.priceCalculations?.length === 0) && distributionCompanyName ? distributionCompanyName : undefined,
                }}
                currency={
                  defaultValues?.salesCurrency ??
                  calculation?.currency ??
                  undefined
                }
                createNew={true}
                showChanges={showChanges}
                productionId={production.id}
                distributionCompanyCode={(production.priceCalculations === undefined || production.priceCalculations?.length === 0) && defaultValues?.distributionCompanyCode ? defaultValues?.distributionCompanyCode : undefined}
                distributionCompanyName={(production.priceCalculations === undefined || production.priceCalculations?.length === 0) && distributionCompanyName ? distributionCompanyName : undefined}
              />
            </Skeleton>
          </Form>
        </FormProvider>
      </Box>
    </>
  );
};

export default CreatePriceCalculationModal;
