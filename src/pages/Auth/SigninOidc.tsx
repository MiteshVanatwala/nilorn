import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SpinnerOverlay from '../../components/Spinner/SpinnerOverlay';
import { useTranslation } from 'react-i18next';

const SigninOidc = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    navigate('/');
  }, [navigate]);

  return <SpinnerOverlay text={t('Common.signingIn')} />;
};

export default SigninOidc;
