import { Box, Button, HStack } from '@chakra-ui/react';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import ProductDevelopmentModalTopSection from '../../../components/ProductDevelopment/ProductDevelopmentModalTopSection';
import { COLORS, SPACE } from '../../../theme/Constants';
import {
  ChangelogType,
  ProductionDto,
  ProductionExtendedDto,
} from '../../../app/generate';
import {
  useDeleteProduction,
  usePatchProduction,
} from '../../../app/api/editProduction';
import { useGetVendors } from '../../../app/api/vendors';
import { SelectOption, ServerFilter } from '../../../app/types/types';
import { mapVendorsToOptions } from '../../../app/hooks/useFilterOption';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import EditProductionFormContent from './EditProductionFormContent';
import { ModalContext } from '../../../app/context/ModalContext';
import { isClosed } from '../../../app/utils/status';
import ActionBarEditProduction from './ActionBarEditProduction';
import { useToggleChangelog } from '../../../app/hooks/useChangelog';
import { useTranslation } from 'react-i18next';
import {
  useProduction,
  useProductionNavigation,
} from '../../../app/api/production';
import SpinnerOverlay from '../../../components/Spinner/SpinnerOverlay';
import useModalFormHelper from '../../../app/hooks/useModalFormHelper';
import CompositionMaterialSection from '../CompositionMaterial/CompositionMaterialSection';
import CertificateSection from '../CertificatesSection/CertificatesSection';
import useDeleteModal from '../../../app/hooks/useDeleteModal';

type Props = {
  productionId: string;
  filters: ServerFilter;
};

const EditProduction = ({ productionId }: Props) => {
  const { t } = useTranslation();
  const outsideRef = useRef(null);
  const form = useForm();
  const {
    deleteModal,
    isOpen: isDeleteModalOpen,
    setOpen: setDeleteModalOpen,
  } = useDeleteModal(outsideRef, deleteProductionFunc);

  const {
    activeNavId: activeProductionId,
    onNavigate,
    setDirty,
    leavePageModal,
  } = useModalFormHelper(outsideRef, productionId, isDeleteModalOpen);

  const { close } = useContext(ModalContext);

  const [, setVendorOptions] = useState<SelectOption[]>([]);

  const { data: vendors } = useGetVendors(false);
  const { mutate: deleteProduction, isSuccess: isSuccessDelete } =
    useDeleteProduction();

  const {
    data: productionExt,
    isLoading,
    isRefetching,
  } = useProduction(activeProductionId);
  const { data: productionNavigation } =
    useProductionNavigation(activeProductionId);

  const { productDevelopmentDataDto, sourcingCompanyCode, vendorName } =
    productionExt || {};

  const production = useMemo(() => {
    const newProduction: Omit<
      ProductionExtendedDto,
      'productDevelopmentDataDto' | 'sourcingCompanyCode'
    > = productionExt || {};
    return newProduction as ProductionDto;
  }, [productionExt]);

  const { showChanges, setShowChanges } = useToggleChangelog(
    ChangelogType.PRODUCTION,
    undefined,
    activeProductionId
  );

  const { mutate: updateProduction } = usePatchProduction(
    !productionExt?.released
  );

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
    setDirty(form.formState.isDirty);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.formState.isDirty]);

  function submitForm(form: FieldValues) {
    updateProduction(form, {
      onSuccess: () => {
        close();
      },
    });
  }

  function deleteProductionFunc() {
    deleteProduction({ id: production?.id ?? '' });
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
          <form onSubmit={form.handleSubmit(submitForm)}>
            <ProductDevelopmentModalTopSection
              productDevelopment={productDevelopmentDataDto}
              sourcingCompanyCode={sourcingCompanyCode}
              vendorName={vendorName}
              actionBar={
                <ActionBarEditProduction
                  handleDelete={openDeleteModal}
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
            <CertificateSection
              defaultValues={productionExt?.productionCertificates ?? undefined}
            />
            <CompositionMaterialSection
              defaultValues={productionExt?.compositions ?? []}
            />
          </form>
        </FormProvider>
        <HStack justify={'space-between'} py={SPACE.XL}>
          <Button
            color={COLORS.BLACK}
            variant={'link'}
            leftIcon={<i className="ri-arrow-left-line" />}
            isDisabled={!productionNavigation?.previous}
            onClick={() => {
              onNavigate(productionNavigation?.previous ?? '');
            }}>
            {`${t('Common.Previous')} ${t('PD.FilterLabel.vendor')}`}
          </Button>
          <Button
            color={COLORS.BLACK}
            variant={'link'}
            rightIcon={<i className="ri-arrow-right-line" />}
            isDisabled={!productionNavigation?.next}
            onClick={() => {
              onNavigate(productionNavigation?.next ?? '');
            }}>
            {`${t('Common.Next')} ${t('PD.FilterLabel.vendor')}`}
          </Button>
        </HStack>
      </Box>
    </>
  );
};

export default EditProduction;
