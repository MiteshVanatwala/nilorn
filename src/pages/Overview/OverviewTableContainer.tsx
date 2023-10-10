import { Table, Tbody, Thead } from '@chakra-ui/table';
import { OverviewItem } from './mock';
import useOverviewColumns from './useOverviewColumns';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { THeadRow } from '../../components/Table/THeadRow';
import { COLORS } from '../../theme/Constants';
import { TBodyRow } from '../../components/Table/TBodyRow';
import { useNavigate } from 'react-router';
import TablePagination from '../../components/Table/TablePagination/TablePagination';
import { usePaginationContext } from '../../app/context/PaginationProvider';
import { useLayoutEffect } from 'react';

type Props = {
  data: OverviewItem[];
};

const CHUNK_SIZES = [25, 75, 100, 300];

function OverviewTableContainer({ data }: Props) {
  const columns = useOverviewColumns();

  const navigate = useNavigate();

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  const {
    currentPage,
    maxRecordsPerPage,
    totalPages,
    totalRecords,
    setCurrentPage,
    setMaxRecordsPerPage,
    setTotalPages,
    setTotalRecords,
  } = usePaginationContext();

  useLayoutEffect(() => {
    // set from API data
    setTotalPages(100);
    setTotalRecords(12000);
  }, [setTotalPages, setTotalRecords]);

  return (
    <>
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
                onClick={() =>
                  navigate(`product-development/${row.original.id}`)
                }
                key={i}
              />
            );
          })}
        </Tbody>
      </Table>
      <TablePagination
        currentPage={currentPage}
        totalNumPages={totalPages}
        totalRecords={totalRecords}
        currentChunkSize={maxRecordsPerPage}
        chunkSizes={CHUNK_SIZES}
        nextHandler={() => setCurrentPage(currentPage + 1)}
        previousHandler={() => setCurrentPage(currentPage - 1)}
        currentPageHandler={(num: number) => setCurrentPage(num)}
        chunkSizeHandler={(size: number) => setMaxRecordsPerPage(size)}
      />
    </>
  );
}

export default OverviewTableContainer;
