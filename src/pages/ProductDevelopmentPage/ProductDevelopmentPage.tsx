import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { useProductDevelopment } from '../../app/api/productDevelopment';
import ProductDevelopmentForm from './Sections/ProductDevelopmentForm';
import SpinnerOverlay from '../../components/Spinner/SpinnerOverlay';
import { Box, Text } from '@chakra-ui/react';
import { useCurrentUser } from '../../app/api/User';
import { ROLES_ALLOWED_TO_CREATE } from '../../app/Permissions/Permissions';
import { useQueryClient } from 'react-query';
import QueryKeysEnum from '../../app/api/queryKeys';
import { SESSION_STORAGE } from '../../app/utils/constant';
import { useLastVisitedPD } from '../../app/hooks/useLastVisitedPD';
import LeavePageBlocker from '../../components/Modal/LeavePageBlocker';
import PermissionDenied from '../PermissionDenied/PermissionDenied';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundaries';

type Props = {
  createNew: boolean;
};

function ProductDevelopmentPage({ createNew }: Props) {
  const { no } = useParams();
  const { setLastVisitedPD } = useLastVisitedPD();

  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries([QueryKeysEnum.ProductDevelopment]);
  }, [queryClient, no]);

  useEffect(() => {
    setLastVisitedPD(no ?? '');
  }, [no, setLastVisitedPD]);

  const { data, isLoading, isError, isSuccess, isRefetching } =
    useProductDevelopment(no ?? '');
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

  if (createNew) {
    sessionStorage.setItem(
      SESSION_STORAGE.BACK_LINK,
      `/${sessionStorage.getItem(SESSION_STORAGE.PREV_FILTER_OVERVIEW) ?? ''}`
    );
  }

  if (
    isError ||
    (createNew && user?.role && !ROLES_ALLOWED_TO_CREATE.includes(user.role))
  ) {
    return <PermissionDenied />;
  }

  if (isLoading || isUserLoading || isRefetching) {
    return <SpinnerOverlay />;
  }

  if (
    (createNew && isUserSuccess) ||
    (isUserSuccess && isSuccess && no !== undefined)
  ) {
    return (
      <Box ref={ref}>
        <LeavePageBlocker />
        <ErrorBoundary
          boundaryName="ProductDevelopmentForm"
          fallback={
            <Box p={4}>
              <Text color="red.600">
                An unexpected error occurred while loading the product
                development form. Please try refreshing the page.
              </Text>
            </Box>
          }>
          <ProductDevelopmentForm
            no={no ?? ''}
            scrolledPast={scrolledPast}
            defaultValues={data}
            createNew={createNew}
            key={no}
          />
        </ErrorBoundary>
      </Box>
    );
  }
  return <></>;
}
export default ProductDevelopmentPage;
