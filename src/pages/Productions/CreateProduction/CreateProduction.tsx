import { Box } from '@chakra-ui/react';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import ProductDevelopmentModalTopSection from '../../../components/ProductDevelopment/ProductDevelopmentModalTopSection';
import { SIZES, SPACE } from '../../../theme/Constants';
import {
  ChangelogType,
  ProductDevelopmentDataDto,
  ProductionDto,
  PurchasePriceDto,
  SourcedProductionDto,
} from '../../../app/generate';

import { useCreateProduction } from '../../../app/api/editProduction';
import { useGetVendors } from '../../../app/api/vendors';
import { SelectOption } from '../../../app/types/types';
import { mapVendorsToOptions } from '../../../app/hooks/useFilterOption';
import { useContext, useEffect, useRef, useState } from 'react';
import EditProductionFormContent from '../EditProduction/EditProductionFormContent';
import { ModalContext } from '../../../app/context/ModalContext';
import { useGetSourcingQuantities } from '../../../app/api/SourcingQuantities';
import { isClosed } from '../../../app/utils/status';
import ActionBarEditProduction from '../EditProduction/ActionBarEditProduction';
import { useToggleChangelog } from '../../../app/hooks/useChangelog';
import useModalFormHelper from '../../../app/hooks/useModalFormHelper';
import CertificateSection from '../CertificatesSection/CertificatesSection';
import CompositionMaterialSection from '../CompositionMaterial/CompositionMaterialSection';
import Form from '../../../components/Form/Form';

type Props = {
  productDevelopment?: ProductDevelopmentDataDto;
  sourcedProduction: SourcedProductionDto;
  production?: ProductionDto;
};

const CreateProduction = ({
  productDevelopment,
  sourcedProduction,
  production,
}: Props) => {
  const outsideRef = useRef(null);
  const { setDirty, leavePageModal } = useModalFormHelper(outsideRef);

  const form = useForm({
    mode: 'onChange',
    defaultValues: production
      ? production
      : {
          moq: null,
          sampleCharge: null,
          toolCharge: null,
          sampleLeadTime: null,
          productionLeadTime: null,
        },
  });
  const { close } = useContext(ModalContext);
  const { data: vendors } = useGetVendors(false);
  const [, setVendorOptions] = useState<SelectOption[]>([]);

  const { showChanges, setShowChanges } = useToggleChangelog(
    ChangelogType.PRODUCTION,
    undefined,
    production?.id
  );

  const { mutate: createProduction } = useCreateProduction();

  let { data } = useGetSourcingQuantities(
    sourcedProduction?.sourcingId ? sourcedProduction?.sourcingId : '',
    true
  );

  useEffect(() => {
    const mappedDefaultQuantities: PurchasePriceDto[] =
      data?.map(
        q =>
          ({
            id: undefined,
            quantity: q ?? null,
            price: undefined,
          } as PurchasePriceDto)
      ) ?? [];
    if (mappedDefaultQuantities !== undefined) {
      form.setValue('purchasePrices', mappedDefaultQuantities);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  function submitForm(form: FieldValues) {
    createProduction(
      {
        ...form,
        purchasePrices: form.purchasePrices.map(
          (q: PurchasePriceDto) =>
            ({
              ...q,
              price: q.price || 0,
            } as PurchasePriceDto)
        ),
      },
      {
        onSuccess: () => {
          setDirty(false);
          close();
        },
      }
    );
  }

  useEffect(() => {
    if (vendors) {
      setVendorOptions(mapVendorsToOptions(vendors));
    }
  }, [vendors]);

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
              productDevelopment={productDevelopment}
              sourcingCompanyCode={sourcedProduction?.sourcingCompanyCode}
              vendorName={production?.vendorName}
              actionBar={
                <ActionBarEditProduction
                  production={production}
                  artwork={productDevelopment?.artwork}
                  showChanges={showChanges}
                  setShowChanges={(s: boolean) => setShowChanges(s)}
                  disableEdit={production?.released}
                  status={productDevelopment?.status}
                  createNew={true}
                  productDevelopmentNo={productDevelopment?.no}
                />
              }
            />
            <EditProductionFormContent
              sourcedProduction={sourcedProduction}
              productDevelopment={productDevelopment}
              createNew={true}
              production={production}
              showChanges={showChanges}
              disableEdit={
                production?.released ||
                (productDevelopment?.status
                  ? isClosed(productDevelopment.status)
                  : false)
              }
            />
            <CertificateSection />
            <CompositionMaterialSection />
          </Form>
        </FormProvider>
      </Box>
    </>
  );
};

export default CreateProduction;
