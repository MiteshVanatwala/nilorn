import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SpinnerOverlay from '../../components/Spinner/SpinnerOverlay';
import { useAuth } from 'react-oidc-context';
import { useTranslation } from 'react-i18next';
import { useUnsavedChanges } from '../../app/hooks/useUnsavedChanges';

const SignoutOidc = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const location = useLocation();
  const { setUnsavedChanges } = useUnsavedChanges();

  useEffect(() => {
    setUnsavedChanges(false);
    auth.removeUser();
    auth.signoutRedirect({
      id_token_hint: auth.user?.id_token ?? '',
    });
  }, [auth, location, setUnsavedChanges]);

  return <SpinnerOverlay text={t('Common.SigningOut')} />;
};

export default SignoutOidc;
