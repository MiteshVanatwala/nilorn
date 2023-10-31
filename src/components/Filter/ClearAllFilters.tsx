import { COLORS, SPACE } from '../../theme/Constants';
import { Button } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

const ClearAllFilters = () => {
  const { reset } = useFormContext();
  const { t } = useTranslation();

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
      {t('Filter.Clear')}
    </Button>
  );
};

export default ClearAllFilters;
