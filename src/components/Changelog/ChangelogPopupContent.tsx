import useChangelogColumns, { mock } from './useChangelogColumns';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import SmallTable from '../Table/SmallTable';

const ChangelogPopupContent = () => {
  const columns = useChangelogColumns();

  const table = useReactTable({
    columns,
    data: mock,
    getCoreRowModel: getCoreRowModel(),
  });

  return <SmallTable table={table} />;
};

export default ChangelogPopupContent;
