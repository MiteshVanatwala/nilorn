import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import {
  ChangelogType,
  GetFilteredProductDevelopmentDeepWithPaginationQuery as ServerFilter,
} from '../../app/generate';
import { Box, Grid, GridItem, Skeleton } from '@chakra-ui/react';
import { GRID, SIZES, SPACE } from '../../theme/Constants';
import ProductDevelopmentModalTopSection from '../../components/ProductDevelopment/ProductDevelopmentModalTopSection';
import PriceCalculationForm from './PriceCalculationForm';
import PriceCalculationActionBar from './PriceCalculationActionBar';
import {
  useDeleteCalculation,
  usePatchCalculation,
  usePriceCalculation,
  usePriceCalculationNavigation,
} from '../../app/api/calculation';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { ModalContext } from '../../app/context/ModalContext';
import { useToggleChangelog } from '../../app/hooks/useChangelog';
import { useTranslation } from 'react-i18next';
import SpinnerOverlay from '../../components/Spinner/SpinnerOverlay';
import ContentSection from '../Templates/ContentSection';
import useModalFormHelper from '../../app/hooks/useModalFormHelper';
import useDeleteModal from '../../app/hooks/useDeleteModal';
import Form from '../../components/Form/Form';
import ArrowLink from '../../components/Link/ArrowLink';
import { isClosed } from '../../app/utils/status';
import { PriceCalculationUpdateDtos } from '../../app/generate/models/CreatePriceCalculationCommand';
import { useQueryClient } from 'react-query';

type Props = {
  calculationId: string;
  filters: ServerFilter;
};

const EditPriceCalculationModal = ({ calculationId, filters }: Props) => {
  const { t } = useTranslation();
  const outsideRef = useRef(null);
  const form = useForm({ mode: 'onChange' });
  const [disableEdit, setDisableEdit] = useState<boolean>(false);

  const {
    deleteModal,
    isOpen: isDeleteModalOpen,
    setOpen: setDeleteModalOpen,
  } = useDeleteModal(outsideRef, handleDeleteCalculation);

  const {
    activeNavId: activeCalculationId,
    onNavigate,
    setDirty,
    leavePageModal,
  } = useModalFormHelper(outsideRef, calculationId, isDeleteModalOpen);
  const modalContext = useContext(ModalContext);
  const queryClient = useQueryClient();
  
  // Override the close function to also close inline edit
  const close = () => {
    // Set flag to close inline edit for this calculation
    queryClient.setQueryData(['lastClosedCalculationModal'], activeCalculationId);
    modalContext.close();
  };

  const { data: priceCalculationNavigation } = usePriceCalculationNavigation(
    activeCalculationId,
    filters
  );
  const {
    data: priceCalculation,
    isLoading,
    isRefetching,
  } = usePriceCalculation(activeCalculationId);

  const { productDevelopmentDataDto, sourcingCompanyCode, vendorName } =
    priceCalculation || {};

  const { mutate: updateCalculation, isSuccess: isUpdateSuccess } = usePatchCalculation();
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
        purchaseCurrency: priceCalculation.purchaseCurrencyCode,
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
  }, [priceCalculation, form, margins]);

  useEffect(() => {
    setDirty(form.formState.isDirty);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.formState.isDirty]);

  function submitForm(form: FieldValues) {
    const priceCalculationUpdateDto: PriceCalculationUpdateDtos = {
      priceCalculationUpdateDtos: [form],
    };

    updateCalculation(priceCalculationUpdateDto);
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
      // Close modal and refresh data - this ensures consistent behavior
      // whether changes were made or not
      close();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [close, isUpdateSuccess]);

  useEffect(() => {
    setDisableEdit(
      productDevelopmentDataDto?.status
        ? isClosed(productDevelopmentDataDto?.status)
        : false
    );
  }, [productDevelopmentDataDto?.status]);


  return (
    <>
      {deleteModal}
      {leavePageModal}
      <Box
        ref={outsideRef}
        mb={SPACE.LG}
        px={SPACE.SM}
        maxW={SIZES.CONTAINER.LG}>
        {(isLoading || isRefetching) && <SpinnerOverlay fillContainer={true} />}
        <FormProvider {...form}>
          <Form onSubmit={form.handleSubmit(submitForm)}>
            <ProductDevelopmentModalTopSection
              productDevelopment={productDevelopmentDataDto}
              sourcingCompanyCode={sourcingCompanyCode}
              vendorName={vendorName}
              createNew={false}
              actionBar={
                <PriceCalculationActionBar
                  handleDelete={openDeleteModal}
                  artwork={productDevelopmentDataDto?.artwork}
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
                key={priceCalculation?.id}
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
              <ArrowLink
                direction={'left'}
                onClick={() => {
                  onNavigate(`${priceCalculationNavigation?.previous}`);
                }}
                isDisabled={!priceCalculationNavigation?.previous}>
                <>{t('Common.Previous')}</>
              </ArrowLink>
            </GridItem>
            <GridItem>
              <ArrowLink
                direction={'right'}
                onClick={() => {
                  onNavigate(`${priceCalculationNavigation?.next}`);
                }}
                isDisabled={!priceCalculationNavigation?.next}>
                <>{t('Common.Next')}</>
              </ArrowLink>
            </GridItem>
          </Grid>
        </ContentSection>
      </Box>
    </>
  );
};

export default EditPriceCalculationModal;
