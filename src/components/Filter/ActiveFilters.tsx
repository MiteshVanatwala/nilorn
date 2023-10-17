import { SIZES, SPACE } from '../../theme/Constants';
import { Flex } from '@chakra-ui/react';
import fontSizes from '../../theme/fontSizes';
import { useSearchParams } from 'react-router-dom';
import ActiveFilterItem from './ActiveFilterItem';

const ActiveFilters = () => {
  let [searchParams] = useSearchParams();
  const searchParamsArray = Array.from(searchParams.entries());

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
      {searchParamsArray.length
        ? searchParamsArray.map(([key, value]) => (
            <ActiveFilterItem
              key={key}
              label={value[0].toUpperCase() + value.slice(1)}
              value={value}
              queryItem={key}></ActiveFilterItem>
          ))
        : null}
    </Flex>
  );
};

export default ActiveFilters;
