import { Button, Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import NavigationHeader from '../../components/Navigation/NavigationHeader';
import { ModalProvider } from '../../app/context/ModalContext';
import { useCurrentUser } from '../../app/api/User';
import { useTranslation } from 'react-i18next';
import SpinnerOverlay from '../../components/Spinner/SpinnerOverlay';
import ErrorPage from '../../components/ErrorBoundary/ErrorPage';
import { useSignOut } from '../../app/hooks/useSignOut';
import LeavePageBlocker from '../../components/Modal/LeavePageBlocker';

function MainApp() {
  const { t } = useTranslation();
  const { data: user, isError } = useCurrentUser();

  const signOut = useSignOut();

  if (isError) {
    return (
      <ErrorPage
        title={t('Common.AuthError')}
        messages={t('Common.AuthErrorNoAcesss')}
        button={
          <Button variant={'secondary'} onClick={signOut}>
            <>{t('Menu.HypLogout')}</>
          </Button>
        }
      />
    );
  }

  if (user) {
    return (
      <Flex h={'100%'} minH={'100%'} flexDirection="column" p={0}>
        <ModalProvider>
          <NavigationHeader />
          <LeavePageBlocker />
          <Outlet />
        </ModalProvider>
      </Flex>
    );
  }

  return <SpinnerOverlay />;
}

export default MainApp;
