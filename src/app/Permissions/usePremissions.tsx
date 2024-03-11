import { useCurrentUser } from '../api/User';
import {
  ROLES_ALLOWED_SEE_CALCULATION,
  ROLES_ALLOWED_SEE_PRODUCTION,
  ROLES_ALLOWED_SEE_SOURCING,
  ROLES_ALLOWED_TO_UPLOAD_FILE,
  ROLES_ALLOWED_TO_EDIT_PD,
  ROLES_ALLOWED_TO_ADD_SOURCING,
} from './Permissions';

export function useAuthorized(
  view:
    | 'production'
    | 'sourcing'
    | 'calculation'
    | 'editProductDevelopment'
    | 'addSourcing'
    | 'uploadFile'
) {
  const { data: user } = useCurrentUser();

  if (user?.role) {
    switch (view) {
      case 'production':
        return ROLES_ALLOWED_SEE_PRODUCTION.includes(user?.role);
      case 'sourcing':
        return ROLES_ALLOWED_SEE_SOURCING.includes(user?.role);
      case 'calculation':
        return ROLES_ALLOWED_SEE_CALCULATION.includes(user?.role);
      case 'editProductDevelopment':
        return ROLES_ALLOWED_TO_EDIT_PD.includes(user?.role);
      case 'addSourcing':
        return ROLES_ALLOWED_TO_ADD_SOURCING.includes(user?.role);
      case 'uploadFile':
        return ROLES_ALLOWED_TO_UPLOAD_FILE.includes(user?.role);
    }
  }

  return false;
}
