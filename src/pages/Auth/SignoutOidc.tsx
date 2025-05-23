import SpinnerOverlay from '../../components/Spinner/SpinnerOverlay';
import { useTranslation } from 'react-i18next';
import { useSignOut } from '../../app/hooks/useSignOut';
import { useEffect } from 'react';

const SignoutOidc = () => {
  const { t } = useTranslation();
  const { signOut } = useSignOut();

  useEffect(() => {
    signOut();
  }, [signOut]);

  return <SpinnerOverlay text={t('Common.SigningOut')} />;
};

export default SignoutOidc;
