import { MenuItem } from '@chakra-ui/react';
import { useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useUpdateProductDevelopmentWithStatus } from '../../../../../app/api/productDevelopment';
import { Status } from '../../../../../app/generate';
import { useUnsavedChangesModal } from '../../../../../app/hooks/useUnsavedChangesModal';
import RemixIcon from '../../../../../components/Icon/RemixIcon';
import IsolatedModal, {
  ModalRef,
} from '../../../../../components/Modal/IsolatedModal';
import { SIZES } from '../../../../../theme/Constants';

type Props = {
  no: string;
};

const MenuItemDelete = ({ no }: Props) => {
  const { t } = useTranslation();
  const modalRef = useRef<ModalRef>(null);
  const form = useFormContext();

  const { mutate: updateStatus } = useUpdateProductDevelopmentWithStatus(no);

  const handleOnDiscardChanges = () => {
    form.reset();
    setTimeout(() => {
      modalRef.current?.onOpen();
    }, 500);
  };

  const {
    hasUnsavedChanges,
    modal: unsavedChangesModal,
    onOpen: openUnsavedChangesModal,
  } = useUnsavedChangesModal(handleOnDiscardChanges);

  const deleteProductDevelopment = () => {
    updateStatus(Status.DELETED);
  };

  const handleShowConfirmModal = () => {
    if (hasUnsavedChanges()) {
      openUnsavedChangesModal();
    } else {
      modalRef.current?.onOpen();
    }
  };

  return (
    <MenuItem
      onClick={handleShowConfirmModal}
      icon={
        <RemixIcon
          component="Text"
          icon="DELETE_BIN_LINE"
          fontSize={SIZES.ICON.MD}
        />
      }>
      {t('Common.Delete')}
      <IsolatedModal
        ref={modalRef}
        title={t('PD.DeleteTitle')}
        description={t('PD.DeleteComfirm', { no: no })}
        onConfirm={deleteProductDevelopment}
        confirmType={'DELETE'}
      />
      {unsavedChangesModal}
    </MenuItem>
  );
};

export default MenuItemDelete;
