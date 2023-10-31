import { SIZES, SPACE } from '../../theme/Constants';
import { Flex } from '@chakra-ui/react';
import fontSizes from '../../theme/fontSizes';
import ActiveFilterItem from './ActiveFilterItem';
import ClearAllFilters from './ClearAllFilters';
import { useFormContext } from 'react-hook-form';
import { useState } from 'react';

const ActiveFilters = () => {
  const { watch } = useFormContext();
  let [hasValues, setHasValues] = useState<boolean>(false);

  return (
    <Flex
      display={'inline-flex'}
      fontSize={fontSizes.sm}
      grow={1}
      w={'100%'}
      margin={'0 auto'}
      maxWidth={SIZES.CONTAINER.XL}
      alignItems="baseline"
      gap={'1rem'}
      flexDirection="row"
      pt={SPACE.LG}>
      {Object.entries(watch()).map(([key, value]) => {
        if (value) {
          if (!hasValues) {
            setHasValues(true);
          }
          return (
            <ActiveFilterItem
              key={key}
              label={value[0]?.toUpperCase() + value?.slice(1)}
              value={value}
              queryItem={key}
            />
          );
        } else {
          if (hasValues) {
            setHasValues(false);
          }
        }
        return null;
      })}
      {hasValues && <ClearAllFilters />}
    </Flex>
  );
};

export default ActiveFilters;
