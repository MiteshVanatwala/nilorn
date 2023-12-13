import { COLORS, SPACE } from '../../theme/Constants';
import { Button } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

const ClearAllFilters = () => {
  const { reset, getValues, setValue } = useFormContext();
  const { t } = useTranslation();

  return (
    <Button
      gap={SPACE.XXS}
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
      onClick={() => {
        const pageSize = getValues('pageSize');
        reset();
        setValue('pageSize', pageSize);
        setValue('pageNumber', 1);
      }}>
      {t('Filter.Clear')}
    </Button>
  );
};

export default ClearAllFilters;
