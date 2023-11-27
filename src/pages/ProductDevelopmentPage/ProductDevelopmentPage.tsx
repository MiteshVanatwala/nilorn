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
import { useForm } from 'react-hook-form';
import AttachmentSection from './Sections/AttachmentSection';
import GeneralSection from './Sections/GeneralSection';
import ProductDesignSection from './Sections/ProductDesignSection';
import MemberSection from './Sections/MemberSection';
import Form, { apiUrl } from '../../components/Form/Form';
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

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        if (window.scrollY > 0 && !isSticky) {
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
  }, [isSticky]);

  return (
    <Form
      postUrl={apiUrl + 'ProductDevelopments'}
      form={form}
      successMsg={`${t('PD.Created')}`}>
      <TopSection
        createNew={createNew}
        productNo={productNo ?? ''}
        scrolledPast={scrolledPast}
      />
      <ContentPage>
        <Grid>
          <GridItem ref={ref}>
            <VStack spacing={SPACE.MD}>
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
    </Form>
  );
}

export default ProductDevelopmentPage;
