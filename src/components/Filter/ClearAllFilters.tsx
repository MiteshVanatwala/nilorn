import { COLORS, SPACE } from '../../theme/Constants';
import { Button } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useClearAllFilters } from '../../app/utils/FilterHelper';

const ClearAllFilters = () => {
  const clearFilters = useClearAllFilters();
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
      onClick={clearFilters}>
      {t('Filter.Clear')}
    </Button>
  );
};

export default ClearAllFilters;
