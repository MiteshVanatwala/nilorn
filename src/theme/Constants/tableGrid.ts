import { CSSProperties } from 'react';
import { table } from './../table';
import COLORS from './colors';

export const TH_STYLE: CSSProperties = {
  ...table.baseStyle?.th,
  height: 'auto',
  textTransform: 'none',
  display: 'flex',
  overflow: 'hidden',
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
export const TD_STYLE_LAST_CHILD: CSSProperties = {
  ...table.baseStyle?.td,
  overflow: 'hidden',
  height: 'auto',
  borderTop: 'none',
  boxShadow: `${'0 0 0 1px' + COLORS.GRAY[20]}`,
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

export const TABLE_GAP = '1px';
