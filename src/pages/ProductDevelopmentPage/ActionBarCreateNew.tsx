import { HStack, VStack } from '@chakra-ui/layout';
import { SPACE } from '../../theme/Constants';
import { Button } from '@chakra-ui/button';
import { useTranslation } from 'react-i18next';

const ActionBarCreateNew = () => {
  const { t } = useTranslation();

  return (
    <VStack align={'left'}>
      <HStack
        justifyContent={{
          base: 'start',
          md: 'end',
        }}
        flexWrap={{
          base: 'wrap',
          md: 'nowrap',
        }}
        gap={{
          base: SPACE.XXS,
          lg: SPACE.XS,
        }}>
        <Button variant="primary" type="submit">
          {t('PD.CreateNew')}
        </Button>
      </HStack>
    </VStack>
  );
};

export default ActionBarCreateNew;
