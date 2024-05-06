import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router';
import { useUnsavedChanges } from './useUnsavedChanges';

export const useSignOut = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const { setUnsavedChanges } = useUnsavedChanges();

  const signOutNavigate = () => {
    navigate('/signout-oidc');
  };

  const signOut = () => {
    setUnsavedChanges(false);
    auth.removeUser();
    auth.signoutRedirect({
      id_token_hint: auth.user?.id_token ?? '',
    });
  };
  return { signOut, signOutNavigate };
};
