import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { ChangelogType } from '../../app/generate';
import {
  Box,
  Grid,
  GridItem,
  Skeleton,
  useOutsideClick,
} from '@chakra-ui/react';
import { GRID, SPACE } from '../../theme/Constants';
import ProductDevelopmentModalTopSection from '../../components/ProductDevelopment/ProductDevelopmentModalTopSection';
import PriceCalculationForm from './PriceCalculationForm';
import PriceCalculationActionBar from './PriceCalculationActionBar';
import {
  usePatchCalculation,
  usePriceCalculation,
  usePriceCalculationNavigation,
} from '../../app/api/calculation';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { ModalContext } from '../../app/context/ModalContext';
import { useToggleChangelog } from '../../app/hooks/useChangelog';
import { ServerFilter } from '../../app/types/types';
import { useTranslation } from 'react-i18next';
import SpinnerOverlay from '../../components/Spinner/SpinnerOverlay';
import LeavePageModal, {
  ModalRef,
} from '../../components/Modal/LeavePageModal';
import { useUnsavedChanges } from '../../app/hooks/useUnsavedChanges';
import ArrowLink from '../../components/Link/ArrowLink';
import ContentSection from '../Templates/ContentSection';

type Props = {
  calculationId: string;
  filters: ServerFilter;
};

const EditPriceCalculationModal = ({ calculationId, filters }: Props) => {
  const { t } = useTranslation();
  const outsideRef = useRef(null);
  const modalRef = useRef<ModalRef>(null);
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
  const [pendingCalculationId, setPendingCalculationId] = useState<
    string | undefined
  >(undefined);

  const { mutate: updateCalculation } = usePatchCalculation();
  const { close, setPreventClose } = useContext(ModalContext);
  const { discardChanges, setUnsavedChanges, hasUnsavedChanges } =
    useUnsavedChanges();
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

  useEffect(() => {
    setUnsavedChanges(form.formState.isDirty);
    setPreventClose(form.formState.isDirty);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.formState.isDirty]);

  useEffect(() => {
    setPendingCalculationId(undefined);
  }, [activeCalculationId]);

  const openLeavePageModal = () => {
    modalRef.current?.onOpen();
  };

  const onNavigate = (calculationId: string) => {
    setPendingCalculationId(calculationId);

    if (hasUnsavedChanges()) {
      openLeavePageModal();
    } else {
      setActiveCalculationId(calculationId);
    }
  };

  useOutsideClick({
    ref: outsideRef,
    handler: () => {
      if (hasUnsavedChanges()) {
        openLeavePageModal();
        setPreventClose(true);
      } else {
        close();
      }
    },
  });

  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      if (hasUnsavedChanges() && e.key === 'Escape') {
        openLeavePageModal();
        setPendingCalculationId(undefined);
      }
    };

    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keyup', handleKeyUp);
    };
  });

  return (
    <>
      <LeavePageModal
        ref={modalRef}
        onConfirm={() => {
          setPreventClose(false);
          modalRef.current?.onClose();
          discardChanges();
          if (pendingCalculationId) {
            setActiveCalculationId(pendingCalculationId);
          } else {
            close();
          }
        }}
        onCancel={() => {
          setPendingCalculationId(undefined);
        }}
      />

      <Box mb={SPACE.LG} px={SPACE.SM} ref={outsideRef}>
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
