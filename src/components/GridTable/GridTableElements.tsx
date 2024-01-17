import { Grid, GridItem } from '@chakra-ui/react';
import { TABLE_GAP, TD_STYLE, TH_STYLE } from '../../theme/Constants/tableGrid';
import { CSSProperties } from 'react';

type TableProps = {
  numFr?: number;
  children?: string | JSX.Element | JSX.Element[];
};

export const GridThead = ({ numFr, children }: TableProps) => {
  return (
    <Grid
      h={'4.6rem'}
      lineHeight={1.15}
      gridTemplateColumns={`repeat(${numFr}, 1fr)`}>
      {children}
    </Grid>
  );
};

type TableColumnProps = {
  colSpan?: number;
  children?: string | JSX.Element;
};

export const GridTh = ({ colSpan, children }: TableColumnProps) => {
  return (
    <GridItem colSpan={colSpan ?? 1} style={TH_STYLE}>
      {children}
    </GridItem>
  );
};

type TableCellProps = {
  colSpan?: number;
  children?: string | JSX.Element | JSX.Element[] | undefined | null | number;
  style?: CSSProperties;
};

export const GridTd = ({
  colSpan,
  children,
  style = TD_STYLE,
}: TableCellProps) => {
  return (
    <GridItem colSpan={colSpan ?? 1} style={style}>
      {children}
    </GridItem>
  );
};

export const GridTbody = ({ children }: TableProps) => {
  return <Grid gap={TABLE_GAP}>{children}</Grid>;
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
