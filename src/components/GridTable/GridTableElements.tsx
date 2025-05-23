import * as CSS from 'csstype';
import {
  Grid,
  GridItem,
  GridItemProps,
  ResponsiveValue,
} from '@chakra-ui/react';
import { TABLE_GAP, TD_STYLE, TH_STYLE } from '../../theme/Constants/tableGrid';
import { CSSProperties } from 'react';
import { COLORS } from '../../theme/Constants';

type TableProps = {
  children?: string | JSX.Element | JSX.Element[];
  gridTemplateColumns:
    | ResponsiveValue<CSS.Property.GridTemplateColumns<0 | (string & {})>>
    | undefined;
  gap?: string;
};

export const GridTable = ({ gridTemplateColumns, children }: TableProps) => {
  return (
    <Grid
      borderRight={'1px solid' + COLORS.GRAY[20]}
      borderLeft={'1px solid' + COLORS.GRAY[20]}
      overflowX={{ base: 'auto', lg: 'inherit' }}
      gridTemplateColumns={gridTemplateColumns}
      gap={TABLE_GAP}>
      {children}
    </Grid>
  );
};

type TableColumnProps = GridItemProps & {
  colSpan?: number;
  children?: string | JSX.Element;
  style?: CSSProperties;
};

export const GridTh = ({
  colSpan,
  style = TH_STYLE,
  children,
  ...args
}: TableColumnProps) => {
  return (
    <GridItem
      colSpan={colSpan ?? 1}
      gap={TABLE_GAP}
      style={style}
      zIndex={5}
      {...args}>
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
  gap = TABLE_GAP,
}: TableProps) => {
  return (
    <Grid
      gap={gap}
      gridTemplateColumns={gridTemplateColumns}
      height={'100%'}
      alignItems={'stretch'}>
      {children}
    </Grid>
  );
};
