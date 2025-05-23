import { Th as ChakraTh, TableColumnHeaderProps, Text } from '@chakra-ui/react';
import { Header, flexRender } from '@tanstack/react-table';
import { COLORS, REMIX_ICONS, SPACE } from '../../theme/Constants';

interface Props<T extends object> extends TableColumnHeaderProps {
  header: Header<T, unknown>;
}
export const Th = <T extends object>({ header, ...args }: Props<T>) => {
  const isSortableColumn = header.column.getCanSort();
  const size = header.column.getSize();
  const meta = header.column.columnDef.meta as { tooltip: string };

  const sortIcon = () => {
    switch (header.column.getIsSorted()) {
      case 'desc':
        return REMIX_ICONS.CLASS_NAMES.ARROW_UP_LINE;
      case 'asc':
        return REMIX_ICONS.CLASS_NAMES.ARROW_DOWN_LINE;
      default:
        return '';
    }
  };

  const handleSort = () => {
    if (isSortableColumn) {
      if (!header.column.getIsSorted()) {
        header.column.toggleSorting(true);
      } else if (header.column.getIsSorted() === 'desc') {
        header.column.toggleSorting(false);
      } else if (header.column.getIsSorted() === 'asc') {
        header.column.toggleSorting();
      }
    }
  };

  return (
    <ChakraTh
      data-title={meta?.tooltip}
      width={`${size}rem`}
      maxWidth={`${size}rem`}
      colSpan={header.colSpan}
      onClick={handleSort}
      position={'relative'}
      _hover={{
        cursor: isSortableColumn ? 'pointer' : 'defualt',
        bg: isSortableColumn && COLORS.GRAY[70],
      }}
      {...args}>
      {flexRender(header.column.columnDef.header, header.getContext())}

      {isSortableColumn && (
        <Text
          color={COLORS.WHITE}
          as={'i'}
          pl={SPACE.XXS}
          className={sortIcon()}
          style={{
            color: COLORS.WHITE,
            opacity: header.column.getIsSorted() ? 1 : 0,
          }}
        />
      )}
    </ChakraTh>
  );
};
