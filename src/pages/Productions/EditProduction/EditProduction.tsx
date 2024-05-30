import { Box, Button, HStack, Skeleton } from '@chakra-ui/react';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  useDeleteProduction,
  usePatchProduction,
} from '../../../app/api/editProduction';
import {
  useProduction,
  useProductionNavigation,
} from '../../../app/api/production';
import { useGetVendors } from '../../../app/api/vendors';
import { ModalContext } from '../../../app/context/ModalContext';
import {
  ChangelogType,
  ProductionDto,
  ProductionExtendedDto,
  GetFilteredProductDevelopmentDeepWithPaginationQuery as ServerFilter,
} from '../../../app/generate';
import { useToggleChangelog } from '../../../app/hooks/useChangelog';
import useDeleteModal from '../../../app/hooks/useDeleteModal';
import { mapVendorsToOptions } from '../../../app/hooks/useFilterOption';
import useModalFormHelper from '../../../app/hooks/useModalFormHelper';
import { SelectOption } from '../../../app/types/types';
import { isClosed } from '../../../app/utils/status';
import RemixIcon from '../../../components/Icon/RemixIcon';
import ProductDevelopmentModalTopSection from '../../../components/ProductDevelopment/ProductDevelopmentModalTopSection';
import SpinnerOverlay from '../../../components/Spinner/SpinnerOverlay';
import { COLORS, SIZES, SPACE } from '../../../theme/Constants';
import CertificateSection from '../CertificatesSection/CertificatesSection';
import CompositionMaterialSection from '../CompositionMaterial/CompositionMaterialSection';
import ActionBarEditProduction from './ActionBarEditProduction';
import EditProductionFormContent from './EditProductionFormContent';

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

  const [disableEdit, setDisableEdit] = useState<boolean>(false);
  const { showChanges, setShowChanges } = useToggleChangelog(
    ChangelogType.PRODUCTION,
    undefined,
    activeProductionId
  );

  const { mutate: updateProduction } = usePatchProduction(
    !productionExt?.released
  );

  useEffect(() => {
    setDisableEdit(
      production?.released ||
        (productDevelopmentDataDto?.status
          ? isClosed(productDevelopmentDataDto?.status!!)
          : false)
    );
  }, [productDevelopmentDataDto?.status, production?.released]);

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
        setDirty(false);
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
      <Box
        ref={outsideRef}
        mb={SPACE.LG}
        px={SPACE.SM}
        maxW={SIZES.CONTAINER.LG}>
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
            <Skeleton isLoaded={!isLoading && !isRefetching}>
              <EditProductionFormContent
                productDevelopment={productDevelopmentDataDto}
                createNew={false}
                production={production}
                showChanges={showChanges}
                disableEdit={disableEdit}
              />
            </Skeleton>
            <Skeleton isLoaded={!isLoading && !isRefetching}>
              <CertificateSection
                defaultValues={
                  productionExt?.productionCertificates ?? undefined
                }
                disableEdit={disableEdit}
              />
            </Skeleton>
            <Skeleton isLoaded={!isLoading && !isRefetching}>
              <CompositionMaterialSection
                defaultValues={productionExt?.compositions ?? []}
                disableEdit={disableEdit}
              />
            </Skeleton>
          </form>
        </FormProvider>
        <HStack justify={'space-between'} py={SPACE.XL}>
          <Button
            color={COLORS.BLACK}
            variant={'link'}
            leftIcon={<RemixIcon component="i" icon="ARROW_LEFT_LINE" />}
            isDisabled={!productionNavigation?.previous}
            onClick={() => {
              onNavigate(productionNavigation?.previous ?? '');
            }}>
            {`${t('Common.Previous')} ${t('Production.Vendor')}`}
          </Button>
          <Button
            color={COLORS.BLACK}
            variant={'link'}
            rightIcon={<RemixIcon component="i" icon="ARROW_RIGHT_LINE" />}
            isDisabled={!productionNavigation?.next}
            onClick={() => {
              onNavigate(productionNavigation?.next ?? '');
            }}>
            {`${t('Common.Next')} ${t('Production.Vendor')}`}
          </Button>
        </HStack>
      </Box>
    </>
  );
};

export default EditProduction;
