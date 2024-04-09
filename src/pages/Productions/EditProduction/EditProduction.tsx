import { Box, Button, HStack, useOutsideClick } from '@chakra-ui/react';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import ProductDevelopmentModalTopSection from '../../../components/ProductDevelopment/ProductDevelopmentModalTopSection';
import { COLORS, SPACE } from '../../../theme/Constants';
import {
  ChangelogType,
  ProductionDto,
  ProductionExtendedDto,
} from '../../../app/generate';
import { usePatchProduction } from '../../../app/api/editProduction';
import { useGetVendors } from '../../../app/api/vendors';
import { SelectOption, ServerFilter } from '../../../app/types/types';
import { mapVendorsToOptions } from '../../../app/hooks/useFilterOption';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import EditProductionFormContent from './EditProductionFormContent';
import { ModalContext } from '../../../app/context/ModalContext';
import { isClosed } from '../../../app/utils/status';
import ActionBarEditProduction from './ActionBarEditProduction';
import { useToggleChangelog } from '../../../app/hooks/useChangelog';
import { useUnsavedChanges } from '../../../app/hooks/useUnsavedChanges';
import { useTranslation } from 'react-i18next';
import {
  useProduction,
  useProductionNavigation,
} from '../../../app/api/production';
import SpinnerOverlay from '../../../components/Spinner/SpinnerOverlay';
import { useLeavePageContext } from '../../../app/context/LeavePageContext';

type Props = {
  productionId: string;
  filters: ServerFilter;
};

const EditProduction = ({ productionId }: Props) => {
  const ref = useRef(null);
  const { t } = useTranslation();
  const form = useForm();
  const { close } = useContext(ModalContext);
  const { data: vendors } = useGetVendors(false);
  const [, setVendorOptions] = useState<SelectOption[]>([]);
  const [activeProductionId, setActiveProductionId] = useState(productionId);

  const {
    data: productionExt,
    isLoading,
    isRefetching,
  } = useProduction(activeProductionId);

  const production = useMemo(() => {
    const newProduction: Omit<
      ProductionExtendedDto,
      'productDevelopmentDataDto' | 'sourcingCompanyCode'
    > = productionExt || {};
    return newProduction as ProductionDto;
  }, [productionExt]);

  const { data: productionNavigation } =
    useProductionNavigation(activeProductionId);

  const { setUnsavedChanges } = useUnsavedChanges();

  const { showChanges, setShowChanges } = useToggleChangelog(
    ChangelogType.PRODUCTION,
    undefined,
    activeProductionId
  );

  const { mutate: updateProduction } = usePatchProduction(
    !productionExt?.released
  );

  function submitForm(form: FieldValues) {
    updateProduction(form, {
      onSuccess: () => {
        close();
      },
    });
  }

  const { productDevelopmentDataDto, sourcingCompanyCode, vendorName } =
    productionExt || {};

  useEffect(() => {
    if (production) {
      form.reset({ ...production });
    }
  }, [production, form]);

  useEffect(() => {
    if (vendors) {
      setVendorOptions(mapVendorsToOptions(vendors));
    }
  }, [vendors]);

  useEffect(() => {
    setUnsavedChanges(form.formState.isDirty);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.formState.isDirty]);

  useOutsideClick({
    ref: ref,
    handler: () => {
      // TODO: Open confimmodal manuely
    },
  });

  return (
    <Box mb={SPACE.LG} px={SPACE.SM} ref={ref}>
      {(isLoading || isRefetching) && <SpinnerOverlay fillContainer={true} />}
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(submitForm)}>
          <ProductDevelopmentModalTopSection
            productDevelopment={productDevelopmentDataDto}
            sourcingCompanyCode={sourcingCompanyCode}
            vendorName={vendorName}
            actionBar={
              <ActionBarEditProduction
                production={production}
                artwork={productDevelopmentDataDto?.artwork}
                showChanges={showChanges}
                setShowChanges={(s: boolean) => setShowChanges(s)}
                disableEdit={production?.released}
                status={productDevelopmentDataDto?.status}
                createNew={false}
                productDevelopmentNo={productDevelopmentDataDto?.no}
              />
            }
          />
          <EditProductionFormContent
            productDevelopment={productDevelopmentDataDto}
            createNew={false}
            production={production}
            showChanges={showChanges}
            disableEdit={
              production?.released ||
              (productDevelopmentDataDto?.status
                ? isClosed(productDevelopmentDataDto?.status!!)
                : false)
            }
          />
        </form>
      </FormProvider>
      <HStack justify={'space-between'} py={SPACE.XL}>
        <Button
          color={COLORS.BLACK}
          variant={'link'}
          leftIcon={<i className="ri-arrow-left-line" />}
          isDisabled={!productionNavigation?.previous}
          onClick={() =>
            setActiveProductionId(productionNavigation?.previous ?? '')
          }>
          {`${t('Common.Previous')} ${t('PD.FilterLabel.vendor')}`}
        </Button>
        <Button
          color={COLORS.BLACK}
          variant={'link'}
          rightIcon={<i className="ri-arrow-right-line" />}
          isDisabled={!productionNavigation?.next}
          onClick={() =>
            setActiveProductionId(productionNavigation?.next ?? '')
          }>
          {`${t('Common.Next')} ${t('PD.FilterLabel.vendor')}`}
        </Button>
      </HStack>
    </Box>
  );
};

export default EditProduction;
