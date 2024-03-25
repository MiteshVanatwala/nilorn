import { COLORS, SPACE } from '../../theme/Constants';
import { Button } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { getCurrentStoredFilter } from '../../app/utils/FilterHelper';

const ClearAllFilters = () => {
  const { reset, getValues } = useFormContext();
  const { t } = useTranslation();

  const handleClick = () => {
    const pageNumber = getValues('pageNumber');
    const pageSize = getValues('pageSize');
    const searchQuery = '';
    reset({ pageNumber, pageSize, searchQuery });
    const storedFilter = getCurrentStoredFilter();
    sessionStorage.setItem(storedFilter, '');
  };

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
      onClick={handleClick}>
      {t('Filter.Clear')}
    </Button>
  );
};

export default ClearAllFilters;
