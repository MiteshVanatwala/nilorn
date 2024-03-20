import { Row, flexRender } from '@tanstack/react-table';
import { MouseEvent, useMemo } from 'react';

import { Td, Tr } from '@chakra-ui/table';
import { COLORS } from '../../theme/Constants';

export type TBodyRowProps<Data extends object> = {
  row: Row<Data>;
  bgColor?: string;
  onClick?: (e: MouseEvent<HTMLTableRowElement>) => void;
  hoverBgColor?: string;
  groupColor?: string;
  messages?: string[];
  isDisabled?: boolean;
  id?: string;
};

export function TBodyRow<Data extends object>({
  row,
  bgColor,
  onClick,
  hoverBgColor,
  id,
}: TBodyRowProps<Data>) {
  const tRow = useMemo(() => {
    return (
      <Tr
        id={id}
        pointerEvents={'auto'}
        bgColor={bgColor}
        onClick={e => onClick && onClick(e)}
        _hover={{
          cursor: onClick ? 'pointer' : undefined,
          backgroundColor: COLORS.GRAY[20],
        }}
        _focusWithin={{ bg: hoverBgColor }}>
        {row.getVisibleCells().map((cell, i) => {
          return (
            <Td key={i}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </Td>
          );
        })}
      </Tr>
    );
  }, [id, bgColor, onClick, hoverBgColor, row]);

  return tRow;
}
