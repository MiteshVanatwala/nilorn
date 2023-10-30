import { COLORS, SPACE } from '../../theme/Constants';
import { Button } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

const ClearAllFilters = () => {
  const { reset } = useFormContext();

  return (
    <Button
      gap={'.5rem'}
      textDecoration={'underline'}
      alignItems={'center'}
      px={'0'}
      py={SPACE.XXS}
      color={COLORS.BLUE[200]}
      backgroundColor={'transparent'}
      _hover={{
        color: COLORS.GRAY[80],
      }}
      _active={{
        backgroundColor: 'transparent',
      }}
      onClick={() => reset()}>
      Clear all
    </Button>
  );
};

export default ClearAllFilters;
