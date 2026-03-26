import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { Box, Button, Skeleton, Text } from '@chakra-ui/react';
import { SIZES, SPACE } from '../../theme/Constants';
import ProductDevelopmentModalTopSection from '../../components/ProductDevelopment/ProductDevelopmentModalTopSection';
import PriceCalculationForm from './PriceCalculationForm';
import PriceCalculationActionBar from './PriceCalculationActionBar';
import {
  useDeleteCalculation,
  usePatchCalculation,
} from '../../app/api/calculation';
import { useContext, useEffect, useRef, useState } from 'react';
import { ModalContext } from '../../app/context/ModalContext';
import { useTranslation } from 'react-i18next';
import useModalFormHelper from '../../app/hooks/useModalFormHelper';
import useDeleteModal from '../../app/hooks/useDeleteModal';
import Form from '../../components/Form/Form';
import IsolatedControlledModal from '../../components/Modal/IsolatedControlledModal';
import { PriceCalculationUpdateDtos } from '../../app/generate/models/CreatePriceCalculationCommand';
import { useGetDistributionCompaniesOption } from '../../app/api/distributionCompanies';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundaries';
import BackendErrorBoundary from '../../components/ErrorBoundary/BackendErrorBoundary';

type Props = {
  calculations: any[];
  productions: any[];
  productDevelopments: any[];
  hasLoadError?: boolean;
  loadError?: unknown;
};

const BulkEditPriceCalculationModal = ({
  calculations,
  productions,
  hasLoadError = false,
  loadError,
}: Props) => {
  const { t } = useTranslation();
  const outsideRef = useRef(null);
  const form = useForm({ mode: 'onChange' });
  const [showModal, setShowModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const shouldShowCrashRef = useRef(false);
  const [formValuesForModal, setFormValuesForModal] =
    useState<FieldValues | null>(null);
  const [originalValues, setOriginalValues] = useState<{
    currencyCode: string | null;
    currencyRate: number | null;
  }>({ currencyCode: null, currencyRate: null });

  const {
    deleteModal,
    isOpen: isDeleteModalOpen,
    setOpen: setDeleteModalOpen,
  } = useDeleteModal(outsideRef, handleDeleteCalculation);

  const { setDirty, leavePageModal, openLeavePageModal, hasUnsavedChanges } = useModalFormHelper(
    outsideRef,
    calculations[0]?.id || '',
    showConfirmationModal || showModal || isDeleteModalOpen // Prevent outside clicks when any child modal is open
  );
  const { close, setPreventClose, setCustomCloseHandler } = useContext(ModalContext);

  // Set up the custom close handler
  useEffect(() => {
    const handleCustomClose = () => {
      // If the modal is currently showing the ErrorBoundary fallback,
      // always allow closing (don't open "unsaved changes" flow).
      if (shouldShowCrashRef.current) {
        close();
        return;
      }

      // If any child modal is open, let them handle the close
      if (showModal || showConfirmationModal || isDeleteModalOpen) {
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
  }, [showModal, showConfirmationModal, isDeleteModalOpen, hasUnsavedChanges, openLeavePageModal, close, setCustomCloseHandler]);

  // Prevent this modal from closing when child modals are open
  useEffect(() => {
    setPreventClose(showModal || showConfirmationModal || isDeleteModalOpen);
  }, [showModal, showConfirmationModal, isDeleteModalOpen, setPreventClose]);

  // Handle Esc key for this modal (including unsaved changes logic)
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // If any child modal is open, let them handle Esc instead
        if (showModal || showConfirmationModal || isDeleteModalOpen) {
          return; // Don't handle Esc, let child modals handle it
        }

        // No child modals open, handle Esc for this modal
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
  }, [showModal, showConfirmationModal, isDeleteModalOpen, hasUnsavedChanges, openLeavePageModal, close]);
  const {
    mutate: updateCalculation,
    isSuccess: isUpdateSuccess,
    isError: isUpdateError,
    error: updateError,
  } = usePatchCalculation();
  const {
    mutate: deleteCalculation,
    isSuccess: isSuccessDelete,
    isError: isDeleteError,
    error: deleteError,
  } = useDeleteCalculation(calculations[0]?.id || '');
  const { data: distributionCompanies } = useGetDistributionCompaniesOption();

  // Helper function to safely extract primitive values from form fields that might contain SelectOption objects
  const extractValue = (val: any): any => {
    if (!val) return val;
    // Handle deeply nested objects by recursively extracting
    if (typeof val === 'object' && 'value' in val) {
      return extractValue(val.value); // Recursive call to handle nested objects
    }
    return val;
  };

  const getCommonValues = () => {
    if (!calculations.length) return null;

    const commonValues: any = {
      purchaseCurrency: null,
      purchaseCurrencyPlaceholder: null,
      currencyRate: null,
      currencyRatePlaceholder: null,
      currencyCode: null,
      internalCommission: null,
      internalCommissionPlaceholder: null,
      indirectCost: null,
      indirectCostPlaceholder: null,
      freightIncluded: null,
      freightIncludedPlaceholder: null,
      margin: null,
      marginPlaceholder: null,
      distributionCompany: null,
      distributionCompanyPlaceholder: null,
    };

    // Check purchase currency consistency
    if (productions.length > 0) {
      const firstCurrencyCode = productions[0].currencyCode;
      const allSamePurchaseCurrency = productions.every(
        prod => prod.currencyCode === firstCurrencyCode
      );
      if (allSamePurchaseCurrency) {
        commonValues.purchaseCurrencyPlaceholder = firstCurrencyCode;
      } else {
        commonValues.purchaseCurrencyPlaceholder = t('PriceCalc.VariesBetweenEntries');
      }
    }

    // Check sales currency consistency
    const firstSalesCurrency = calculations[0]?.currency?.code;
    const allSameSalesCurrency = calculations.every(
      calc => calc.currency?.code === firstSalesCurrency
    );
    if (allSameSalesCurrency && firstSalesCurrency) {
      commonValues.currencyCode = firstSalesCurrency;
    } else {
      commonValues.currencyCode = t('PriceCalc.VariesBetweenEntries');
    }

    // Check currency rate consistency
    const firstCurrencyRate = calculations[0]?.currencyRate;
    const allSameCurrencyRate = calculations.every(
      calc => calc.currencyRate === firstCurrencyRate
    );
    if (allSameCurrencyRate && firstCurrencyRate !== null && firstCurrencyRate !== undefined) {
      commonValues.currencyRatePlaceholder = firstCurrencyRate.toString();
    } else {
      commonValues.currencyRatePlaceholder = t('PriceCalc.VariesBetweenEntries');
    }

    // Check internal commission consistency
    const firstInternalCommission = calculations[0]?.internalCommission;
    const allSameInternalCommission = calculations.every(
      calc => calc.internalCommission === firstInternalCommission
    );
    if (allSameInternalCommission && firstInternalCommission !== null && firstInternalCommission !== undefined) {
      commonValues.internalCommissionPlaceholder = firstInternalCommission.toString();
    } else {
      commonValues.internalCommissionPlaceholder = t('PriceCalc.VariesBetweenEntries');
    }

    // Check indirect cost consistency
    const firstIndirectCost = calculations[0]?.indirectCost;
    const allSameIndirectCost = calculations.every(
      calc => calc.indirectCost === firstIndirectCost
    );
    if (allSameIndirectCost && firstIndirectCost !== null && firstIndirectCost !== undefined) {
      commonValues.indirectCostPlaceholder = firstIndirectCost.toString();
    } else {
      commonValues.indirectCostPlaceholder = t('PriceCalc.VariesBetweenEntries');
    }

    // Check freight included consistency
    const firstFreightIncluded = calculations[0]?.freightIncluded;
    const allSameFreightIncluded = calculations.every(
      calc => calc.freightIncluded === firstFreightIncluded
    );
    if (allSameFreightIncluded && firstFreightIncluded !== null && firstFreightIncluded !== undefined) {
      commonValues.freightIncludedPlaceholder = firstFreightIncluded.toString();
    } else {
      commonValues.freightIncludedPlaceholder = t('PriceCalc.VariesBetweenEntries');
    }

    // Check margin consistency
    const firstMargin = calculations[0]?.priceDtos?.[0]?.margin;
    const allSameMargin = calculations.every(calc => {
      const margins = calc.priceDtos?.map((p: any) => p.margin) || [];
      return margins.every((m: number) => m === firstMargin);
    });
    if (allSameMargin && firstMargin !== null && firstMargin !== undefined) {
      commonValues.marginPlaceholder = firstMargin.toString();
    } else {
      commonValues.marginPlaceholder = t('PriceCalc.VariesBetweenEntries');
    }

    // Check distribution company consistency
    const firstDistributionCompany = calculations[0]?.distributionCompanyCode;
    const allSameDistributionCompany = calculations.every(
      calc => calc.distributionCompanyCode === firstDistributionCompany
    );
    if (allSameDistributionCompany && firstDistributionCompany) {
      commonValues.distributionCompany = firstDistributionCompany;
    } else if (!allSameDistributionCompany) {
      commonValues.distributionCompanyPlaceholder = t('PriceCalc.VariesBetweenEntries');
    }
    // If allSame but firstDistributionCompany is null, both stay null (empty state)

    return commonValues;
  };

  useEffect(() => {
    const commonValues = getCommonValues();
    if (commonValues) {
      // Store original values for comparison (use first calculation's values)
      setOriginalValues({
        currencyCode: calculations[0]?.currency?.code || null,
        currencyRate: calculations[0]?.currencyRate || null,
      });

      // Reset fields to null (except currencyCode and distributionCompany which get pre-filled)
      const distributionCompanyCode = commonValues.distributionCompany;
      const distributionCompanyLabel = distributionCompanyCode
        ? distributionCompanies?.find((dc: any) => dc.value === distributionCompanyCode)?.label
        : null;

      form.reset({
        purchaseCurrency: null,
        currencyRate: null,
        currencyCode: commonValues.currencyCode === t('PriceCalc.VariesBetweenEntries') ? null : commonValues.currencyCode, // Pre-fill dropdown or null for varies
        internalCommission: null,
        indirectCost: null,
        freightIncluded: null,
        margin: null,
        distributionCompany: distributionCompanyCode
          ? {
              label: distributionCompanyLabel ?? distributionCompanyCode,
              value: distributionCompanyCode,
            }
          : null, // Pre-fill if all same, null if varies
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calculations]);

  useEffect(() => {
    setDirty(form.formState.isDirty);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.formState.isDirty, setDirty]);

  const checkCurrencyVariation = (formValues: FieldValues) => {
    // Check if all existing sales currencies are the same first
    let allSameSalesCurrency = true;
    let firstSalesCurrency: string | null = null;
    if (calculations.length > 0) {
      firstSalesCurrency = calculations[0]?.currency?.code || null;
      allSameSalesCurrency = calculations.every(calc => calc.currency?.code === firstSalesCurrency);
    }

    // Determine what the initial/pre-filled currency value should be
    const initialCurrencyCode = allSameSalesCurrency ? firstSalesCurrency : null;

    // Check if user has actually modified sales currency from its initial state
    const hasSalesCurrencySelected = formValues.currencyCode !== null && 
      formValues.currencyCode !== initialCurrencyCode;

    // Check if user has modified currency rate (filled in the field)
    const hasCurrencyRateSelected = formValues.currencyRate !== null && 
      formValues.currencyRate !== originalValues.currencyRate;

    // Only show warning if user has actually modified currency or rate from initial values
    const hasUserModifiedCurrency = hasSalesCurrencySelected || hasCurrencyRateSelected;

    if (!hasUserModifiedCurrency) {
      return false;
    }

    // Check if all purchase currencies are the same
    let allSamePurchaseCurrency = true;
    if (productions.length > 0) {
      const firstPurchaseCurrency = productions[0]?.currencyCode;
      allSamePurchaseCurrency = productions.every(prod => prod.currencyCode === firstPurchaseCurrency);
    }

    // Special case: If user is only changing the sales currency (not currency rate),
    // and all records have the same purchase currency AND same sales currency, don't show popup
    if (hasSalesCurrencySelected && !hasCurrencyRateSelected) {
      // If all records have the same purchase and sales currencies, don't show popup
      if (allSamePurchaseCurrency && allSameSalesCurrency) {
        return false;
      }
    }

    // Check if selected entries have different purchase currencies
    let hasDifferentPurchaseCurrencies = false;
    if (productions.length > 0) {
      // Get all unique purchase currencies from selected productions
      const purchaseCurrencies = [...new Set(productions.map(prod => prod.currencyCode))];
      hasDifferentPurchaseCurrencies = purchaseCurrencies.length > 1;
    }

    // Check if selected entries have different sales currencies
    let hasDifferentSalesCurrencies = !allSameSalesCurrency;

    // Show warning if:
    // 1. User has selected/modified currency or rate, AND
    // 2. Selected entries have different purchase currencies OR different sales currencies
    return hasDifferentPurchaseCurrencies || hasDifferentSalesCurrencies;
  };

  function handleFormSubmit(formValues: FieldValues) {
    const commonValues = getCommonValues();
    const priceCalculationUpdateDto: PriceCalculationUpdateDtos = {
      priceCalculationUpdateDtos: calculations.map(p => ({
        id: p.id,
        // Use form value if it has been modified (not null/undefined/empty), otherwise keep existing value
        currencyRate: formValues.currencyRate !== null && formValues.currencyRate !== undefined && formValues.currencyRate !== '' 
          ? formValues.currencyRate 
          : p.currencyRate,
        currencyCode: formValues.currencyCode !== null && formValues.currencyCode !== undefined && formValues.currencyCode !== '' 
          ? extractValue(formValues.currencyCode)
          : p.currency?.code,
        internalCommission: formValues.internalCommission !== null && formValues.internalCommission !== undefined && formValues.internalCommission !== '' 
          ? formValues.internalCommission 
          : p.internalCommission,
        indirectCost: formValues.indirectCost !== null && formValues.indirectCost !== undefined && formValues.indirectCost !== '' 
          ? formValues.indirectCost 
          : p.indirectCost,
        freightIncluded: formValues.freightIncluded !== null && formValues.freightIncluded !== undefined && formValues.freightIncluded !== '' 
          ? formValues.freightIncluded 
          : p.freightIncluded,
        margin: formValues.margin !== null && formValues.margin !== undefined && formValues.margin !== '' 
          ? formValues.margin
          : (p.priceDtos?.[0]?.margin ?? 0),
        // If distributionCompany has value, save for all entries; if empty, keep existing value per entry
        distributionCompanyCode: formValues.distributionCompany !== null && formValues.distributionCompany !== undefined && formValues.distributionCompany !== ''
          ? (typeof formValues.distributionCompany === 'object' ? formValues.distributionCompany?.value : formValues.distributionCompany)
          : p.distributionCompanyCode,
      })),
    };

    updateCalculation(priceCalculationUpdateDto);
  }

  function submitForm(formValues: FieldValues) {
    const isBulkEdit = true;
    const commonValues = getCommonValues();
    const distributionCompanyPlaceholder = commonValues?.distributionCompanyPlaceholder;
    
    // Check if distributionCompany has a value
    const hasValue = typeof formValues.distributionCompany === 'object' 
      ? formValues.distributionCompany?.value 
      : formValues.distributionCompany;
    
    if (!hasValue && (!isBulkEdit || !distributionCompanyPlaceholder)) {
      form.setError('distributionCompany', {
        type: 'required',
        message: t('Errors.Required')
      });
      return;
    }

    const hasCurrencyVariation = checkCurrencyVariation(formValues);
    setFormValuesForModal(formValues);

    if (hasCurrencyVariation) {
      setShowModal(true);
    } else {
      setShowConfirmationModal(true);
    }
  }

  function handleDeleteCalculation() {
    deleteCalculation();
  }

  const openDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  useEffect(() => {
    if (isSuccessDelete) {
      setDirty(false);
      close();
      setDeleteModalOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [close, isSuccessDelete, setDeleteModalOpen]);

  useEffect(() => {
    if (isUpdateSuccess) {
      setDirty(false);
      close();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [close, isUpdateSuccess]);

  const shouldShowCrash =
    Boolean(hasLoadError) || Boolean(isUpdateError) || Boolean(isDeleteError);

  // Keep the latest crash state for the custom close handler.
  shouldShowCrashRef.current = shouldShowCrash;

  const boundaryError =
    loadError ?? updateError ?? deleteError ?? undefined;

  const errorStatus = (boundaryError as any)?.status;

  // When the modal is showing an error boundary fallback, we don't want the
  // "unsaved changes" logic to block closing via the modal X/overlay.
  useEffect(() => {
    if (!setCustomCloseHandler) return;
    if (shouldShowCrash) {
      setCustomCloseHandler(null);
      setPreventClose(false);
    }
  }, [shouldShowCrash, setCustomCloseHandler, setPreventClose]);

  return (
    <BackendErrorBoundary
      boundaryName="BulkEditPriceCalculationModal"
      shouldCrash={shouldShowCrash}
      errorStatus={errorStatus}
      close={close}>
      <>
        {deleteModal}
        {!showModal && !showConfirmationModal && leavePageModal}

        {showModal && (
          <IsolatedControlledModal
            key="currencyModal"
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            title={t('PriceCalc.CurrencyVariationDetected')}
            description={t('PriceCalc.CurrencyVariationDetectedDesc')}
            onConfirm={() => {
              setShowModal(false);
              setShowConfirmationModal(true);
            }}
            onCancel={() => {
              setShowModal(false);
            }}
          />
        )}

        {showConfirmationModal && (
          <IsolatedControlledModal
            key="confirmationModal"
            isOpen={showConfirmationModal}
            onClose={() => setShowConfirmationModal(false)}
            title={t('PriceCalc.UdpatePriceCalculationConfirmationTitle')}
            description={t(
              'PriceCalc.UdpatePriceCalculationConfirmationDesc',
              {
                X: calculations.length,
              }
            )}
            onConfirm={() => {
              if (formValuesForModal) {
                handleFormSubmit(formValuesForModal);
              }
              setShowConfirmationModal(false);
            }}
            onCancel={() => {
              setShowConfirmationModal(false);
            }}
          />
        )}
        <Box
          ref={outsideRef}
          mb={SPACE.LG}
          px={SPACE.SM}
          maxW={SIZES.CONTAINER.LG}>
          <FormProvider {...form}>
            <Form onSubmit={form.handleSubmit(submitForm)}>
              <ProductDevelopmentModalTopSection
                productDevelopment={undefined}
                sourcingCompanyCode={undefined}
                vendor={null}
                isBulkEdit={true}
                totalPriceCalculations={calculations.length}
                createNew={false}
                actionBar={
                  <PriceCalculationActionBar
                    handleDelete={openDeleteModal}
                    artwork={undefined}
                    createNew={false}
                    lastModified={undefined}
                    showChanges={false}
                    disableEdit={false}
                    setShowChanges={() => {}}
                    isBulkEdit={true}
                  />
                }
              />
              <Skeleton isLoaded={calculations.length > 0}>
                <PriceCalculationForm
                  key="bulk-edit"
                  calculation={{
                    ...calculations[0],
                    purchaseCurrencyCode: extractValue(form.watch('purchaseCurrency')),
                    currencyRate: form.watch('currencyRate'),
                    currency: { code: extractValue(form.watch('currencyCode')) },
                    internalCommission: form.watch('internalCommission'),
                    indirectCost: form.watch('indirectCost'),
                    freightIncluded: form.watch('freightIncluded'),
                    distributionCompanyCode: extractValue(form.watch('distributionCompany')) || (getCommonValues()?.distributionCompany ? getCommonValues()?.distributionCompany : null),
                    distributionCompanyName: distributionCompanies?.find(
                      (dc: any) => dc.value === (extractValue(form.watch('distributionCompany')) || getCommonValues()?.distributionCompany)
                    )?.label,
                    priceDtos: calculations[0]?.priceDtos?.map((price: any) => ({
                      ...price,
                      margin: form.watch('margin') ?? price.margin,
                    })),
                  }}
                  currency={{ code: extractValue(form.watch('currencyCode')) }}
                  createNew={false}
                  disableEdit={false}
                  showChanges={false}
                  productionId={calculations[0]?.productionId}
                  isBulkEdit={true}
                  purchaseCurrencyPlaceholder={
                    getCommonValues()?.purchaseCurrencyPlaceholder
                  }
                  currencyCodePlaceholder={
                    getCommonValues()?.currencyCode ===
                    t('PriceCalc.VariesBetweenEntries')
                      ? getCommonValues()?.currencyCode
                      : undefined
                  }
                  currencyRatePlaceholder={
                    getCommonValues()?.currencyRatePlaceholder
                  }
                  internalCommissionPlaceholder={
                    getCommonValues()?.internalCommissionPlaceholder
                  }
                  indirectCostPlaceholder={
                    getCommonValues()?.indirectCostPlaceholder
                  }
                  freightIncludedPlaceholder={
                    getCommonValues()?.freightIncludedPlaceholder
                  }
                  distributionCompanyPlaceholder={
                    getCommonValues()?.distributionCompanyPlaceholder
                  }
                  marginPlaceholder={getCommonValues()?.marginPlaceholder}
                />
              </Skeleton>
            </Form>
          </FormProvider>
          <Box mt={SPACE.LG}>
            <Text fontSize="sm" color="red.600" fontStyle="italic">
              *&nbsp;{t('PriceCalc.UnchangedFieldsInstruction')}
            </Text>
          </Box>
        </Box>
      </>
    </BackendErrorBoundary>
    );
};

export default BulkEditPriceCalculationModal;
