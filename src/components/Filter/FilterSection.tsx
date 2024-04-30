import { Grid, GridItem, VStack } from '@chakra-ui/react';
import { GRID, SPACE } from '../../theme/Constants';
import { FilterKeys } from '../../app/types/types';
import ActiveFilters from '../../components/Filter/ActiveFilters';
import Filter from '../../components/Filter/Filter';
import AdvanceFilter from '../../components/Filter/AdvanceFilter';
import SearchProfile from '../SearchProfile/SearchProfile';
import { useFilterList } from '../../app/hooks/useFilterList';
import CreateProductDevelopment from './CreateProductDevelopment';

type Props = {
  standardFilterKeys: FilterKeys[];
  createNew?: boolean;
};

const FilterSection = ({ standardFilterKeys, createNew = false }: Props) => {
  const { standardFilters, advanceFilters } = useFilterList(standardFilterKeys);

  return (
    <Grid
      templateColumns={{
        base: GRID.TEMPLATE_COLUMNS.base,
        md: GRID.TEMPLATE_COLUMNS.md,
        lg: GRID.TEMPLATE_COLUMNS.xl,
      }}>
      <GridItem
        colSpan={{
          base: 1,
          md: 10,
        }}>
        <Filter hasSearch filterInputs={standardFilters} />
        <AdvanceFilter filters={advanceFilters} />
        <ActiveFilters />
      </GridItem>
      <GridItem colSpan={2}>
        <VStack
          pb={{ base: SPACE.XXS, lg: SPACE.MD }}
          alignItems={{
            base: 'start',
            lg: 'end',
          }}
          h={'full'}
          justifyContent={'start'}
          gap={{
            base: SPACE.XXS,
            lg: SPACE.SM,
          }}>
          <SearchProfile />
          {createNew && <CreateProductDevelopment />}
        </VStack>
      </GridItem>
    </Grid>
  );
};

export default FilterSection;
