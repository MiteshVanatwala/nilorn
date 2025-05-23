import useChangelogColumns from './useChangelogColumns';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import SmallTable from '../Table/SmallTable';
import { ChangelogItemDto } from '../../app/generate';

type Props = {
  data: ChangelogItemDto[];
};

const ChangelogPopupContent = ({ data }: Props) => {
  const columns = useChangelogColumns();

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return <SmallTable table={table} />;
};

export default ChangelogPopupContent;
