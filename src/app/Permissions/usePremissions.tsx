import { useCurrentUser } from '../api/User';
import { MemberBriefDto, Role, Status } from '../generate';
import {
  ROLES_ALLOWED_SEE_CALCULATION,
  ROLES_ALLOWED_SEE_PRODUCTION,
  ROLES_ALLOWED_SEE_SOURCING,
  ROLES_ALLOWED_TO_UPLOAD_FILE,
  ROLES_ALLOWED_TO_EDIT_PD,
  ROLES_ALLOWED_TO_ADD_REMOVE_SOURCING,
  ROLES_ALLOWED_TO_FILTER_ON_DELETE,
} from './Permissions';

export function useAuthorizedSee(
  view: 'production' | 'sourcing' | 'calculation'
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
    }
  }

  return false;
}

export function useAuthorizedEdit(
  action: 'productDevelopment' | 'addSourcing' | 'uploadFile' | 'removeSourcing'
) {
  const { data: user } = useCurrentUser();

  if (user?.role) {
    switch (action) {
      case 'productDevelopment':
        return ROLES_ALLOWED_TO_EDIT_PD.includes(user?.role);
      case 'addSourcing':
      case 'removeSourcing':
        return ROLES_ALLOWED_TO_ADD_REMOVE_SOURCING.includes(user?.role);
      case 'uploadFile':
        return ROLES_ALLOWED_TO_UPLOAD_FILE.includes(user?.role);
    }
  }

  return false;
}

export function useAuthorizedRemoveUser() {
  const { data: user } = useCurrentUser();

  const allowedToRemoveMember = (member: MemberBriefDto) => {
    if (user?.role === Role.PRODUCT_DEVELOPER) {
      return (
        member.role === Role.PRODUCT_DEVELOPER &&
        user.opCompCode === member.opCompCode
      );
    } else if (user?.role && ROLES_ALLOWED_TO_EDIT_PD.includes(user?.role)) {
      return true;
    }
    return false;
  };

  return allowedToRemoveMember;
}

export function useAuthorizedToFilterOnStatus() {
  const { data: user } = useCurrentUser();

  return (status: Status) => {
    if (user?.role) {
      if (status === Status.DELETED) {
        return ROLES_ALLOWED_TO_FILTER_ON_DELETE.includes(user.role);
      }
    }
    return true;
  };
}
