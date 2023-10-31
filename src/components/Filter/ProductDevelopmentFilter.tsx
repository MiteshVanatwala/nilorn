import { Suspense, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { GRID, SPACE } from '../../theme/Constants';
import { Box, Grid, GridItem, HStack } from '@chakra-ui/react';
import InputSearch from '../Form/InputSearch';
import FormuQuerySubmit from '../Form/FormQuerySubmit';
import { useSearchParams } from 'react-router-dom';
import Select from '../Form/Select';
import { getDefaultValueSelect } from './FilterHelper';
import { useTranslation } from 'react-i18next';
import SearchProfile from '../SearchProfile/SearchProfile';
import AdvanceFilter from './AdvanceFilter';
import { SelectOption } from '../../app/types/types';
import { useOverviewAdvanceFilters } from '../../app/hooks/useOverviewAdvanceFilters';

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
  const { t } = useTranslation();
  const advanceFilters = useOverviewAdvanceFilters();

  let [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState<string>();
  const [selectValue, setSelectValue] = useState<
    SelectOption | null | undefined
  >(null);

  const selectValueQuery = searchParams.get('filter');
  const searchTermQuery = searchParams.get('search');

  useEffect(() => {
    if (selectValueQuery !== null) {
      setSelectValue(
        getDefaultValueSelect(selectValueQuery ?? '', exampleOptions)
      );
    } else {
      setSelectValue({
        label: `${t(`Filter.Select`)}`,
        value: '',
      });
    }
  }, [selectValueQuery, t]);

  useEffect(() => {
    setSearchTerm(searchTermQuery ?? '');
  }, [searchTermQuery]);

  return (
    <FormuQuerySubmit form={form}>
      <Grid
        templateColumns={GRID.TEMPLATE_COLUMNS}
        rowGap={GRID.ROW_GAP}
        columnGap={GRID.COLUM_GAP}>
        <GridItem colSpan={3}>
          <HStack gap={GRID.COLUM_GAP}>
            <Box maxW={'30rem'}>
              <InputSearch
                label="Search"
                placeholder={t(`Filter.Search`)}
                name="search"
                variant="filled"
                defaultValue={searchTerm}
              />
            </Box>
            <Box minW={'24rem'}>
              {selectValue != null && (
                <Suspense>
                  <Select
                    label={t('PD.Client')}
                    defaultValue={selectValue ?? undefined}
                    options={exampleOptions}
                    name={'filter'}
                  />
                </Suspense>
              )}
            </Box>
            <Box minW={'24rem'}>
              {selectValue != null && (
                <Suspense>
                  <Select
                    label={t('PD.Status')}
                    defaultValue={selectValue ?? undefined}
                    options={exampleOptions}
                    name={'filter'}
                  />
                </Suspense>
              )}
            </Box>
          </HStack>
          <Box mt={GRID.ROW_GAP}>
            <AdvanceFilter filters={advanceFilters} />
          </Box>
        </GridItem>
        <GridItem colSpan={1} colStart={4} justifySelf={'right'}>
          <SearchProfile />
        </GridItem>
      </Grid>
    </FormuQuerySubmit>
  );
};

export default ProductDevelopmentFilter;
