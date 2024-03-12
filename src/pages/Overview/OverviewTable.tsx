import { Table, Tbody, Thead } from '@chakra-ui/table';
import useOverviewColumns from './useOverviewColumns';
import {
  SortingState,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { THeadRow } from '../../components/Table/THeadRow';
import { COLORS } from '../../theme/Constants';
import { TBodyRow } from '../../components/Table/TBodyRow';
import { useNavigate } from 'react-router';
import { ProductDevelopmentBriefDto } from '../../app/generate';
import { Dispatch, MouseEvent, SetStateAction } from 'react';

type Props = {
  data: ProductDevelopmentBriefDto[];
  sortState: SortingState;
  setSortState: Dispatch<SetStateAction<SortingState>>;
};

const OverviewTable = ({ data, sortState, setSortState }: Props) => {
  const navigate = useNavigate();
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
  const handleClick = (
    e: MouseEvent<HTMLTableRowElement>,
    url: string,
    id: string
  ) => {
    e.stopPropagation();

    sessionStorage.setItem(
      'backLink',
      window.location.pathname + window.location.search + id ? `#${id}` : ''
    );
    sessionStorage.setItem('prevFilterOverview', window.location.search);

    navigate(url);
  };
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
          const rowNo = row.original.no ?? '';
          return (
            <TBodyRow
              row={row}
              id={rowNo}
              bgColor={bgColor}
              onClick={e =>
                handleClick(e, `product-development/${row.original.no}`, rowNo)
              }
              key={i}
            />
          );
        })}
      </Tbody>
    </Table>
  );
};

export default OverviewTable;
