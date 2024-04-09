import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { ChangelogType } from '../../app/generate';
import { Box, Button, HStack, Skeleton } from '@chakra-ui/react';
import { COLORS, SPACE } from '../../theme/Constants';
import ProductDevelopmentModalTopSection from '../../components/ProductDevelopment/ProductDevelopmentModalTopSection';
import PriceCalculationForm from './PriceCalculationForm';
import PriceCalculationActionBar from './PriceCalculationActionBar';
import {
  usePatchCalculation,
  usePriceCalculation,
  usePriceCalculationNavigation,
} from '../../app/api/calculation';
import { useContext, useEffect, useMemo, useState } from 'react';
import { ModalContext } from '../../app/context/ModalContext';
import { useToggleChangelog } from '../../app/hooks/useChangelog';
import { ServerFilter } from '../../app/types/types';
import { useTranslation } from 'react-i18next';
import SpinnerOverlay from '../../components/Spinner/SpinnerOverlay';

type Props = {
  calculationId: string;
  filters: ServerFilter;
};

const EditPriceCalculationModal = ({ calculationId, filters }: Props) => {
  const { t } = useTranslation();
  const [activeCalculationId, setActiveCalculationId] = useState(calculationId);
  const { data: priceCalculationNavigation } = usePriceCalculationNavigation(
    activeCalculationId,
    filters
  );
  const {
    data: priceCalculation,
    isLoading,
    isRefetching,
  } = usePriceCalculation(activeCalculationId);

  const { mutate: updateCalculation } = usePatchCalculation();
  const { close } = useContext(ModalContext);
  const { showChanges, setShowChanges } = useToggleChangelog(
    ChangelogType.PRICE_CALCULATION,
    undefined,
    priceCalculation?.id ?? ''
  );

  const margins = useMemo(() => {
    return priceCalculation?.priceDtos
      ? priceCalculation?.priceDtos.map(item => item.margin)
      : null;
  }, [priceCalculation]);

  const form = useForm();

  useEffect(() => {
    if (priceCalculation) {
      form.reset({
        id: priceCalculation?.id,
        currencyRate: priceCalculation?.currencyRate,
        currencyCode: priceCalculation?.currencyCode,
        internalCommission: priceCalculation?.internalCommission,
        indirectCost: priceCalculation?.indirectCost,
        freightIncluded: priceCalculation?.freightIncluded,
        margin:
          margins !== null && margins.every(m => m === margins[0])
            ? margins[0]
            : null,
      });
    }
  }, [priceCalculation, form, margins]);

  function submitForm(form: FieldValues) {
    updateCalculation(form, {
      onSuccess: () => {
        close();
      },
    });
  }

  return (
    <Box mb={SPACE.LG} px={SPACE.SM}>
      {(isLoading || isRefetching) && <SpinnerOverlay fillContainer={true} />}
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(submitForm)}>
          <ProductDevelopmentModalTopSection
            productDevelopment={priceCalculation?.productDevelopmentDataDto}
            sourcingCompanyCode={priceCalculation?.sourcingCompanyCode}
            vendorName={priceCalculation?.vendorName}
            actionBar={
              <PriceCalculationActionBar
                artwork={priceCalculation?.productDevelopmentDataDto?.artwork}
                createNew={false}
                lastModified={priceCalculation?.lastModified ?? ''}
                id={priceCalculation?.id ?? ''}
                showChanges={showChanges}
                setShowChanges={(s: boolean) => setShowChanges(s)}
              />
            }
          />
          <Skeleton isLoaded={!!priceCalculation}>
            <PriceCalculationForm
              calculation={priceCalculation}
              currencyCode={priceCalculation?.currencyCode ?? undefined}
              createNew={false}
              showChanges={showChanges}
              productionId={priceCalculation?.productionId}
            />
          </Skeleton>
        </form>
      </FormProvider>

      <HStack justify={'space-between'} py={SPACE.XL}>
        <Button
          color={COLORS.BLACK}
          variant={'link'}
          leftIcon={<i className="ri-arrow-left-line" />}
          isDisabled={!priceCalculationNavigation?.previous}
          onClick={() =>
            setActiveCalculationId(priceCalculationNavigation?.previous ?? '')
          }>
          {`${t('Common.Previous')} ${t('PD.FilterLabel.vendor')}`}
        </Button>
        <Button
          color={COLORS.BLACK}
          variant={'link'}
          rightIcon={<i className="ri-arrow-right-line" />}
          isDisabled={!priceCalculationNavigation?.next}
          onClick={() =>
            setActiveCalculationId(priceCalculationNavigation?.next ?? '')
          }>
          {`${t('Common.Next')} ${t('PD.FilterLabel.vendor')}`}
        </Button>
      </HStack>
    </Box>
  );
};

export default EditPriceCalculationModal;
