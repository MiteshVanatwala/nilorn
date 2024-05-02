import { useNavigate } from 'react-router';

export const useSignOut = () => {
  const navigate = useNavigate();

  const signOut = () => {
    navigate('/signout-oidc');
  };

  return signOut;
};
