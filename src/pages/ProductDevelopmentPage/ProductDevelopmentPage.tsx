import React from 'react';
import ContentPage from '../Templates/ContentPage';
import { useParams } from 'react-router';
import { Button } from '@chakra-ui/button';
import { Heading } from '@chakra-ui/layout';
import { useToast } from '../../app/hooks/useToast';
import { Status } from '../../app/types/types';
import { useTranslation } from 'react-i18next';

function ProductDevelopmentPage() {
  const { id } = useParams();
  const { t } = useTranslation();
  const { showToast } = useToast();

  const handleToast = (status: Status) => {
    showToast({
      status: status,
      title: 'Toaster title',
      description: 'Toaster messages',
    });
  };

  return (
    <ContentPage>
      <Heading>ProductDevelopment {id}</Heading>
      <Button variant={'primary'} onClick={() => handleToast('success')}>
        {t('PD.Save')}
      </Button>
    </ContentPage>
  );
}

export default ProductDevelopmentPage;
