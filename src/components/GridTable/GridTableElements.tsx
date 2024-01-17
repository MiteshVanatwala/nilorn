import { Grid, GridItem, GridItemProps } from '@chakra-ui/react';
import { TABLE_GAP, TD_STYLE, TH_STYLE } from '../../theme/Constants/tableGrid';
import { CSSProperties } from 'react';

type TableProps = {
  numFr?: number;
  children?: string | JSX.Element | JSX.Element[];
};

export const GridTable = ({ numFr, children }: TableProps) => {
  return <Grid gridTemplateColumns={`repeat(${numFr}, 1fr)`}>{children}</Grid>;
};

type TableColumnProps = GridItemProps & {
  colSpan?: number;
  children?: string | JSX.Element;
};

export const GridTh = ({ colSpan, children, ...args }: TableColumnProps) => {
  return (
    <GridItem colSpan={colSpan ?? 1} style={TH_STYLE} {...args}>
      {children}
    </GridItem>
  );
};

type TableCellProps = GridItemProps & {
  colSpan?: number;
  children?: string | JSX.Element | JSX.Element[] | undefined | null | number;
  style?: CSSProperties;
};

export const GridTd = ({
  colSpan,
  children,
  style = TD_STYLE,
  ...args
}: TableCellProps) => {
  return (
    <GridItem colSpan={colSpan ?? 1} style={style} h={'100%'} {...args}>
      {children}
    </GridItem>
  );
};

export const GridInlineTbody = ({ numFr, children }: TableProps) => {
  return (
    <Grid
      gap={TABLE_GAP}
      gridTemplateColumns={`repeat(${numFr}, 1fr)`}
      height={'100%'}
      alignItems={'stretch'}>
      {children}
    </Grid>
  );
};
