import { Table, Tbody, Thead } from '@chakra-ui/table';
import useOverviewColumns from './useOverviewColumns';
import {
  SortingState,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { THeadRow } from '../../components/Table/THeadRow';
import { COLORS } from '../../theme/Constants';
import { ProductDevelopmentBriefDto } from '../../app/generate';
import { Dispatch, SetStateAction } from 'react';
import OverviewTableRowContainer from './OverviewTableRowContainer';

type Props = {
  data: ProductDevelopmentBriefDto[];
  sortState: SortingState;
  setSortState: Dispatch<SetStateAction<SortingState>>;
};

const OverviewTable = ({ data, sortState, setSortState }: Props) => {
  const columns = useOverviewColumns();

  const table = useReactTable({
    columns,
    data,
    onSortingChange: setSortState,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting: sortState,
    },
  });

  return (
    <Table>
      <Thead position={'sticky'} top={0}>
        {table.getHeaderGroups().map((headerGroup, i) => (
          <THeadRow key={i} headerGroup={headerGroup} />
        ))}
      </Thead>
      <Tbody>
        {table.getRowModel().rows.map((row, i) => {
          const bgColor = i % 2 === 0 ? COLORS.WHITE : COLORS.GRAY[5];
          return (
            <OverviewTableRowContainer key={i} row={row} bgColor={bgColor} />
          );
        })}
      </Tbody>
    </Table>
  );
};

export default OverviewTable;
