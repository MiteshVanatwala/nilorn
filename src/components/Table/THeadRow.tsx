import { Tr } from '@chakra-ui/react';
import { HeaderGroup } from '@tanstack/react-table';
import { Th } from './Th';

export type THeadRowProps<Data extends object> = {
  headerGroup: HeaderGroup<Data>;
};

export function THeadRow<Data extends object>({
  headerGroup,
}: THeadRowProps<Data>) {
  return (
    <Tr key={headerGroup.id}>
      {headerGroup.headers.map(header => {
        const meta: any = header.column.columnDef.meta;
        return (
          <Th key={header.id} header={header} isNumeric={meta?.isNumeric} />
        );
      })}
    </Tr>
  );
}
