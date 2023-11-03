import { SIZES, SPACE } from '../../theme/Constants';
import { Flex } from '@chakra-ui/react';
import fontSizes from '../../theme/fontSizes';
import ActiveFilterItem from './ActiveFilterItem';
import ClearAllFilters from './ClearAllFilters';
import { useFormContext } from 'react-hook-form';
import { useEffect, useState } from 'react';

const ActiveFilters = () => {
  const { watch } = useFormContext();
  let [hasValues, setHasValues] = useState<boolean>(false);
  const watchedEntries = Object.entries(watch());

  useEffect(() => {
    const foundValue = watchedEntries.some(([key, value]) => value);
    setHasValues(foundValue);
  }, [watchedEntries]);

  return (
    <Flex
      display={'inline-flex'}
      fontSize={fontSizes.sm}
      grow={1}
      w={'100%'}
      margin={'0 auto'}
      maxWidth={SIZES.CONTAINER.XL}
      alignItems="baseline"
      gap={{
        base: SPACE.XXS,
        lg: SPACE.SM,
      }}
      flexDirection="row"
      pt={hasValues ? SPACE.LG : ''}>
      {watchedEntries.map(([key, value]) => {
        if (value) {
          return (
            <ActiveFilterItem
              key={key}
              label={value[0]?.toUpperCase() + value?.slice(1)}
              value={value}
              queryItem={key}
            />
          );
        }
        return null;
      })}
      {hasValues && <ClearAllFilters />}
    </Flex>
  );
};

export default ActiveFilters;
