import { HStack, VStack } from '@chakra-ui/layout';
import { SPACE } from '../../theme/Constants';
import { Button, ButtonGroup } from '@chakra-ui/button';
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
        <ButtonGroup isAttached variant="primary">
          <Button type="submit">{t('PD.CreateNew')}</Button>
        </ButtonGroup>
      </HStack>
    </VStack>
  );
};

export default ActionBarCreateNew;
