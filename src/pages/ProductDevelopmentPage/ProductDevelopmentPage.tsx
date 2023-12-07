import { useEffect, useRef, useState } from 'react';
import ContentPage from '../Templates/ContentPage';
import { useParams } from 'react-router';
import { Grid, GridItem, VStack } from '@chakra-ui/layout';
import { SPACE } from '../../theme/Constants';
import TopSection from './TopSection';
import BottomSection from './BottomSection';
import { Accordion } from '@chakra-ui/accordion';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import AttachmentSection from './Sections/AttachmentSection';
import GeneralSection from './Sections/GeneralSection';
import ProductDesignSection from './Sections/ProductDesignSection';
import MemberSection from './Sections/MemberSection';
import {
  useCreateProductDevelopment,
  useProductDevelopment,
  useUpdateProductDevelopment,
} from '../../app/api/productDevelopment';
import SourcingSection from './Sections/SourcingSection';

type Props = {
  createNew?: boolean;
};

function ProductDevelopmentPage({ createNew }: Props) {
  const { productNo } = useParams();
  const { data } = useProductDevelopment(productNo ?? '');
  const form = useForm({
    defaultValues: {
      ...data,
    },
  });

  const [scrolledPast, setScrolledPast] = useState(false);
  const [isSticky, setSticky] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const { mutate: createProductDevelopment } = useCreateProductDevelopment();
  const { mutate: updateProductDevelopment } = useUpdateProductDevelopment(
    productNo ?? ''
  );

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const topSection = document.getElementById('top-section');

        if (
          topSection?.offsetHeight &&
          window.scrollY > topSection?.offsetHeight &&
          !isSticky
        ) {
          setScrolledPast(true);
          setSticky(true);
        } else if (window.scrollY === 0 && isSticky) {
          setScrolledPast(false);
          setSticky(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSticky]);

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
          productNo={productNo ?? ''}
          scrolledPast={scrolledPast}
        />
        <ContentPage>
          <Grid>
            <GridItem ref={ref}>
              <VStack spacing={SPACE.MD}>
                <Accordion
                  variant={'card'}
                  defaultIndex={[0, 1, 3]}
                  allowMultiple>
                  <GeneralSection />
                </Accordion>
                <Accordion
                  variant={'card'}
                  defaultIndex={[0, 1, 3]}
                  allowMultiple>
                  <ProductDesignSection />
                </Accordion>
                <Accordion
                  variant={'card'}
                  defaultIndex={createNew ? undefined : [0, 1, 3]}
                  alignItems={scrolledPast ? 'center' : 'flex-start'}
                  allowMultiple>
                  <MemberSection createNew />
                </Accordion>
                <Accordion
                  variant={'card'}
                  defaultIndex={[0, 1, 3]}
                  allowMultiple>
                  <AttachmentSection />
                </Accordion>
                <Accordion
                  variant={'card'}
                  defaultIndex={[0, 1, 3]}
                  allowMultiple>
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

export default ProductDevelopmentPage;
