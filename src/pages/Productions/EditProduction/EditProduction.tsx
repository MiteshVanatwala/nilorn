import { Box, useOutsideClick } from '@chakra-ui/react';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import ProductDevelopmentModalTopSection from '../../../components/ProductDevelopment/ProductDevelopmentModalTopSection';
import { SPACE } from '../../../theme/Constants';
import {
  ChangelogType,
  ProductDevelopmentBriefDto,
  ProductionDto,
  PurchasePriceDto,
  SourcedProductionDto,
} from '../../../app/generate';

import {
  useCreateProduction,
  usePatchProduction,
} from '../../../app/api/editProduction';
import { useGetVendors } from '../../../app/api/vendors';
import { SelectOption } from '../../../app/types/types';
import { mapVendorsToOptions } from '../../../app/hooks/useFilterOption';
import { useContext, useEffect, useRef, useState } from 'react';
import EditProductionFormContent from './EditProductionFormContent';
import { ModalContext } from '../../../app/context/ModalContext';
import { useGetSourcingQuantities } from '../../../app/api/SourcingQuantities';
import { isClosed } from '../../../app/utils/status';
import ActionBarEditProduction from './ActionBarEditProduction';
import { useToggleChangelog } from '../../../app/hooks/useChangelog';
import { useUnsavedChanges } from '../../../app/hooks/useUnsavedChanges';
import { useNavigate } from 'react-router';

type Props = {
  productDevelopment?: ProductDevelopmentBriefDto;
  sourcedProduction: SourcedProductionDto;
  createNew?: boolean;
  production?: ProductionDto;
};

const EditProduction = ({
  productDevelopment,
  sourcedProduction,
  createNew,
  production,
}: Props) => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const form = useForm({
    defaultValues: {
      ...production,
    },
  });
  const { close } = useContext(ModalContext);
  const { data: vendors } = useGetVendors(!createNew);
  const [, setVendorOptions] = useState<SelectOption[]>([]);

  const { setUnsavedChanges } = useUnsavedChanges();

  const { showChanges, setShowChanges } = useToggleChangelog(
    ChangelogType.PRODUCTION,
    undefined,
    production?.id
  );

  const { mutate: createProduction, isSuccess: isSuccessCreate } =
    useCreateProduction();
  const { mutate: updateProduction, isSuccess: isSuccessPatch } =
    usePatchProduction(production?.released ? false : true);

  let { data } = useGetSourcingQuantities(
    sourcedProduction?.sourcingId ? sourcedProduction?.sourcingId : '',
    createNew
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
    if (createNew && mappedDefaultQuantities !== undefined) {
      form.setValue('purchasePrices', mappedDefaultQuantities);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createNew, data]);

  function submitForm(form: FieldValues) {
    async function onSubmit(form: FieldValues): Promise<void> {
      if (createNew) {
        createProduction(form);
      } else {
        if (production?.id !== undefined) {
          updateProduction(form);
        }
      }
    }
    onSubmit(form);
  }
  useEffect(() => {
    if (vendors) {
      setVendorOptions(mapVendorsToOptions(vendors));
    }
  }, [vendors]);

  useEffect(() => {
    if (isSuccessCreate || isSuccessPatch) {
      close();
    }
  }, [close, isSuccessCreate, isSuccessPatch]);

  useEffect(() => {
    setUnsavedChanges(form.formState.isDirty);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.formState.isDirty]);

  useOutsideClick({
    ref: ref,
    handler: () => {
      const searchParams = new URLSearchParams(window.location.search);
      navigate(`/productions?${searchParams.toString()}`);
    },
  });

  return (
    <Box mb={SPACE.LG} px={SPACE.SM} ref={ref}>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(submitForm)}>
          <ProductDevelopmentModalTopSection
            productDevelopment={productDevelopment}
            sourcingCompanyCode={sourcedProduction?.sourcingCompanyCode}
            vendorName={production?.vendorName}
            actionBar={
              <ActionBarEditProduction
                artwork={productDevelopment?.artwork}
                showChanges={showChanges}
                setShowChanges={(s: boolean) => setShowChanges(s)}
                disableEdit={production?.released}
                production={production}
                status={productDevelopment?.status}
                createNew={createNew}
              />
            }
          />
          <EditProductionFormContent
            sourcedProduction={sourcedProduction}
            productDevelopment={productDevelopment}
            createNew={createNew}
            production={production}
            showChanges={showChanges}
            disableEdit={
              production?.released ||
              (productDevelopment?.status
                ? isClosed(productDevelopment.status)
                : false)
            }
          />
        </form>
      </FormProvider>
      {/* {modalComponent} */}
    </Box>
  );
};

export default EditProduction;
