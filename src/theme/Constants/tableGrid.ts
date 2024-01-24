import { CSSProperties } from 'react';
import { table } from './../table';
import COLORS from './colors';

export const TABLE_GAP = '1px';

export const TH_STYLE: CSSProperties = {
  ...table.baseStyle?.th,
  height: '4.6rem',
  textTransform: 'none',
  display: 'flex',
  overflow: 'hidden',
  lineHeight: 1.15,
  margin: `-${TABLE_GAP}`,
  position: 'sticky',
  top: 0,
};
export const TH_STYLE_CALCULATION: CSSProperties = {
  ...table.baseStyle?.th,
  height: '4rem',
  textTransform: 'none',
  display: 'flex',
  overflow: 'hidden',
  lineHeight: 1.15,
  margin: `-${TABLE_GAP}`,
  position: 'sticky',
  top: 0,
  border: 'none',
};
export const TD_STYLE_RELEASED: CSSProperties = {
  ...table.baseStyle?.td,
  height: 'auto',
  borderTop: 'none',
  boxShadow: `${'0 0 0 1px' + COLORS.GRAY[20]}`,
  border: 'none',
  backgroundColor: COLORS.GREEN.TINT,
  display: 'flex',
};

export const TD_STYLE: CSSProperties = {
  ...table.baseStyle?.td,
  height: 'auto',
  borderTop: 'none',
  boxShadow: `${'0 0 0 1px' + COLORS.GRAY[20]}`,
  border: 'none',
  display: 'flex',
  overflow: 'hidden',
};
