import { useEffect, useRef, useState } from 'react';
import ContentPage from '../Templates/ContentPage';
import { useParams } from 'react-router';
import { Grid, GridItem, Text, VStack } from '@chakra-ui/layout';
import { SPACE } from '../../theme/Constants';
import TopSection from './TopSection';
import BottomSection from './BottomSection';
import { Accordion } from '@chakra-ui/accordion';
import ImagePopup from '../../components/ImagePopup/ImagePopup';
import Popup, {
  PopupPosition,
  PopupTrigger,
} from '../../components/Popup/Popup';
import { IconButton } from '@chakra-ui/button';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import AttachmentSection from './Sections/AttachmentSection';

function ProductDevelopmentPage() {
  const { productNo } = useParams();
  const methods = useForm();

  const [scrolledPast, setScrolledPast] = useState(false);
  const [isSticky, setSticky] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const { top } = ref.current.getBoundingClientRect();
        if (top < 0 && !isSticky) {
          setScrolledPast(true);
          setSticky(true);
        } else if (top > 0 && isSticky) {
          setScrolledPast(false);
          setSticky(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isSticky]);

  const onSave = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={() => methods.handleSubmit(onSave)}>
        <TopSection productNo={productNo ?? ''} scrolledPast={scrolledPast} />
        <ContentPage>
          <Grid>
            <GridItem ref={ref}>
              <VStack spacing={SPACE.XL}>
                <ImagePopup
                  alt={'alt'}
                  src={
                    'https://img.freepik.com/premium-vector/umbrella-vector-sketch-illustrations_183342-139.jpg?w=360'
                  }
                />
                <Popup
                  isPortal={false}
                  trigger={PopupTrigger.CLICK}
                  position={PopupPosition.ABOVE}
                  triggerElement={
                    <IconButton
                      aria-label="cangelog"
                      icon={<Text as={'i'} className={'ri-history-line'} />}
                    />
                  }
                  content={<>Changelog</>}
                />
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
