import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import IsolatedModal, { ModalRef } from '../../components/Modal/IsolatedModal';
import { useOutsideClick } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

const useDeleteModal = (
  outsideRef: RefObject<HTMLElement>,
  onConfirm: () => void
) => {
  const { t } = useTranslation();
  const modalRef = useRef<ModalRef>(null);

  const [isOpen, setOpen] = useState<boolean>(false);

  const openModal = useCallback(() => {
    modalRef.current?.onOpen();
  }, []);

  const closeModal = useCallback(() => {
    modalRef.current?.onClose();
  }, []);

  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };

    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keyup', handleKeyUp);
    };
  });

  const onCancel = () => {
    setOpen(false);
  };

  useOutsideClick({
    ref: outsideRef,
    handler: () => {
      setOpen(false);
    },
  });

  const deleteModal = (
    <IsolatedModal
      confirmType="DELETE"
      ref={modalRef}
      title={t('PD.DeleteTitle')}
      description={t('PD.DeleteMsg')}
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );

  useEffect(() => {
    if (isOpen) {
      openModal();
    } else {
      closeModal();
    }
  }, [closeModal, isOpen, openModal]);

  return {
    deleteModal,
    isOpen,
    setOpen,
  };
};

export default useDeleteModal;
