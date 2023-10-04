import React, { Suspense, lazy } from 'react';
import Overview from '../Overview/Overview';
const ProductDevelopmentFilter = lazy(
  () => import('../../components/Filter/ProductDevelopmentFilter')
);

function HomePage() {
  return (
    <div className="App">
      <h1>Start page</h1>
      <Suspense>
        <ProductDevelopmentFilter />
      </Suspense>
      <Overview />
    </div>
  );
}

export default HomePage;
