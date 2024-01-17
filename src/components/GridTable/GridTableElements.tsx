import * as CSS from 'csstype';
import {
  Grid,
  GridItem,
  GridItemProps,
  ResponsiveValue,
} from '@chakra-ui/react';
import { TABLE_GAP, TD_STYLE, TH_STYLE } from '../../theme/Constants/tableGrid';
import { CSSProperties } from 'react';

type TableProps = {
  children?: string | JSX.Element | JSX.Element[];
  gridTemplateColumns:
    | ResponsiveValue<CSS.Property.GridTemplateColumns<0 | (string & {})>>
    | undefined;
};

export const GridTable = ({ gridTemplateColumns, children }: TableProps) => {
  return (
    <Grid gridTemplateColumns={gridTemplateColumns} gap={TABLE_GAP}>
      {children}
    </Grid>
  );
};

type TableColumnProps = GridItemProps & {
  colSpan?: number;
  children?: string | JSX.Element;
};

export const GridTh = ({ colSpan, children, ...args }: TableColumnProps) => {
  return (
    <GridItem colSpan={colSpan ?? 1} gap={TABLE_GAP} style={TH_STYLE} {...args}>
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
    <GridItem colSpan={colSpan ?? 1} style={style} {...args}>
      {children}
    </GridItem>
  );
};

export const GridInlineTbody = ({
  gridTemplateColumns,
  children,
}: TableProps) => {
  return (
    <Grid
      gap={TABLE_GAP}
      gridTemplateColumns={gridTemplateColumns}
      height={'100%'}
      alignItems={'stretch'}>
      {children}
    </Grid>
  );
};
