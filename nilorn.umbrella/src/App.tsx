import React from 'react';
import { useEffect } from 'react';
import { useAuth, hasAuthParams } from 'react-oidc-context';
import { ApiError, OpenAPI } from './api';
import i18n from './i18n';
import { MutationCache, QueryClient, QueryClientProvider } from 'react-query';
import { I18nextProvider } from 'react-i18next';
import SpinnerOverlay from './components/Spinner/SpinnerOverlay';
import { RouterProvider } from 'react-router-dom';
import router from './pages/MainApp/Router';
// import { useToast } from './app/hooks/useToast';
import { AlertStatus } from '@chakra-ui/alert';
import ErrorPage from './components/ErrorBoundary/ErrorPage';

function App() {
  // const { showToast } = useToast();
  const mutationCache = new MutationCache({
    onError: async error => {
      const err = error as ApiError;
      const alertStatus: AlertStatus = err.status === 500 ? 'error' : 'warning';

      try {
        const errObj = JSON.parse(err?.body);
        // showToast({
        //   status: alertStatus,
        //   title: errObj?.title ? errObj?.title : '',
        // });
      } catch (e) {
        const errArr = err.body as { title: string }[];
        // showToast({
        //   status: alertStatus,
        //   title: errArr[0] ? errArr[0].title : '',
        // });
      }
    },
  });

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 20,
      },
    },
    mutationCache,
  });
  return (
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <RouterProvider router={router} />
      </I18nextProvider>
    </QueryClientProvider>
  );

  // return <SpinnerOverlay />;
}

export default App;
