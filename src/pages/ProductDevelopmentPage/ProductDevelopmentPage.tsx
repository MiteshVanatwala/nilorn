import { useEffect, useRef, useState } from 'react';
import ContentPage from '../Templates/ContentPage';
import { useParams } from 'react-router';
import { Grid, GridItem, VStack } from '@chakra-ui/layout';
import { Skeleton } from '@chakra-ui/skeleton';
import { SPACE } from '../../theme/Constants';
import TopSection from './TopSection';
import BottomSection from './BottomSection';
import { Accordion } from '@chakra-ui/accordion';
import AccordionItem from '../../components/AccordionItem/AccordionItem';

function ProductDevelopmentPage() {
  const { productNo } = useParams();

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

  return (
    <>
      <TopSection productNo={productNo ?? ''} scrolledPast={scrolledPast} />
      <ContentPage>
        <Grid>
          <GridItem ref={ref}>
            <VStack spacing={SPACE.XL}>
              <Accordion
                variant={'card'}
                defaultIndex={[0, 1, 3]}
                allowMultiple>
                {new Array(5).fill(null).map(_ => (
                  <AccordionItem title="[TITLE]">
                    <Skeleton w={'100%'} height={'20vh'} />
                  </AccordionItem>
                ))}
              </Accordion>
            </VStack>
          </GridItem>
        </Grid>
      </ContentPage>
      <BottomSection />
    </>
  );
}

export default ProductDevelopmentPage;
