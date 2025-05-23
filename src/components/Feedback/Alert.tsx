import {
  AlertDescription,
  AlertTitle,
  Alert as ChakraAlert,
  AlertIcon,
} from '@chakra-ui/alert';
import { VStack } from '@chakra-ui/layout';
import { SIZES, SPACE } from '../../theme/Constants';
import { Feedback } from '../../app/types/types';

const Alert = ({ status, title, description, size = 'md' }: Feedback) => {
  const isSmall = size === 'sm';
  return (
    <ChakraAlert
      variant={status}
      status={status}
      p={isSmall ? SPACE.MD : SPACE.LG}>
      <AlertIcon
        boxSize={isSmall ? SIZES.ICON.MD : SIZES.ICON.LG}
        mr={SPACE.MD}
      />
      <VStack alignItems={'baseline'}>
        {title && <AlertTitle>{title}</AlertTitle>}
        {description && <AlertDescription>{description}</AlertDescription>}
      </VStack>
    </ChakraAlert>
  );
};

export default Alert;
