import { Grid, GridItem } from '@chakra-ui/react';
import { GRID, SPACE } from '../../theme/Constants';
import InputSearch from '../Form/InputSearch';
import { useTranslation } from 'react-i18next';
import InputSwitch from './InputSwitch';
import { SelectOption } from '../../app/types/types';

type Props = {
  hasSearch?: boolean;
  filterInputs: SelectOption<any>[];
};

const Filter = ({ hasSearch, filterInputs }: Props) => {
  const { t } = useTranslation();

  return (
    <Grid
      gap={{
        base: SPACE.XXS,
        lg: SPACE.SM,
      }}
      templateColumns={{
        base: GRID.TEMPLATE_COLUMNS.base,
        md: GRID.TEMPLATE_COLUMNS.md,
        lg: GRID.TEMPLATE_COLUMNS.lg,
      }}
      position={'relative'}
      zIndex={10}>
      {hasSearch && (
        <GridItem
          colSpan={{
            base: 1,
            lg: 4,
          }}>
          <InputSearch
            label="Search"
            placeholder={t(`Filter.Search`)}
            name="searchQuery"
            variant="filled"
          />
        </GridItem>
      )}
      {filterInputs.map(input => (
        <GridItem
          colSpan={{
            base: 1,
            md: 2,
          }}>
          <InputSwitch option={input} />
        </GridItem>
      ))}
    </Grid>
  );
};

export default Filter;
