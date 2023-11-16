import { Grid, GridItem, Text } from '@chakra-ui/react';
import { Fragment } from 'react';
import { COLORS, SPACE } from '../../theme/Constants';
import { Table, flexRender } from '@tanstack/react-table';

type Props<T> = {
  table: Table<T>;
};

const SmallTable = <T extends object>({ table }: Props<T>) => {
  if (table.getHeaderGroups()[0]) {
    return (
      <>
        <Grid
          zIndex={999}
          gridTemplateColumns={`repeat(${
            table.getHeaderGroups()[0].headers.length
          }, auto)`}
          border={`solid 1px ${COLORS.GRAY[10]}`}>
          {table.getHeaderGroups()[0].headers.map(header => (
            <GridItem
              key={header.id}
              bgColor={COLORS.GRAY[80]}
              color={COLORS.WHITE}
              py={SPACE.XXS}
              px={SPACE.XS}>
              <Text variant={'bodyBold'} color={COLORS.WHITE}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </Text>
            </GridItem>
          ))}
          {table.getRowModel().rows.map((row, i) => {
            const bgColor = i % 2 === 0 ? COLORS.WHITE : COLORS.GRAY[5];
            return (
              <Fragment key={i}>
                {row.getVisibleCells().map(cell => {
                  return (
                    <GridItem
                      key={cell.id}
                      bg={bgColor}
                      py={SPACE.XXS}
                      px={SPACE.XS}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </GridItem>
                  );
                })}
              </Fragment>
            );
          })}
        </Grid>
      </>
    );
  }
  return <></>;
};

export default SmallTable;
