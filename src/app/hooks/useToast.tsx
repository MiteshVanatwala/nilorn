import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/alert';
import { CloseButton } from '@chakra-ui/close-button';
import { HStack, Box } from '@chakra-ui/layout';
import { useToast as useChakraToast, ToastPosition } from '@chakra-ui/toast';
import { Feedback } from '../types/types';

type Props = Feedback & {
  position?: ToastPosition;
};

export function useToast() {
  const toast = useChakraToast();

  const showToast = ({
    status,
    title,
    description,
    position = 'bottom',
  }: Props) => {
    toast({
      isClosable: true,
      position: position,
      duration: 9000,
      render: ({ onClose }) => (
        <Alert variant={status} status={status}>
          <HStack justifyContent={'space-between'} w="100%">
            <AlertIcon />
            <Box w={'100%'}>
              {title && <AlertTitle>{title}</AlertTitle>}
              <AlertDescription>{description}</AlertDescription>
            </Box>
            <CloseButton
              alignSelf="flex-start"
              position="relative"
              right={-1}
              top={-1}
              onClick={onClose}
            />
          </HStack>
        </Alert>
      ),
    });
  };

  return { showToast };
}
