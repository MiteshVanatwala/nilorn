import { Row, flexRender } from '@tanstack/react-table';
import { useMemo } from 'react';

import { Td, Tr } from '@chakra-ui/table';
import { COLORS } from '../../theme/Constants';

export type TBodyRowProps<Data extends object> = {
  row: Row<Data>;
  bgColor?: string;
  onClick?: () => void;
  hoverBgColor?: string;
  groupColor?: string;
  messages?: string[];
  isDisabled?: boolean;
};

export function TBodyRow<Data extends object>({
  row,
  bgColor,
  onClick,
  hoverBgColor,
}: TBodyRowProps<Data>) {
  const tRow = useMemo(() => {
    return (
      <Tr
        pointerEvents={'auto'}
        bgColor={bgColor}
        onClick={onClick}
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
  }, [row, bgColor, hoverBgColor, onClick]);

  return tRow;
}
