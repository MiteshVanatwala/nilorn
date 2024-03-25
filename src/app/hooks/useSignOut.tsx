import { useAuth } from 'react-oidc-context';

export const useSignOut = () => {
  const auth = useAuth();

  const signOut = () => {
    auth.removeUser();
    auth.signoutRedirect({
      id_token_hint: auth.user?.id_token ?? '',
    });
  };

  return signOut;
};
