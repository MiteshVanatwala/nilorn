import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { FieldValues } from 'react-hook-form';
import { useProductDevelopment } from '../../app/api/productDevelopment';
import ProductDevelopmentForm from './Sections/ProductDevelopmentForm';
import SpinnerOverlay from '../../components/Spinner/SpinnerOverlay';

type Props = {
  createNew: boolean;
};

function ProductDevelopmentPage({ createNew }: Props) {
  const { no } = useParams();
  const { data, isLoading } = useProductDevelopment(no ?? '');
  const [scrolledPast, setScrolledPast] = useState(false);
  const [isSticky, setSticky] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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
  if (!isLoading) {
    return (
      <ProductDevelopmentForm
        scrolledPast={scrolledPast}
        defaultValues={data as FieldValues}
        createNew={createNew}
        clientNo={data?.clientNo?.toString() ?? ''}
      />
    );
  }
  return <></>;
}

export default ProductDevelopmentPage;
