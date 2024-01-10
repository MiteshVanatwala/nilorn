import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { FieldValues } from 'react-hook-form';
import { useProductDevelopment } from '../../app/api/productDevelopment';
import ProductDevelopmentForm from './Sections/ProductDevelopmentForm';
import SpinnerOverlay from '../../components/Spinner/SpinnerOverlay';
import { Box } from '@chakra-ui/react';
import NotFoundPage from '../NotFound/NotFoundPage';
import { useCurrentUser } from '../../app/api/User';
import { ROLES_ALLOWED_TO_CREATE } from '../../app/Permissions/Permissions';

type Props = {
  createNew: boolean;
};

function ProductDevelopmentPage({ createNew }: Props) {
  const { no } = useParams();
  const { data, isLoading, isError, isSuccess } = useProductDevelopment(
    no ?? ''
  );
  const {
    data: user,
    isLoading: isUserLoading,
    isSuccess: isUserSuccess,
  } = useCurrentUser();
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

  if (
    isError ||
    (createNew && user?.role && !ROLES_ALLOWED_TO_CREATE.includes(user.role))
  ) {
    return <NotFoundPage />;
  }

  if (isLoading || isUserLoading) {
    return <SpinnerOverlay />;
  }

  if (
    (createNew && isUserSuccess) ||
    (isUserSuccess && isSuccess && no !== undefined)
  ) {
    return (
      <Box ref={ref}>
        <ProductDevelopmentForm
          no={no ?? ''}
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
