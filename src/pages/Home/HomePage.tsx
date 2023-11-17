import React, { Suspense, lazy } from 'react';
import Overview from '../Overview/Overview';
import ContentPage from '../Templates/ContentPage';
const ProductDevelopmentFilter = lazy(
  () => import('../../components/Filter/ProductDevelopmentFilter')
);

function HomePage() {
  return (
    <ContentPage>
      <Suspense>
        <ProductDevelopmentFilter >
      </Suspense>
      <Overview />
    </ContentPage>
  );
}

export default HomePage;
