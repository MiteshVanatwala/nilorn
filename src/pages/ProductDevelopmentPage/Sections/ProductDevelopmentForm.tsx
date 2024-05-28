import {
  useCreateProductDevelopment,
  useUpdateProductDevelopment,
} from '../../../app/api/productDevelopment';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import TopSection from './TopSection';
import ContentPage from '../../Templates/ContentPage';
import { Accordion, Grid, GridItem, VStack } from '@chakra-ui/react';
import { SPACE } from '../../../theme/Constants';
import GeneralSection from './GeneralSection';
import ProductDesignSection from './ProductDesignSection';
import MemberSection from './MemberSection';
import AttachmentSection from './AttachmentSection';
import SourcingSection from './SourcingSection';
import BottomSection from './BottomSection';
import { useCurrentUser } from '../../../app/api/User';
import { useEffect, useState } from 'react';
import { ProductDevelopmentDto, Status } from '../../../app/generate';
import { isClosed } from '../../../app/utils/status';
import { scrollNameIntoView } from '../../../app/utils/common';
import {
  useAuthorizedSee,
  useAuthorizedEdit,
} from '../../../app/Permissions/usePremissions';
import { useUnsavedChanges } from '../../../app/hooks/useUnsavedChanges';
import VersionsSection, { Version } from './VersionsSection/VersionsSection';

type Props = {
  createNew: boolean;
  defaultValues?: ProductDevelopmentDto;
  scrolledPast: boolean;
  no: string;
  name: string;
};

function ProductDevelopmentForm({
  createNew,
  defaultValues,
  scrolledPast,
  no,
  name,
}: Props) {
  const showSourcing = useAuthorizedSee('sourcing');
  const allowedToUploadFiles = useAuthorizedEdit('uploadFile');
  const allowedToEdit = useAuthorizedEdit('productDevelopment');

  const versions: Version[] = [
    {
      no: '#123456789',
      name: 'Name',
      status: Status.APPROVED,
      artwork: 'artwork',
      versionSpecification: 'specification',
      sourcings: 'sourcings',
      thumbNailData: '',
    },
    {
      thumbNailData: '',
      name: 'Name',
      no: '#123456789',
      status: Status.CALCULATION,
      artwork: 'artwork',
      versionSpecification: 'specification',
      sourcings: 'sourcings',
    },
    {
      thumbNailData: '',
      name: 'Name Name Name Name Name Name Name Name',
      no: '#123456789',
      status: Status.DESIGN,
      artwork: 'artwork',
      versionSpecification: 'specification',
      sourcings: 'sourcings',
    },
    {
      thumbNailData: '',
      name: 'Name',
      no: '#123456789',
      status: Status.APPROVED,
      artwork: 'artwork',
      versionSpecification: 'specification',
      sourcings: 'sourcings',
    },
    {
      thumbNailData: '',
      name: 'Name Name Name',
      no: '#123456789',
      status: Status.APPROVED,
      artwork: 'artwork',
      versionSpecification: 'specification',
      sourcings: 'sourcings',
    },
  ];

  const { data: user } = useCurrentUser();

  const form = useForm<ProductDevelopmentDto>({
    mode: 'onChange',
    defaultValues: {
      ...defaultValues,
    },
  });

  const { setUnsavedChanges } = useUnsavedChanges();

  const [disableEdit, setDisableEdit] = useState<boolean>(false);
  const { isSubmitSuccessful, errors, isValid } = form.formState;

  const { mutate: createProductDevelopment } = useCreateProductDevelopment();
  const { mutate: updateProductDevelopment } = useUpdateProductDevelopment(no);

  function onSubmit(form: FieldValues) {
    if (createNew) {
      createProductDevelopment(form);
    } else {
      updateProductDevelopment(form);
    }
  }

  useEffect(() => {
    form.setValue('status', defaultValues?.status, { shouldDirty: false });
    form.setValue('members', defaultValues?.members, {
      shouldDirty: false,
    });
    form.reset(defaultValues);
    if (
      (defaultValues?.status && isClosed(defaultValues?.status)) ||
      !allowedToEdit
    ) {
      setDisableEdit(true);
    } else {
      setDisableEdit(false);
    }
  }, [allowedToEdit, defaultValues, form, user?.role]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      form.reset(undefined, { keepValues: true, keepIsValid: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  useEffect(() => {
    const errorKeys = Object.keys(errors) as Array<keyof ProductDevelopmentDto>;
    const firstError = errorKeys.find(key => !!errors[key]);

    if (firstError) {
      form.setFocus(firstError);

      scrollNameIntoView(firstError);
    }
  }, [form, errors, isValid, form.setFocus]);

  useEffect(() => {
    setUnsavedChanges(form.formState.isDirty);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.formState.isDirty]);

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <TopSection
          disableEdit={disableEdit}
          createNew={createNew}
          no={no}
          name={name}
          scrolledPast={scrolledPast}
          hasPriceCalculation={defaultValues?.hasPriceCalculation ?? false}
          hasProductions={defaultValues?.hasProductions ?? false}
        />
        <ContentPage>
          <Grid>
            <GridItem>
              <VStack spacing={SPACE.MD}>
                <Accordion
                  variant={'card'}
                  defaultIndex={createNew ? [0, 1] : [0, 1, 2, 3, 4]}
                  marginBottom={SPACE.XXL}
                  allowMultiple>
                  {versions.length && <VersionsSection versions={versions} />}
                  <GeneralSection
                    createNew={createNew}
                    disableEdit={disableEdit}
                  />
                  <ProductDesignSection disableEdit={disableEdit} />
                  <MemberSection
                    no={no}
                    createNew={createNew}
                    disableEdit={disableEdit}
                  />

                  <AttachmentSection
                    no={no}
                    createNew={createNew}
                    isClosed={
                      defaultValues?.status && isClosed(defaultValues?.status)
                        ? true
                        : false
                    }
                    disableEdit={!allowedToUploadFiles}
                  />
                  {showSourcing && (
                    <SourcingSection no={no} disableEdit={disableEdit} />
                  )}
                </Accordion>
              </VStack>
            </GridItem>
          </Grid>
        </ContentPage>
        <BottomSection no={no} />
      </form>
    </FormProvider>
  );
}

export default ProductDevelopmentForm;
