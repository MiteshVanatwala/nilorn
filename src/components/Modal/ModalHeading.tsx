import { Box, Heading } from '@chakra-ui/react';
import { SPACE } from '../../theme/Constants';

type Props = {
  title: string | undefined;
};

const ModalHeading = ({ title }: Props) => {
  return (
    <Box py={SPACE.SM} mb={SPACE.XL} position={'relative'}>
      <Heading variant={'h4'}>{title}</Heading>
    </Box>
  );
};

export default ModalHeading;
