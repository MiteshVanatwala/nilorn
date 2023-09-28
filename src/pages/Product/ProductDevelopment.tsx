import React from 'react';
import ContentPage from '../Templates/ContentPage';
import { useParams } from 'react-router';

function ProductDevelopment() {
  const { id } = useParams();
  return (
    <ContentPage>
      <>PD {id}</>
    </ContentPage>
  );
}

export default ProductDevelopment;
