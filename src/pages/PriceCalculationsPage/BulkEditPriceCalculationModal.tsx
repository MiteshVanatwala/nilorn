import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { Box, Skeleton } from '@chakra-ui/react';
import { SIZES, SPACE } from '../../theme/Constants';
import ProductDevelopmentModalTopSection from '../../components/ProductDevelopment/ProductDevelopmentModalTopSection';
import PriceCalculationForm from './PriceCalculationForm';
import PriceCalculationActionBar from './PriceCalculationActionBar';
import {
  useDeleteCalculation,
  usePatchCalculation,
} from '../../app/api/calculation';
import { useContext, useEffect, useRef } from 'react';
import { ModalContext } from '../../app/context/ModalContext';
import { useTranslation } from 'react-i18next';
import useModalFormHelper from '../../app/hooks/useModalFormHelper';
import useDeleteModal from '../../app/hooks/useDeleteModal';
import Form from '../../components/Form/Form';
import { PriceCalculationUpdateDtos } from '../../app/generate/models/CreatePriceCalculationCommand';

type Props = {
  calculations: any[];
  productions: any[];
  productDevelopments: any[];
};

const BulkEditPriceCalculationModal = ({
  calculations,
  productions,
}: Props) => {
  const { t } = useTranslation();
  const outsideRef = useRef(null);
  const form = useForm({ mode: 'onChange' });

  const {
    deleteModal,
    isOpen: isDeleteModalOpen,
    setOpen: setDeleteModalOpen,
  } = useDeleteModal(outsideRef, handleDeleteCalculation);

  const { setDirty, leavePageModal } = useModalFormHelper(
    outsideRef,
    calculations[0],
    isDeleteModalOpen
  );
  const { close } = useContext(ModalContext);

  const { mutate: updateCalculation } = usePatchCalculation();
  const { mutate: deleteCalculation, isSuccess: isSuccessDelete } =
    useDeleteCalculation(calculations[0]);

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
    };

    if (productions.length > 0) {
      const firstCurrencyCode = productions[0].currencyCode;
      commonValues.purchaseCurrency = productions.every(
        prod => prod.currencyCode === firstCurrencyCode
      )
        ? firstCurrencyCode
        : null;
    }

    calculations.forEach((calc, index) => {
      if (index === 0) {
        commonValues.currencyRate = calc.currencyRate;
        commonValues.internalCommission = calc.internalCommission;
        commonValues.indirectCost = calc.indirectCost;
        commonValues.freightIncluded = calc.freightIncluded;
        commonValues.currencyCode = calc.currency?.code;

        const priceMargins = calc.priceDtos?.map((p: any) => p.margin) || [];
        commonValues.margin = priceMargins.every(
          (m: number) => m === priceMargins[0]
        )
          ? priceMargins[0]
          : null;
      } else {
        if (commonValues.currencyRate !== calc.currencyRate) {
          commonValues.currencyRate = null;
          commonValues.currencyRatePlaceholder = t(
            'PriceCalc.VariesBetweenEntries'
          );
        }
        if (commonValues.currencyCode !== calc.currency?.code)
          commonValues.currencyCode = null;
        if (commonValues.internalCommission !== calc.internalCommission) {
          commonValues.internalCommission = null;
          commonValues.internalCommissionPlaceholder = t(
            'PriceCalc.VariesBetweenEntries'
          );
        }
        if (commonValues.indirectCost !== calc.indirectCost) {
          commonValues.indirectCost = null;
          commonValues.indirectCostPlaceholder = t(
            'PriceCalc.VariesBetweenEntries'
          );
        }
        if (commonValues.freightIncluded !== calc.freightIncluded) {
          commonValues.freightIncluded = null;
          commonValues.freightIncludedPlaceholder = t(
            'PriceCalc.VariesBetweenEntries'
          );
        }

        const priceMargins = calc.priceDtos?.map((p: any) => p.margin) || [];
        if (commonValues.margin !== null) {
          if (!priceMargins.every((m: number) => m === commonValues.margin)) {
            commonValues.margin = null;
            commonValues.marginPlaceholder = t(
              'PriceCalc.VariesBetweenEntries'
            );
          }
        }
      }
    });

    return commonValues;
  };

  useEffect(() => {
    const commonValues = getCommonValues();
    if (commonValues) {
      form.reset({
        purchaseCurrency: commonValues.purchaseCurrency,
        currencyRate: commonValues.currencyRate,
        currencyCode: commonValues.currencyCode,
        internalCommission: commonValues.internalCommission,
        indirectCost: commonValues.indirectCost,
        freightIncluded: commonValues.freightIncluded,
        margin: commonValues.margin,
      });
    }
  }, [calculations, form]);

  useEffect(() => {
    setDirty(form.formState.isDirty);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.formState.isDirty]);

  function submitForm(form: FieldValues) {
    const priceCalculationUpdateDto: PriceCalculationUpdateDtos = {
      priceCalculationUpdateDtos: calculations.map(p => ({
        id: p.id,
        currencyRate: form.currencyRate || 0,
        currencyCode: form.currencyCode || null,
        internalCommission: form.internalCommission || null,
        indirectCost: form.indirectCost || null,
        freightIncluded: form.freightIncluded || null,
        margin: form.margin || 0,
      })),
    };

    updateCalculation(priceCalculationUpdateDto, {
      onSuccess: () => {
        setDirty(false);
        close();
      },
    });
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

  return (
    <>
      {deleteModal}
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
              sourcingCompanyCode={undefined}
              vendorName={undefined}
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
            <Skeleton isLoaded={true}>
              {calculations.length > 0 &&
                (console.log('Form values:', {
                  currencyCode: form.watch('currencyCode'),
                  currencyFromCalc: calculations[0].currency?.code,
                  commonValues: getCommonValues(),
                }),
                (
                  <PriceCalculationForm
                    key="bulk-edit"
                    calculation={{
                      ...calculations[0],
                      purchaseCurrencyCode: form.watch('purchaseCurrency'),
                      currencyRate: form.watch('currencyRate'),
                      currency: { code: form.watch('currencyCode') },
                      internalCommission: form.watch('internalCommission'),
                      indirectCost: form.watch('indirectCost'),
                      freightIncluded: form.watch('freightIncluded'),
                      priceDtos: calculations[0].priceDtos?.map(
                        (price: any) => ({
                          ...price,
                          margin: form.watch('margin') ?? price.margin,
                        })
                      ),
                    }}
                    currency={{ code: form.watch('currencyCode') }}
                    createNew={false}
                    disableEdit={false}
                    showChanges={false}
                    productionId={calculations[0]?.productionId}
                    isBulkEdit={true}
                    purchaseCurrencyPlaceholder={
                      form.getValues('purchaseCurrency') === null
                        ? t('PriceCalc.VariesBetweenEntries')
                        : undefined
                    }
                    currencyRatePlaceholder={
                      form.getValues('currencyRate') === null
                        ? t('PriceCalc.VariesBetweenEntries')
                        : undefined
                    }
                    internalCommissionPlaceholder={
                      form.getValues('internalCommission') === null
                        ? t('PriceCalc.VariesBetweenEntries')
                        : undefined
                    }
                    indirectCostPlaceholder={
                      form.getValues('indirectCost') === null
                        ? t('PriceCalc.VariesBetweenEntries')
                        : undefined
                    }
                    freightIncludedPlaceholder={
                      form.getValues('freightIncluded') === null
                        ? t('PriceCalc.VariesBetweenEntries')
                        : undefined
                    }
                    marginPlaceholder={
                      form.getValues('margin') === null
                        ? t('PriceCalc.VariesBetweenEntries')
                        : undefined
                    }
                  />
                ))}
            </Skeleton>
          </Form>
        </FormProvider>
      </Box>
    </>
  );
};

export default BulkEditPriceCalculationModal;
