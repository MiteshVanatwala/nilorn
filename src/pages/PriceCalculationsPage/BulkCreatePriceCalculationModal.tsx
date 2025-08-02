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
import { Box } from '@chakra-ui/react';
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

type Props = {
  productDevelopment?: ProductDevelopmentDataDto[];
  sourcedProduction: SourcedProductionDto[];
  lastModified?: string;
  artwork?: MediaFileDto;
  production: ProductionDto[];
  calculation: PriceCalculationDto[] | undefined[];
  filters?: ServerFilter;
};

const BulkCreatePriceCalculationModal = ({
  productDevelopment,
  sourcedProduction,
  lastModified,
  artwork,
  production,
  calculation,
}: Props) => {
  const { t } = useTranslation();
  const outsideRef = useRef(null);
  const { setDirty, leavePageModal } = useModalFormHelper(outsideRef);

  const { mutate: createCalculation } = useCreateCalculation();
  const { close } = useContext(ModalContext);

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
    console.log(form);
    // createCalculation(form, {
    //   onSuccess: () => {
    //     setDirty(false);
    //     close();
    //   },
    // });
  }

  useEffect(() => {
    setDirty(form.formState.isDirty);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.formState.isDirty]);

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
              productDevelopment={undefined}
              sourcingCompanyCode={null}
              vendorName={null}
              isBulkEdit={true}
              totalPriceCalculations={calculation.length}
              actionBar={
                <PriceCalculationActionBar
                  artwork={artwork}
                  createNew={true}
                  lastModified={lastModified}
                  showChanges={false}
                  setShowChanges={() => {}}
                  isBulkEdit={true}
                />
              }
            />
            <PriceCalculationForm
              calculation={undefined}
              currency={undefined}
              createNew={true}
              showChanges={false}
              productionId={undefined}
            />
          </Form>
        </FormProvider>
      </Box>
    </>
  );
};

export default BulkCreatePriceCalculationModal;
