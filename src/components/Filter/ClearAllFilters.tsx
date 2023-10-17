import { BORDER_RADIUS, COLORS, SPACE } from '../../theme/Constants';
import { Button } from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';
import { useFormContext } from 'react-hook-form';

const ClearAllFilters = () => {
  let [, setSearchParams] = useSearchParams();
  const { reset } = useFormContext();

  const removeAllFilters = () => {
    reset();
    setSearchParams();
  };
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
      onClick={() => removeAllFilters()}>
      Clear all
    </Button>
  );
};

export default ClearAllFilters;
