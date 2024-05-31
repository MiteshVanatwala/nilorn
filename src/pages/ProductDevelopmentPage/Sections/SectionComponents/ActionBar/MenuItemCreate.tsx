import { MenuItem, Text } from '@chakra-ui/react';
import { ROLES_ALLOWED_TO_CREATE } from '../../../../../app/Permissions/Permissions';
import { useCurrentUser } from '../../../../../app/api/User';
import { useModal } from '../../../../../app/hooks/useModal';
import ConfirmModal from '../../../../../components/Modal/ConfirmModal';
import {
  useCreateCopyProductDevelopment,
  useCreateVersionProductDevelopment,
} from '../../../../../app/api/productDevelopment';
import { SIZES } from '../../../../../theme/Constants';
import { useTranslation } from 'react-i18next';

type Props = {
  name: string;
  no: string;
  createType: 'version' | 'copy';
};
const MenuItemCreate = ({ no, createType, name }: Props) => {
  const { t } = useTranslation();
  const { data: user } = useCurrentUser();
  const { handleModal } = useModal();

  const { mutate: createVersion } = useCreateVersionProductDevelopment(no);
  const { mutate: copy } = useCreateCopyProductDevelopment(no, name);

  async function copyProductDevelopment() {
    copy();
  }
  async function createVersionProductDevelopment() {
    createVersion();
  }

  if (!user?.role || !ROLES_ALLOWED_TO_CREATE.includes(user.role)) {
    return <></>;
  }

  const versionConfirmModal = (
    <ConfirmModal
      title={t('PD.CreateVersionConfirmModal.Title')}
      description={t('PD.CreateVersionConfirmModal.Description', {
        no: no,
      })}
      confirmType={'PRIMARY'}
      onConfirm={createVersionProductDevelopment}
    />
  );

  const copyConfirmModal = (
    <ConfirmModal
      title={t('PD.CreateCopyConfirmModal.Title')}
      description={t('PD.CreateCopyConfirmModal.Description', {
        no: no,
      })}
      confirmType={'PRIMARY'}
      onConfirm={copyProductDevelopment}
    />
  );

  const confirmModal =
    createType === 'version' ? versionConfirmModal : copyConfirmModal;

  const menuItemLabel =
    createType === 'version' ? t('PD.CreateVersion') : t('PD.CreateCopy');

  return (
    <MenuItem
      onClick={() => handleModal(confirmModal)}
      icon={
        <Text as={'i'} fontSize={SIZES.ICON.MD} className="ri-file-copy-line" />
      }>
      {menuItemLabel}
    </MenuItem>
  );
};

export default MenuItemCreate;
