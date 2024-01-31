import { useEffect } from 'react';
import i18n from './i18n';
import { MutationCache, QueryClient, QueryClientProvider } from 'react-query';
import { I18nextProvider, useTranslation } from 'react-i18next';
import SpinnerOverlay from './components/Spinner/SpinnerOverlay';
import { RouterProvider } from 'react-router-dom';
import router from './pages/MainApp/Router';
import ErrorPage from './components/ErrorBoundary/ErrorPage';
import { hasAuthParams, useAuth } from 'react-oidc-context';
import { OpenAPI } from './app/generate';

OpenAPI.BASE =
  process.env.REACT_APP_API_URL ?? 'https://umbrella-api-test.nilorn.com';

function App() {
  const auth = useAuth();
  const { t } = useTranslation();

  // const { showToast } = useToast();
  const mutationCache = new MutationCache({
    onError: async error => {
      // const err = error as ApiError;

      try {
        // showToast({
        //   status: alertStatus,
        //   title: errObj?.title ? errObj?.title : '',
        // });
      } catch (e) {
        // showToast({
        //   status: alertStatus,
        //   title: errArr[0] ? errArr[0].title : '',
        // });
      }
    },
  });

  // automatically sign-in
  useEffect(() => {
    if (
      !hasAuthParams() &&
      !auth.isAuthenticated &&
      !auth.activeNavigator &&
      !auth.isLoading
    ) {
      sessionStorage.setItem('redirectUrl', window.location.href);
      auth.signinRedirect();
    }
  }, [
    auth,
    auth.isAuthenticated,
    auth.activeNavigator,
    auth.isLoading,
    auth.signinRedirect,
  ]);

  useEffect(() => {
    const token = auth.user?.access_token;
    if (auth.user?.access_token) {
      OpenAPI.HEADERS = {
        Authorization: `Bearer ${token}`,
      };
    }
  }, [auth.user?.access_token]);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 20,
      },
    },
    mutationCache,
  });

  switch (auth.activeNavigator) {
    case 'signinSilent':
      return <SpinnerOverlay text={t('Common.SigningIn')} />;
    case 'signoutRedirect':
      return <SpinnerOverlay text={t('Common.SigningOut')} />;
  }

  if (auth.error) {
    return (
      <ErrorPage title={t('Common.AuthError')} messages={auth.error.message} />
    );
  }

  if (auth.isAuthenticated && !auth.isLoading) {
    const redirectUrl = sessionStorage.getItem('redirectUrl');
    sessionStorage.removeItem('redirectUrl');

    if (redirectUrl) {
      window.location.href = redirectUrl;
    }
    return (
      <QueryClientProvider client={queryClient}>
        <I18nextProvider i18n={i18n}>
          <RouterProvider router={router} />
        </I18nextProvider>
      </QueryClientProvider>
    );
  }

  return <SpinnerOverlay />;
}

export default App;
