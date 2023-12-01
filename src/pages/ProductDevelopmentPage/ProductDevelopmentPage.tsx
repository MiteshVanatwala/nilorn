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
import { useToast } from '../../app/hooks/useToast';
import { useCreateProductDevelopment } from '../../app/api/CreateProductDevelopment';
import { useTranslation } from 'react-i18next';

type Props = {
  createNew?: boolean;
};

function ProductDevelopmentPage({ createNew }: Props) {
  const { productNo } = useParams();
  const form = useForm();
  const { t } = useTranslation();

  const [scrolledPast, setScrolledPast] = useState(false);
  const [isSticky, setSticky] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { showToast } = useToast();
  const {
    mutate: createProductDevelopment,
    isSuccess,
    isError,
  } = useCreateProductDevelopment();

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        if (window.scrollY > 0 && !isSticky) {
          console.log(window.scrollY, scrolledPast);
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
      createProductDevelopment(form);
      if (isSuccess) {
        showToast({
          status: 'success',
          description: `${t('PD.Created')}`,
        });
      }
      if (isError) {
        showToast({
          status: 'error',
          description: `${t('PD.Error')}`,
        });
      }
    }
    onSubmit(form);
  }
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(submitForm)}
        onChange={() => form.clearErrors('serverError')}>
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
