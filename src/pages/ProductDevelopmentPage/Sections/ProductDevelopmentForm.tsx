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
import { ROLES_NOT_ALLOWED_TO_EDIT } from '../../../app/Permissions/Permissions';
import { useCurrentUser } from '../../../app/api/User';
import { useEffect, useState } from 'react';
import { ProductDevelopmentDto } from '../../../app/generate';
import { isClosed } from '../../../app/utils/status';
import { useAuthorized } from '../../../app/Permissions/usePremissions';

type Props = {
  createNew: boolean;
  defaultValues?: ProductDevelopmentDto;
  scrolledPast: boolean;
  no: string;
};

function ProductDevelopmentForm({
  createNew,
  defaultValues,
  scrolledPast,
  no,
}: Props) {
  const showSourcing = useAuthorized('sourcing');
  const { data: user } = useCurrentUser();

  const form = useForm<ProductDevelopmentDto>({
    defaultValues: {
      ...defaultValues,
    },
  });
  const [disableEdit, setDisableEdit] = useState<boolean>(false);
  const { isSubmitSuccessful } = form.formState;

  const { mutate: createProductDevelopment } = useCreateProductDevelopment();
  const { mutate: updateProductDevelopment } = useUpdateProductDevelopment(no);

  function submitForm(form: FieldValues) {
    async function onSubmit(form: FieldValues): Promise<void> {
      if (createNew) {
        createProductDevelopment(form);
      } else {
        updateProductDevelopment(form);
      }
    }
    onSubmit(form);
  }

  useEffect(() => {
    form.setValue('status', defaultValues?.status, { shouldDirty: false });
    form.setValue('members', defaultValues?.members, {
      shouldDirty: false,
    });
    if (
      (defaultValues?.status && isClosed(defaultValues?.status)) ||
      (user?.role && ROLES_NOT_ALLOWED_TO_EDIT.includes(user.role))
    ) {
      setDisableEdit(true);
    } else {
      setDisableEdit(false);
    }
  }, [defaultValues, form, user?.role]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      form.reset(undefined, { keepValues: true, keepIsValid: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(submitForm)}>
        <TopSection
          disableEdit={disableEdit}
          createNew={createNew}
          no={no}
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
                  allowMultiple>
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
                    disableEdit={disableEdit}
                  />
                  {showSourcing && (
                    <SourcingSection no={no} disableEdit={disableEdit} />
                  )}
                </Accordion>
              </VStack>
            </GridItem>
          </Grid>
        </ContentPage>
        <BottomSection />
      </form>
    </FormProvider>
  );
}

export default ProductDevelopmentForm;
