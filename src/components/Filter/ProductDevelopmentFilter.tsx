import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SIZES, SPACE } from '../../theme/Constants';
import { Button, Flex } from '@chakra-ui/react';
import InputSearch from '../Form/InputSearch';
import FormuQuerySubmit from '../Form/FormQuerySubmit';
import fontSizes from '../../theme/fontSizes';
import { useSearchParams } from 'react-router-dom';
import Select from '../Form/Select';
import { SelectOption, getDefaultValueSelect } from './FilterHelper';
const exampleOptions = [
  {
    label: 'Coffee',
    value: 'coffee',
  },
  {
    label: 'Chocolate',
    value: 'chocolate',
  },
  {
    label: 'Strawberry',
    value: 'strawberry',
  },
  {
    label: 'Cherry',
    value: 'cherry',
  },
];

const ProductDevelopmentFilter = () => {
  const form = useForm();

  let [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState<string>();
  const [selectValue, setSelectValue] = useState<
    SelectOption | null | undefined
  >(null);

  const selectValueQuery = searchParams.get('filter');

  useEffect(() => {
    const searchTerm = searchParams.get('search');
    setSearchTerm(searchTerm ?? '');
    if (selectValueQuery !== null) {
      setSelectValue(
        getDefaultValueSelect(selectValueQuery ?? '', exampleOptions)
      );
    } else {
      setSelectValue({
        label: 'Select...',
        value: '',
      });
    }
  }, [searchParams, selectValueQuery]);
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
            placeholder="Search by..."
            name="search"
            variant="filled"
            defaultValue={searchTerm}
          />
          {selectValue != null && (
            <Select
              defaultValue={selectValue ?? undefined}
              options={exampleOptions}
              name={'filter'}
            />
          )}
          <Button
            type="submit"
            lineHeight={'1.5'}
            fontSize={fontSizes.sm}
            height={'auto'}
            padding={'1rem 3.5rem'}
            minWidth={'none'}
            variant={'primary'}>
            Filtrera
          </Button>
        </Flex>
      </FormuQuerySubmit>
    </Flex>
  );
};

export default ProductDevelopmentFilter;
