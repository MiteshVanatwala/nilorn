import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { HeaderMenuButton } from '../Navigation/HeaderMenuLink';
import HeaderMenu from './HeaderMenu';

const UserMenu = () => {
  const { t } = useTranslation();

  const auth = useAuth();

  const signOut = () => {
    auth.removeUser();
    auth.signoutRedirect();
  };

  return (
    <HeaderMenu title={t('Menu.hypuser')}>
      <HeaderMenuButton onClick={signOut}>
        <>{t('Menu.hyplogout')}</>
      </HeaderMenuButton>
    </HeaderMenu>
  );
};

export default UserMenu;
