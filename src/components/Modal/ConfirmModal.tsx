import { ModalBody, ModalFooter } from '@chakra-ui/modal';
import ModalHeading from './ModalHeading';
import { HStack, Text } from '@chakra-ui/layout';
import { SPACE } from '../../theme/Constants';
import { Button } from '@chakra-ui/button';
import { useTranslation } from 'react-i18next';
import { useModal } from '../../app/hooks/useModal';

type Props = {
  title: string;
  description: string;
  onConfirm: () => void;
  confirmType?: 'DELETE' | 'PRIMARY';
};

const ConfirmModal = ({
  title,
  description,
  onConfirm,
  confirmType = 'PRIMARY',
}: Props) => {
  const { close } = useModal();
  const { t } = useTranslation();

  const onCancel = () => {
    close();
  };

  return (
    <ModalBody>
      <ModalHeading title={title} />
      <ModalBody px={0}>
        <Text>{description}</Text>
      </ModalBody>
      <ModalFooter justifyContent={'center'}>
        <HStack spacing={SPACE.LG} marginTop={SPACE.XL}>
          <Button
            variant={confirmType === 'DELETE' ? 'deleteBtn' : 'primary'}
            onClick={onConfirm}
            rightIcon={
              confirmType === 'DELETE' ? (
                <i className="ri-delete-bin-line" />
              ) : (
                <></>
              )
            }>
            {confirmType === 'DELETE'
              ? t('Common.Delete')
              : t('Common.Confirm')}
          </Button>
          <Button
            variant={'secondary'}
            onClick={onCancel}
            rightIcon={<i className="ri-close-line" />}>
            {t('Common.Cancel')}
          </Button>
        </HStack>
      </ModalFooter>
    </ModalBody>
  );
};

export default ConfirmModal;
