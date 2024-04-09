import { useTranslation } from 'react-i18next';
import { HeaderMenuButton } from '../Navigation/HeaderMenuLink';
import HeaderMenu from './HeaderMenu';
import { useSignOut } from '../../app/hooks/useSignOut';

const UserMenu = () => {
  const { t } = useTranslation();

  const signOut = useSignOut();

  return (
    <HeaderMenu title={t('Menu.HypUser')}>
      <HeaderMenuButton onClick={signOut}>
        <>{t('Menu.HypLogout')}</>
      </HeaderMenuButton>
    </HeaderMenu>
  );
};

export default UserMenu;
