import { Button } from '@chakra-ui/button';
import { HStack, Text } from '@chakra-ui/layout';
import { ModalBody, ModalFooter } from '@chakra-ui/modal';
import { useTranslation } from 'react-i18next';
import { useModal } from '../../app/hooks/useModal';
import { SPACE } from '../../theme/Constants';
import RemixIcon from '../Icon/RemixIcon';
import ModalHeading from './ModalHeading';

type Props = {
  title: string;
  description: string;
  onConfirm: () => void;
  confirmType?: 'DELETE' | 'PRIMARY';
  cancelText?: string;
  confirmText?: string;
  onClose?: () => void;
};

const ConfirmModal = ({
  title,
  description,
  onConfirm,
  confirmType = 'PRIMARY',
  cancelText,
  confirmText,
  onClose,
}: Props) => {
  const { t } = useTranslation();
  const { close } = useModal();

  return (
    <ModalBody>
      <ModalHeading mb={'0'} textAlign="center" title={title} />
      <ModalBody px={0}>
        <Text textAlign={'center'} maxW={'40rem'}>
          {description}
        </Text>
      </ModalBody>
      <ModalFooter justifyContent={'center'}>
        <HStack spacing={SPACE.LG} marginTop={SPACE.MD}>
          <Button
            variant={confirmType === 'DELETE' ? 'deleteBtn' : 'primary'}
            onClick={onConfirm}
            rightIcon={
              confirmType === 'DELETE' ? (
                <RemixIcon component="i" icon={'DELETE_BIN_LINE'} />
              ) : (
                <></>
              )
            }>
            {confirmType === 'DELETE'
              ? t('Common.Delete')
              : confirmText
              ? confirmText
              : t('Common.Confirm')}
          </Button>
          <Button
            variant={'secondary'}
            onClick={() => {
              onClose ? onClose() : close();
            }}
            rightIcon={
              cancelText ? undefined : (
                <RemixIcon component="i" icon="CLOSE_LINE" />
              )
            }>
            {cancelText ?? t('Common.Cancel')}
          </Button>
        </HStack>
      </ModalFooter>
    </ModalBody>
  );
};
export default ConfirmModal;
