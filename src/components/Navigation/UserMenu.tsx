import { useTranslation } from 'react-i18next';
import { useAuth } from 'react-oidc-context';
import { HeaderMenuButton } from '../Navigation/HeaderMenuLink';
import { Text } from '@chakra-ui/react';
import { SPACE } from '../../theme/Constants';

const UserMenu = () => {
  const { t } = useTranslation();

  const auth = useAuth();

  const signOut = () => {
    auth.removeUser();
    auth.signoutRedirect();
  };

  if (auth.user) {
    return (
      <>
        <Text px={SPACE.LG}>{auth.user?.profile.name}</Text>
        <HeaderMenuButton onClick={signOut}>
          <>{t('Menu.signOut')}</>
        </HeaderMenuButton>
      </>
    );
  }
  return <></>;
};

export default UserMenu;
