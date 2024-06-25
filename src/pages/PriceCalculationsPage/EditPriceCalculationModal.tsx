import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import {
  ChangelogType,
  GetFilteredProductDevelopmentDeepWithPaginationQuery as ServerFilter,
} from '../../app/generate';
import { Box, Grid, GridItem, Skeleton } from '@chakra-ui/react';
import { GRID, SPACE } from '../../theme/Constants';
import ProductDevelopmentModalTopSection from '../../components/ProductDevelopment/ProductDevelopmentModalTopSection';
import PriceCalculationForm from './PriceCalculationForm';
import PriceCalculationActionBar from './PriceCalculationActionBar';
import {
  useDeleteCalculation,
  usePatchCalculation,
  usePriceCalculation,
  usePriceCalculationNavigation,
} from '../../app/api/calculation';
import { useContext, useEffect, useMemo, useRef } from 'react';
import { ModalContext } from '../../app/context/ModalContext';
import { useToggleChangelog } from '../../app/hooks/useChangelog';
import { useTranslation } from 'react-i18next';
import SpinnerOverlay from '../../components/Spinner/SpinnerOverlay';
import ArrowLink from '../../components/Link/ArrowLink';
import ContentSection from '../Templates/ContentSection';
import useModalFormHelper from '../../app/hooks/useModalFormHelper';
import useDeleteModal from '../../app/hooks/useDeleteModal';
import Form from '../../components/Form/Form';

type Props = {
  calculationId: string;
  purchaseCurrency: string;
  filters: ServerFilter;
  disableEdit?: boolean;
};

const EditPriceCalculationModal = ({
  calculationId,
  filters,
  purchaseCurrency,
  disableEdit = false,
}: Props) => {
  const { t } = useTranslation();
  const outsideRef = useRef(null);
  const form = useForm({ mode: 'onChange' });
  const {
    deleteModal,
    isOpen: isDeleteModalOpen,
    setOpen: setDeleteModalOpen,
  } = useDeleteModal(outsideRef, deleteProductionFunc);

  const {
    activeNavId: activeCalculationId,
    onNavigate,
    setDirty,
    leavePageModal,
  } = useModalFormHelper(outsideRef, calculationId, isDeleteModalOpen);
  const { close } = useContext(ModalContext);

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
  const { mutate: deleteCalculation, isSuccess: isSuccessDelete } =
    useDeleteCalculation(calculationId);

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

  useEffect(() => {
    if (priceCalculation) {
      form.reset({
        id: priceCalculation?.id,
        purchaseCurrency: purchaseCurrency,
        currencyRate: priceCalculation?.currencyRate,
        currencyCode: priceCalculation?.currency?.code,
        internalCommission: priceCalculation?.internalCommission,
        indirectCost: priceCalculation?.indirectCost,
        freightIncluded: priceCalculation?.freightIncluded,
        margin:
          margins !== null && margins.every(m => m === margins[0])
            ? margins[0]
            : null,
      });
    }
  }, [priceCalculation, form, margins, purchaseCurrency]);

  useEffect(() => {
    setDirty(form.formState.isDirty);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.formState.isDirty]);

  function submitForm(form: FieldValues) {
    updateCalculation(form, {
      onSuccess: () => {
        setDirty(false);
        close();
      },
    });
  }

  function deleteProductionFunc() {
    deleteCalculation();
  }

  const openDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  useEffect(() => {
    if (isSuccessDelete) {
      close();
      setDeleteModalOpen(false);
    }
  }, [close, isSuccessDelete, setDeleteModalOpen]);

  return (
    <>
      {deleteModal}
      {leavePageModal}
      <Box ref={outsideRef} mb={SPACE.LG} px={SPACE.SM}>
        {(isLoading || isRefetching) && <SpinnerOverlay fillContainer={true} />}
        <FormProvider {...form}>
          <Form onSubmit={form.handleSubmit(submitForm)}>
            <ProductDevelopmentModalTopSection
              productDevelopment={priceCalculation?.productDevelopmentDataDto}
              sourcingCompanyCode={priceCalculation?.sourcingCompanyCode}
              vendorName={priceCalculation?.vendorName}
              actionBar={
                <PriceCalculationActionBar
                  handleDelete={openDeleteModal}
                  artwork={priceCalculation?.productDevelopmentDataDto?.artwork}
                  createNew={false}
                  lastModified={priceCalculation?.lastModified ?? ''}
                  showChanges={showChanges}
                  disableEdit={disableEdit}
                  setShowChanges={(s: boolean) => setShowChanges(s)}
                />
              }
            />
            <Skeleton
              isLoaded={!!priceCalculation && !isLoading && !isRefetching}>
              <PriceCalculationForm
                calculation={priceCalculation}
                currency={priceCalculation?.currency ?? undefined}
                createNew={false}
                disableEdit={disableEdit}
                showChanges={showChanges}
                productionId={priceCalculation?.productionId}
              />
            </Skeleton>
          </Form>
        </FormProvider>
        <ContentSection>
          <Grid justifyContent={'space-between'} display={'flex'} py={GRID.GAP}>
            <GridItem>
              {priceCalculationNavigation?.previous && (
                <ArrowLink
                  direction={'left'}
                  onClick={() => {
                    if (priceCalculationNavigation?.previous) {
                      onNavigate(priceCalculationNavigation.previous);
                    }
                  }}>
                  <>{t('Common.Previous')}</>
                </ArrowLink>
              )}
            </GridItem>
            <GridItem>
              {priceCalculationNavigation?.next && (
                <ArrowLink
                  direction={'right'}
                  onClick={() => {
                    if (priceCalculationNavigation?.next) {
                      onNavigate(priceCalculationNavigation.next);
                    }
                  }}>
                  <>{t('Common.Next')}</>
                </ArrowLink>
              )}
            </GridItem>
          </Grid>
        </ContentSection>
      </Box>
    </>
  );
};

export default EditPriceCalculationModal;
