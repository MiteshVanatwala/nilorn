import { useForm } from 'react-hook-form';
import { Flex, FormLabel, Grid, GridItem } from '@chakra-ui/react';
import InputSearch from '../Form/InputSearch';
import FormuQuerySubmit from '../Form/FormQuerySubmit';
import { useTranslation } from 'react-i18next';
import SearchProfile from '../SearchProfile/SearchProfile';
import ActiveFilters from './ActiveFilters';
import { Suspense, useState } from 'react';
import SelectBase from '../Form/SelectBase';
import { ActionMeta } from 'chakra-react-select';
import { SelectOption } from './FilterHelper';

const ProductDevelopmentFilter = () => {
  const { t } = useTranslation();
  const form = useForm();
  const [selected, setSelected] = useState<SelectOption | undefined>();

  const onChange = (option: any) => {
    setSelected(option);
    form.setValue('filter', option.value);
  };
  return (
    <FormuQuerySubmit form={form}>
      <Grid
        templateColumns={{
          base: '1fr',
          lg: 'repeat(12, 1fr)',
          md: 'repeat(1, 1fr)',
        }}>
        <GridItem
          colSpan={{
            base: 1,
            lg: 10,
            md: 10,
          }}>
          <Grid
            templateColumns={{
              base: '1fr',
              lg: 'repeat(10, 1fr)',
              md: 'repeat(1, 1fr)',
            }}
            position={'relative'}
            zIndex={10}>
            <GridItem
              colSpan={{
                base: 1,
                lg: 4,
                md: 4,
              }}>
              <InputSearch
                label="Search"
                placeholder={t(`Filter.Search`)}
                name="search"
                variant="filled"
              />
            </GridItem>
            <GridItem
              colSpan={{
                base: 1,
                lg: 2,
                md: 2,
              }}>
              <FormLabel fontWeight={'400'} mb={'.4rem'} htmlFor="filter">
                {t('Filter.Client')}
              </FormLabel>
              <SelectBase
                defaultValue={undefined}
                name={'filter'}
                onChange={onChange}
                value={selected}
                options={[
                  {
                    label: 'Chocolate',
                    value: 'chocolate',
                  },
                  { label: 'Strawberry', value: 'strawberry' },
                ]}
              />
            </GridItem>
          </Grid>
          <ActiveFilters />
        </GridItem>

        <GridItem
          marginTop={{
            base: '1rem',
            md: '0',
          }}
          colSpan={2}>
          <SearchProfile />
        </GridItem>
      </Grid>
    </FormuQuerySubmit>
  );
};

export default ProductDevelopmentFilter;
