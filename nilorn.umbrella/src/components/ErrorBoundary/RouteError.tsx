import { Button } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { isRouteErrorResponse, NavLink, useRouteError } from 'react-router-dom';
import ErrorPage from './ErrorPage';
import React from 'react';

const RouteError = () => {
  const { t } = useTranslation();
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    console.log('isRouteErrorResponse: ', error);
  }

  return (
    <ErrorPage
      messages={error ? error.toString() : ''}
      button={
        <Button variant={'secondary'} as={NavLink} to="/">
          <>{t('Common.GoToHome')}</>
        </Button>
      }
    />
  );
};

export default RouteError;
