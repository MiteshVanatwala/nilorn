import {
  useCreateProductDevelopment,
  useUpdateProductDevelopment,
} from '../../../app/api/productDevelopment';
import { useParams } from 'react-router';
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

type Props = {
  createNew: boolean;
  defaultValues?: FieldValues;
  scrolledPast: boolean;
};

function ProductDevelopmentForm({
  createNew,
  defaultValues,
  scrolledPast,
}: Props) {
  const { no } = useParams();

  const form = useForm({
    defaultValues: {
      ...defaultValues,
    },
  });

  const { mutate: createProductDevelopment } = useCreateProductDevelopment();
  const { mutate: updateProductDevelopment } = useUpdateProductDevelopment(
    no ?? ''
  );

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

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(submitForm)}>
        <TopSection
          createNew={createNew}
          no={no ?? ''}
          scrolledPast={scrolledPast}
        />
        <ContentPage>
          <Grid>
            <GridItem>
              <VStack spacing={SPACE.MD}>
                <Accordion
                  variant={'card'}
                  defaultIndex={createNew ? [0, 1, 3] : [0, 1, 2, 3]}
                  allowMultiple>
                  <GeneralSection />
                  <ProductDesignSection />
                  <MemberSection createNew={createNew} />
                  <AttachmentSection />
                  <SourcingSection />
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
