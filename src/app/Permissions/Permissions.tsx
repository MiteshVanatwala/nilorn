import { Role } from '../generate';

export const ROLES_ALLOWED_TO_CREATE = [
  Role.KEY_ACCOUNT_MANAGER,
  Role.ACCOUNT_MANAGER,
  Role.ADMIN,
];

export const ROLES_ALLOWED_TO_UPLOAD_FILE = [
  Role.DESIGNER,
  Role.KEY_ACCOUNT_MANAGER,
  Role.ACCOUNT_MANAGER,
  Role.ADMIN,
  Role.PRODUCT_DEVELOPER,
];
export const ROLES_NOT_ALLOWED_TO_EDIT = [Role.DESIGNER];
