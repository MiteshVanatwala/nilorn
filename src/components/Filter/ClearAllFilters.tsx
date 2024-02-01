import { COLORS, SPACE } from '../../theme/Constants';
import { Button } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

const ClearAllFilters = () => {
  const { reset } = useFormContext();
  const { t } = useTranslation();

  const handleClick = () => {
    let storedFilter = 'prevFilterOverview';
    if (window.location.pathname === '/productions') {
      storedFilter = 'prevFilterProductions';
    } else if (window.location.pathname === '/price-calculations') {
      storedFilter = 'prevFilterCalculation';
    }
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
      onClick={() => {
        reset();
        handleClick();
      }}>
      {t('Filter.Clear')}
    </Button>
  );
};

export default ClearAllFilters;
