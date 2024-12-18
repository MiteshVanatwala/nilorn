import { MenuItem, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router';
import {
  useCreateCopyProductDevelopment,
  useCreateVersionProductDevelopment,
} from '../../../../../app/api/productDevelopment';
import { SIZES } from '../../../../../theme/Constants';
import { useTranslation } from 'react-i18next';
import { useRef } from 'react';
import { useUnsavedChangesModal } from '../../../../../app/hooks/useUnsavedChangesModal';
import IsolatedModal, {
  ModalRef,
} from '../../../../../components/Modal/IsolatedModal';

type Props = {
  no: string;
  createType: 'version' | 'copy';
};

const MenuItemCreate = ({ no, createType }: Props) => {
  const { t } = useTranslation();
  const modalRef = useRef<ModalRef>(null);
  const navigate = useNavigate();

  const isVersion = createType === 'version';

  const handleOnDiscardChanges = () => {
    navigate(0);
  };

  const {
    hasUnsavedChanges,
    modal: unsavedChangesModal,
    onOpen: openUnsavedChangesModal,
  } = useUnsavedChangesModal(handleOnDiscardChanges);

  const { mutate: createVersion, isLoading: isCreateVersionLoading } =
    useCreateVersionProductDevelopment(no);
  const { mutate: createCopy, isLoading: isCreateCopyLoading } =
    useCreateCopyProductDevelopment(no);

  const handleShowConfirmModal = () => {
    if (hasUnsavedChanges()) {
      openUnsavedChangesModal();
    } else {
      modalRef.current?.onOpen();
    }
  };

  const onConfirm = isVersion ? createVersion : createCopy;
  const isLoading = isVersion ? isCreateVersionLoading : isCreateCopyLoading;

  const title = t(
    isVersion ? 'PD.Version.ConfirmModal.Title' : 'PD.Copy.ConfirmModal.Title'
  );
  const description = t(
    isVersion
      ? 'PD.Version.ConfirmModal.Description'
      : 'PD.Copy.ConfirmModal.Description',
    { no }
  );
  const menuItemLabel = t(isVersion ? 'PD.Version.Create' : 'PD.Copy.Create');

  return (
    <MenuItem
      onClick={handleShowConfirmModal}
      icon={
        <Text as={'i'} fontSize={SIZES.ICON.MD} className="ri-file-copy-line" />
      }>
      {menuItemLabel}
      <IsolatedModal
        ref={modalRef}
        title={title}
        description={description}
        onConfirm={onConfirm}
        isConfirmLoading={isLoading}
      />
      {unsavedChangesModal}
    </MenuItem>
  );
};

export default MenuItemCreate;
