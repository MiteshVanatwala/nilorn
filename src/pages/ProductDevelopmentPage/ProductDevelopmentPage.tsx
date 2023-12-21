import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { FieldValues } from 'react-hook-form';
import { useProductDevelopment } from '../../app/api/productDevelopment';
import ProductDevelopmentForm from './Sections/ProductDevelopmentForm';
import SpinnerOverlay from '../../components/Spinner/SpinnerOverlay';
import { Box } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useToast } from '../../app/hooks/useToast';

type Props = {
  createNew: boolean;
};

function ProductDevelopmentPage({ createNew }: Props) {
  const { no } = useParams();
  const { data, isLoading, isError } = useProductDevelopment(no ?? '');
  const [scrolledPast, setScrolledPast] = useState(false);
  const [isSticky, setSticky] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const {t} = useTranslation();
  const { showToast } = useToast();
  const navigate = useNavigate();

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

  if (isLoading) {
    return <SpinnerOverlay />;
  }

  if (isError) {
    navigate('/404');
    showToast({
      status: 'warning',
      title: `${t('PD.Error.NotFound', {no: no})}`,
    });
  }

  if (!isLoading) {
    return (
      <Box ref={ref}>
        <ProductDevelopmentForm
          scrolledPast={scrolledPast}
          defaultValues={data as FieldValues}
          createNew={createNew}
        />
      </Box>
    );
  }
  return <></>;
}
export default ProductDevelopmentPage;
