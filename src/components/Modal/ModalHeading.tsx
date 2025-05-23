import { Box, Heading } from '@chakra-ui/react';
import { SPACE } from '../../theme/Constants';

type Props = {
  title: string | undefined;
  textAlign?: 'left' | 'center' | 'right';
  mb?: string;
};

const ModalHeading = ({ title, textAlign = 'left', mb = SPACE.XL }: Props) => {
  return (
    <Box py={SPACE.SM} mb={mb} position={'relative'}>
      <Heading textAlign={textAlign} variant={'h4'}>
        {title}
      </Heading>
    </Box>
  );
};

export default ModalHeading;
