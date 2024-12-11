import { MenuItem, Text } from '@chakra-ui/react';
import {
  useCreateCopyProductDevelopment,
  useCreateVersionProductDevelopment,
} from '../../../../../app/api/productDevelopment';
import { SIZES } from '../../../../../theme/Constants';
import { useTranslation } from 'react-i18next';
import { useRef } from 'react';
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

  const isVersion = createType === 'version';

  const { mutate: createVersion, isLoading: isCreateVersionLoading } =
    useCreateVersionProductDevelopment(no);
  const { mutate: createCopy, isLoading: isCreateCopyLoading } =
    useCreateCopyProductDevelopment(no);

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
      onClick={() => modalRef.current?.onOpen()}
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
    </MenuItem>
  );
};

export default MenuItemCreate;
