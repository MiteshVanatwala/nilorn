import { useForm } from 'react-hook-form';
import { FormLabel, Grid, GridItem } from '@chakra-ui/react';
import InputSearch from '../Form/InputSearch';
import FormuQuerySubmit from '../Form/FormQuerySubmit';
import { useTranslation } from 'react-i18next';
import SearchProfile from '../SearchProfile/SearchProfile';
import ActiveFilters from './ActiveFilters';
import { useState } from 'react';
import SelectBase from '../Form/SelectBase';
import { SelectOption } from './FilterHelper';

const ProductDevelopmentFilter = () => {
  const { t } = useTranslation();
  const form = useForm();
  const [selectedClient, setSelectedClient] = useState<
    SelectOption | undefined
  >();
  const [selectedStatus, setSelectedStatus] = useState<
    SelectOption | undefined
  >();

  const onChange = (option: any, isClient: boolean) => {
    if (isClient) {
      setSelectedClient(option);
    } else {
      setSelectedStatus(option);
    }
    form.setValue(isClient ? 'client' : 'status', option.value);
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
            md: 10,
          }}>
          <Grid
            gap={{
              base: '.5rem',
              lg: '1rem',
            }}
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
                md: 2,
              }}>
              <FormLabel fontWeight={'400'} mb={'.4rem'} htmlFor="client">
                {t('Filter.Client')}
              </FormLabel>
              <SelectBase
                defaultValue={undefined}
                name={'client'}
                onChange={e => {
                  onChange(e, true);
                }}
                value={selectedClient}
                options={[
                  {
                    label: 'Chocolate',
                    value: 'chocolate',
                  },
                  { label: 'Strawberry', value: 'strawberry' },
                ]}
              />
            </GridItem>
            <GridItem
              colSpan={{
                base: 1,
                md: 2,
              }}>
              <FormLabel fontWeight={'400'} mb={'.4rem'} htmlFor="status">
                {t('Filter.Status')}
              </FormLabel>
              <SelectBase
                defaultValue={undefined}
                name={'status'}
                onChange={e => {
                  onChange(e, false);
                }}
                value={selectedStatus}
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
        <SearchProfile />
      </Grid>
    </FormuQuerySubmit>
  );
};

export default ProductDevelopmentFilter;
