import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { SIZES, SPACE } from '../../theme/Constants';
import { Flex } from '@chakra-ui/react';
import InputSearch from '../Form/InputSearch';
import FormuQuerySubmit from '../Form/FormQuerySubmit';
import fontSizes from '../../theme/fontSizes';
import { useSearchParams } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import SearchProfile from '../SearchProfile/SearchProfile';
import ActiveFilters from './ActiveFilters';

// const exampleOptions = [
//   {
//     label: 'Coffee',
//     value: 'coffee',
//   },
//   {
//     label: 'Chocolate',
//     value: 'chocolate',
//   },
//   {
//     label: 'Strawberry',
//     value: 'strawberry',
//   },
//   {
//     label: 'Cherry',
//     value: 'cherry',
//   },
// ];

const ProductDevelopmentFilter = () => {
  const { t } = useTranslation();

  const form = useForm();
  let [searchParams] = useSearchParams();

  useEffect(() => {
    const searchParamItems = Array.from(searchParams.keys());

    searchParamItems.forEach(name => {
      const value = searchParams.get(name);
      form.setValue(name, value);
    });
  }, [form, searchParams]);

  return (
    <Flex
      fontSize={fontSizes.sm}
      grow={1}
      margin={'0 auto'}
      maxWidth={SIZES.CONTAINER.XL}
      alignItems="left"
      flexDirection="column"
      pt={SPACE.LG}>
      <FormuQuerySubmit form={form}>
        <Flex
          align={'end'}
          display={'inline-flex'}
          flexDirection={'row'}
          position={'relative'}
          zIndex={10}>
          <InputSearch
            label="Search"
            placeholder={t(`Filter.Search`)}
            name="search"
            variant="filled"
          />
          {/* {selectValue != null && (
            <Suspense>
              <Select
                defaultValue={selectValue ?? undefined}
                options={exampleOptions}
                name={'filter'}
              />
            </Suspense>
          )} */}
        </Flex>
        <ActiveFilters />
      </FormuQuerySubmit>
      <SearchProfile />
    </Flex>
  );
};

export default ProductDevelopmentFilter;
