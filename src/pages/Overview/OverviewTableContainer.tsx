import { Table, Tbody, Thead } from '@chakra-ui/table';
import { OverviewItem } from './mock';
import useOverviewColumns from './useOverviewColumns';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { THeadRow } from '../../components/Table/THeadRow';
import { COLORS } from '../../theme/Constants';
import { TBodyRow } from '../../components/Table/TBodyRow';
import { useNavigate } from 'react-router';

type Props = {
  data: OverviewItem[];
};
function OverviewTableContainer({ data }: Props) {
  const columns = useOverviewColumns();

  const navigate = useNavigate();

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table>
      <Thead>
        {table.getHeaderGroups().map((headerGroup, i) => (
          <THeadRow key={i} headerGroup={headerGroup} />
        ))}
      </Thead>
      <Tbody>
        {table.getRowModel().rows.map((row, i) => {
          const bgColor = i % 2 === 0 ? COLORS.WHITE : COLORS.GRAY[5];
          return (
            <TBodyRow
              row={row}
              bgColor={bgColor}
              onClick={() => navigate(`product-development/${row.original.id}`)}
              key={i}
            />
          );
        })}
      </Tbody>
    </Table>
  );
}

export default OverviewTableContainer;
