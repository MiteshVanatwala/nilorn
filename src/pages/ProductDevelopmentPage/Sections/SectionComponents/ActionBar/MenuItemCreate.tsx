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
  no: string;
  createType: 'version' | 'copy';
};
const MenuItemCreate = ({ no, createType }: Props) => {
  const { t } = useTranslation();
  const { handleModal } = useModal();

  const { mutate: createVersion } = useCreateVersionProductDevelopment(no);
  const { mutate: copy } = useCreateCopyProductDevelopment(no);

  async function copyProductDevelopment() {
    copy();
  }
  async function createVersionProductDevelopment() {
    createVersion();
  }

  const versionConfirmModal = (
    <ConfirmModal
      title={t('PD.Version.ConfirmModal.Title')}
      description={t('PD.Version.ConfirmModal.Description', {
        no: no,
      })}
      confirmType={'PRIMARY'}
      onConfirm={createVersionProductDevelopment}
    />
  );

  const copyConfirmModal = (
    <ConfirmModal
      title={t('PD.Copy.ConfirmModal.Title')}
      description={t('PD.Copy.ConfirmModal.Description', {
        no: no,
      })}
      confirmType={'PRIMARY'}
      onConfirm={copyProductDevelopment}
    />
  );

  const confirmModal =
    createType === 'version' ? versionConfirmModal : copyConfirmModal;

  const menuItemLabel =
    createType === 'version' ? t('PD.Version.Create') : t('PD.Copy.Create');

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
